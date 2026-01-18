"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types/database';

interface Props {
  testimonial: Testimonial | null;
}

interface FormData {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export function TestimonialForm({ testimonial }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNew = !testimonial;

  const form = useForm<FormData>({
    defaultValues: {
      name: testimonial?.name || '',
      role: testimonial?.role || '',
      company: testimonial?.company || '',
      avatar: testimonial?.avatar || '',
      content: testimonial?.content || '',
      rating: testimonial?.rating || null,
      is_featured: testimonial?.is_featured ?? false,
      is_active: testimonial?.is_active ?? true,
      sort_order: testimonial?.sort_order || 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${testimonial.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to save testimonial');

      toast.success(isNew ? 'Testimonial created' : 'Testimonial updated');
      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      toast.error('Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card rounded-lg border p-6">
      {/* Client Name */}
      <div className="space-y-2">
        <Label>Client Name *</Label>
        <Input
          {...form.register('name')}
          placeholder="John Smith"
        />
      </div>

      {/* Client Title & Company row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title/Position</Label>
          <Input
            {...form.register('role')}
            placeholder="CEO, CTO, etc."
          />
        </div>

        <div className="space-y-2">
          <Label>Company *</Label>
          <Input
            {...form.register('company')}
            placeholder="Company Name"
          />
        </div>
      </div>

      {/* Client Image URL */}
      <div className="space-y-2">
        <Label>Client Photo URL (optional)</Label>
        <Input
          {...form.register('avatar')}
          placeholder="/testimonials/john-smith.jpg or https://..."
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to show initials
        </p>
        {form.watch('avatar') && (
          <div className="mt-2">
            <img
              src={form.watch('avatar')}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Quote/Content */}
      <div className="space-y-2">
        <Label>Testimonial Quote *</Label>
        <Textarea
          {...form.register('content')}
          rows={4}
          placeholder="What the client said about your services..."
        />
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label>Rating (optional)</Label>
        <Select
          value={form.watch('rating')?.toString() || ''}
          onValueChange={(v) => form.setValue('rating', v ? parseInt(v) : null)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No rating</SelectItem>
            {[5, 4, 3, 2, 1].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                <div className="flex items-center gap-1">
                  {Array.from({ length: n }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-primary fill-primary" />
                  ))}
                  <span className="ml-1">{n}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Switch
            checked={form.watch('is_featured')}
            onCheckedChange={(v) => form.setValue('is_featured', v)}
          />
          <Label>Featured (show on homepage)</Label>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={form.watch('is_active')}
            onCheckedChange={(v) => form.setValue('is_active', v)}
          />
          <Label>Active</Label>
        </div>
      </div>

      {/* Sort Order */}
      <div className="space-y-2">
        <Label>Sort Order</Label>
        <Input
          type="number"
          {...form.register('sort_order', { valueAsNumber: true })}
          className="w-24"
        />
        <p className="text-xs text-muted-foreground">
          Lower numbers appear first
        </p>
      </div>

      {/* Submit */}
      <div className="flex gap-4 pt-4 border-t">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (isNew ? 'Create Testimonial' : 'Update Testimonial')}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
