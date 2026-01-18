"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { DEPARTMENTS, JOB_TYPES, EXPERIENCE_LEVELS } from '@/lib/constants';
import { ArrayInput } from './array-input';
import type { Job } from '@/lib/types/database';

interface Props {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (job: Job) => void;
}

interface FormData {
  title: string;
  slug: string;
  department: string;
  location: string;
  job_type: string;
  experience_level: string;
  description: string;
  salary_range: string;
  is_active: boolean;
}

export function JobEditDialog({
  job,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNew = !job;

  const [requirements, setRequirements] = useState<string[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  const form = useForm<FormData>({
    defaultValues: {
      title: '',
      slug: '',
      department: '',
      location: '',
      job_type: 'Full-time',
      experience_level: '',
      description: '',
      salary_range: '',
      is_active: true,
    },
  });

  // Reset form when job changes or dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        title: job?.title || '',
        slug: job?.slug || '',
        department: job?.department || '',
        location: job?.location || '',
        job_type: job?.job_type || 'Full-time',
        experience_level: job?.experience_level || '',
        description: job?.description || '',
        salary_range: job?.salary_range || '',
        is_active: job?.is_active ?? true,
      });
      setRequirements(job?.requirements || []);
      setResponsibilities(job?.responsibilities || []);
      setBenefits(job?.benefits || []);
    }
  }, [job, open, form]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        requirements,
        responsibilities,
        benefits,
      };

      const url = isNew ? '/api/admin/jobs' : `/api/admin/jobs/${job.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save job');
      }

      const savedJob: Job = await res.json();
      toast.success(isNew ? 'Job created' : 'Job updated');
      onOpenChange(false);
      onSuccess(savedJob);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Create Job Listing' : 'Edit Job Listing'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Job Title *</Label>
            <Input
              {...form.register('title')}
              placeholder="e.g., Senior Embedded Engineer"
              onChange={(e) => {
                form.setValue('title', e.target.value);
                if (isNew) {
                  form.setValue('slug', generateSlug(e.target.value));
                }
              }}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label>URL Slug *</Label>
            <Input
              {...form.register('slug')}
              placeholder="senior-embedded-engineer"
            />
            <p className="text-xs text-muted-foreground">
              URL: /careers?job={form.watch('slug') || 'slug'}
            </p>
          </div>

          {/* Department & Type row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department *</Label>
              <Select
                value={form.watch('department')}
                onValueChange={(v) => form.setValue('department', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Type *</Label>
              <Select
                value={form.watch('job_type')}
                onValueChange={(v) => form.setValue('job_type', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location & Experience row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input
                {...form.register('location')}
                placeholder="e.g., Chennai, India"
              />
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select
                value={form.watch('experience_level')}
                onValueChange={(v) => form.setValue('experience_level', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <Label>Salary Range (optional)</Label>
            <Input
              {...form.register('salary_range')}
              placeholder="e.g., ₹8L - ₹15L per annum"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Job Description *</Label>
            <Textarea
              {...form.register('description')}
              rows={4}
              placeholder="Detailed job description..."
            />
          </div>

          {/* Requirements Array */}
          <ArrayInput
            label="Requirements"
            values={requirements}
            onChange={setRequirements}
            placeholder="Add a requirement"
          />

          {/* Responsibilities Array */}
          <ArrayInput
            label="Responsibilities"
            values={responsibilities}
            onChange={setResponsibilities}
            placeholder="Add a responsibility"
          />

          {/* Benefits Array */}
          <ArrayInput
            label="Benefits"
            values={benefits}
            onChange={setBenefits}
            placeholder="Add a benefit"
          />

          {/* Active Switch */}
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Switch
              checked={form.watch('is_active')}
              onCheckedChange={(v) => form.setValue('is_active', v)}
            />
            <Label>Active (visible on careers page)</Label>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (isNew ? 'Create Job' : 'Update Job')}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
