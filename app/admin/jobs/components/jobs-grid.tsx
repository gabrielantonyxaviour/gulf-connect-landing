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
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { JobCard } from './job-card';
import { JobEditDialog } from './job-edit-dialog';
import type { Job } from '@/lib/types/database';

interface Props {
  jobs: Job[];
  applicationCounts: Record<string, number>;
  onAddJob?: () => void;
}

function SortableJobCard({
  job,
  applicationCount,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  job: Job;
  applicationCount: number;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <JobCard
        job={job}
        applicationCount={applicationCount}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export function JobsGrid({ jobs: initialJobs, applicationCounts, onAddJob }: Props) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [loading, setLoading] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

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

  const toggleActive = async (job: Job) => {
    setLoading(job.id);
    try {
      await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !job.is_active }),
      });
      setJobs(prev =>
        prev.map(j =>
          j.id === job.id ? { ...j, is_active: !j.is_active } : j
        )
      );
    } finally {
      setLoading(null);
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure? This will also delete all applications for this job.')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      setJobs(prev => prev.filter(j => j.id !== id));
      toast.success('Job deleted');
    } finally {
      setLoading(null);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingJob(null);
    setDialogOpen(true);
  };

  const handleDialogSuccess = (updatedJob: Job) => {
    // Update local state immediately for instant reflection
    setJobs(prev => {
      const existingIndex = prev.findIndex(j => j.id === updatedJob.id);
      if (existingIndex >= 0) {
        // Update existing job
        return prev.map(j => j.id === updatedJob.id ? updatedJob : j);
      } else {
        // Add new job
        return [...prev, updatedJob];
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

    const oldIndex = jobs.findIndex(j => j.id === active.id);
    const newIndex = jobs.findIndex(j => j.id === over.id);

    const newOrder = arrayMove(jobs, oldIndex, newIndex);

    // Update local state immediately for smooth UX
    setJobs(newOrder);

    // Persist to server
    try {
      await fetch('/api/admin/jobs/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobIds: newOrder.map(j => j.id),
        }),
      });
    } catch {
      toast.error('Failed to save order');
      router.refresh();
    }
  };

  const activeJob = activeId ? jobs.find(j => j.id === activeId) : null;

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-card rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">No job listings yet. Create your first job posting.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={jobs.map(j => j.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {jobs.map(job => (
                <SortableJobCard
                  key={job.id}
                  job={job}
                  applicationCount={applicationCounts[job.id] || 0}
                  loading={loading === job.id}
                  onEdit={() => handleEdit(job)}
                  onDelete={() => deleteJob(job.id)}
                  onToggleActive={() => toggleActive(job)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeJob && (
              <div className="opacity-90">
                <JobCard
                  job={activeJob}
                  applicationCount={applicationCounts[activeJob.id] || 0}
                  loading={false}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onToggleActive={() => {}}
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}

      <JobEditDialog
        job={editingJob}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleDialogSuccess}
      />
    </>
  );
}
