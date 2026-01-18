"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';
import { TestimonialCard } from './testimonial-card';
import { TestimonialEditDialog } from './testimonial-edit-dialog';
import type { Testimonial } from '@/lib/types/database';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  testimonials: Testimonial[];
}

function SortableTestimonialCard({
  testimonial,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
  onToggleFeatured,
}: {
  testimonial: Testimonial;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  onToggleFeatured: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: testimonial.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TestimonialCard
        testimonial={testimonial}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
        onToggleFeatured={onToggleFeatured}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export function TestimonialsGrid({ testimonials: initialTestimonials }: Props) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [loading, setLoading] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleActive = async (testimonial: Testimonial) => {
    setLoading(testimonial.id);
    try {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !testimonial.is_active }),
      });
      setTestimonials(prev =>
        prev.map(t =>
          t.id === testimonial.id ? { ...t, is_active: !t.is_active } : t
        )
      );
    } finally {
      setLoading(null);
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    setLoading(testimonial.id);
    try {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !testimonial.is_featured }),
      });
      setTestimonials(prev =>
        prev.map(t =>
          t.id === testimonial.id ? { ...t, is_featured: !t.is_featured } : t
        )
      );
    } finally {
      setLoading(null);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast.success('Testimonial deleted');
    } finally {
      setLoading(null);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingTestimonial(null);
    setDialogOpen(true);
  };

  const handleDialogSuccess = (updatedTestimonial: Testimonial) => {
    // Update local state immediately for instant reflection
    setTestimonials(prev => {
      const existingIndex = prev.findIndex(t => t.id === updatedTestimonial.id);
      if (existingIndex >= 0) {
        // Update existing testimonial
        return prev.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t);
      } else {
        // Add new testimonial
        return [...prev, updatedTestimonial];
      }
    });
    // Refresh server components in background after a short delay
    setTimeout(() => router.refresh(), 100);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = testimonials.findIndex(t => t.id === active.id);
    const newIndex = testimonials.findIndex(t => t.id === over.id);

    const newOrder = arrayMove(testimonials, oldIndex, newIndex);

    // Update local state immediately for smooth UX
    setTestimonials(newOrder.map((t, i) => ({ ...t, sort_order: i })));

    // Persist to server
    try {
      await fetch('/api/admin/testimonials/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testimonialIds: newOrder.map(t => t.id),
        }),
      });
    } catch {
      toast.error('Failed to save order');
      router.refresh();
    }
  };

  const activeTestimonial = activeId ? testimonials.find(t => t.id === activeId) : null;

  if (testimonials.length === 0) {
    return (
      <>
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
        <div className="bg-card rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">No testimonials yet. Add your first client testimonial.</p>
        </div>
        <TestimonialEditDialog
          testimonial={null}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={handleDialogSuccess}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
      <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={testimonials.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {testimonials.map(testimonial => (
            <SortableTestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              loading={loading === testimonial.id}
              onEdit={() => handleEdit(testimonial)}
              onDelete={() => deleteTestimonial(testimonial.id)}
              onToggleActive={() => toggleActive(testimonial)}
              onToggleFeatured={() => toggleFeatured(testimonial)}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeTestimonial && (
          <div className="opacity-90">
            <TestimonialCard
              testimonial={activeTestimonial}
              loading={false}
              onEdit={() => {}}
              onDelete={() => {}}
              onToggleActive={() => {}}
              onToggleFeatured={() => {}}
            />
          </div>
        )}
      </DragOverlay>

      <TestimonialEditDialog
        testimonial={editingTestimonial}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleDialogSuccess}
      />
    </DndContext>
    </>
  );
}
