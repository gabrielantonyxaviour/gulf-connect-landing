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
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Users, Eye } from 'lucide-react';
import type { Job } from '@/lib/types/database';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  jobs: Job[];
  applicationCounts: Record<string, number>;
}

export function JobsTable({ jobs, applicationCounts }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const toggleActive = async (job: Job) => {
    setLoading(job.id);
    try {
      await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !job.is_active }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure? This will also delete all applications for this job.')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

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
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>
                <Badge variant="secondary">{job.department}</Badge>
              </TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>
                <Badge variant={getTypeBadgeVariant(job.job_type)}>
                  {job.job_type}
                </Badge>
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/applications?job=${job.id}`}
                  className="flex items-center gap-1 text-accent hover:underline"
                >
                  <Users className="h-4 w-4" />
                  {applicationCounts[job.id] || 0}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <Switch
                  checked={job.is_active}
                  onCheckedChange={() => toggleActive(job)}
                  disabled={loading === job.id}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/careers?preview=${job.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/jobs/${job.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteJob(job.id)}
                    disabled={loading === job.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {jobs.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No job listings yet. Create your first job posting.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
