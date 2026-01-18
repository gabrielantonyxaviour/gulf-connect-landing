"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Star, GripVertical } from 'lucide-react';
import type { Testimonial } from '@/lib/types/database';

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsTable({ testimonials }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const toggleActive = async (testimonial: Testimonial) => {
    setLoading(testimonial.id);
    try {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !testimonial.is_active }),
      });
      router.refresh();
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
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Quote (Preview)</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((testimonial) => (
            <TableRow key={testimonial.id}>
              <TableCell>
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-semibold">
                        {testimonial.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{testimonial.name || 'Unknown'}</p>
                    {testimonial.role && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{testimonial.company}</TableCell>
              <TableCell className="max-w-xs">
                <p className="truncate text-muted-foreground">
                  &quot;{testimonial.content}&quot;
                </p>
              </TableCell>
              <TableCell>
                {testimonial.rating ? (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span>{testimonial.rating}/5</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={testimonial.is_featured}
                  onCheckedChange={() => toggleFeatured(testimonial)}
                  disabled={loading === testimonial.id}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={testimonial.is_active}
                  onCheckedChange={() => toggleActive(testimonial)}
                  disabled={loading === testimonial.id}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/testimonials/${testimonial.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTestimonial(testimonial.id)}
                    disabled={loading === testimonial.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {testimonials.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No testimonials yet. Add your first client testimonial.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
