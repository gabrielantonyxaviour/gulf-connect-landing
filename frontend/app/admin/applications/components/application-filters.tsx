"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  jobs: { id: string; title: string }[];
  statusCounts: Record<string, number>;
  currentJob?: string;
  currentStatus?: string;
}

export function ApplicationFilters({ jobs, statusCounts, currentJob, currentStatus }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/applications?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/admin/applications');
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Status pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!currentStatus ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateFilter('status', null)}
        >
          All ({statusCounts.all})
        </Button>
        {['pending', 'reviewing', 'interviewed', 'hired', 'rejected'].map((status) => (
          <Button
            key={status}
            variant={currentStatus === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateFilter('status', status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
          </Button>
        ))}
      </div>

      {/* Job filter */}
      <div className="flex items-center gap-4">
        <Select
          value={currentJob || 'all'}
          onValueChange={(v) => updateFilter('job', v === 'all' ? null : v)}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All positions</SelectItem>
            {jobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(currentJob || currentStatus) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
