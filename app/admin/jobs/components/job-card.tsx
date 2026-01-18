"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, GripVertical, Eye, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Job } from '@/lib/types/database';

interface Props {
  job: Job;
  applicationCount: number;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function JobCard({
  job,
  applicationCount,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
  dragHandleProps,
}: Props) {
  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Full-time': return 'default';
      case 'Part-time': return 'secondary';
      case 'Contract': return 'outline';
      case 'Internship': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="bg-card border rounded-lg overflow-hidden group">
      {/* Drag Handle */}
      <div
        {...dragHandleProps}
        className="flex items-center justify-center py-2 bg-muted/30 cursor-move border-b"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Job Info */}
      <div className="p-4">
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold line-clamp-2">{job.title}</h3>
          {!job.is_active && (
            <Badge variant="secondary" className="flex-shrink-0">Inactive</Badge>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{job.department}</Badge>
          <Badge variant={getTypeBadgeVariant(job.job_type)}>{job.job_type}</Badge>
        </div>

        {/* Location */}
        <p className="text-sm text-muted-foreground mb-2">{job.location}</p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <Link
            href={`/admin/applications?job=${job.id}`}
            className="flex items-center gap-1 hover:text-accent"
          >
            <Users className="h-4 w-4" />
            {applicationCount} applications
          </Link>
          <span>
            {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <Switch
            checked={job.is_active}
            onCheckedChange={onToggleActive}
            disabled={loading}
          />
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href={`/careers?preview=${job.slug}`} target="_blank">
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              disabled={loading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
