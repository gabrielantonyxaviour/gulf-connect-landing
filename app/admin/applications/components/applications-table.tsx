"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Download, Trash2, Linkedin, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { APPLICATION_STATUSES } from '@/lib/constants';
import { ApplicationModal } from './application-modal';

interface ApplicationWithJob {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  current_company: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  years_experience: string | null;
  cover_letter: string | null;
  resume_url: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  job: { id: string; title: string } | null;
}

interface Props {
  applications: ApplicationWithJob[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-primary/20 text-primary',
  reviewing: 'bg-primary/20 text-primary',
  interviewed: 'bg-primary/20 text-primary',
  hired: 'bg-primary/20 text-primary',
  rejected: 'bg-destructive/20 text-destructive',
};

export function ApplicationsTable({ applications }: Props) {
  const router = useRouter();
  const [selectedApp, setSelectedApp] = useState<ApplicationWithJob | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setLoading(id);
    try {
      await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/applications/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Links</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{app.first_name} {app.last_name}</p>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                    {app.current_company && (
                      <p className="text-sm text-muted-foreground">
                        Currently at {app.current_company}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {app.job?.title || (
                    <span className="text-muted-foreground italic">
                      Position deleted
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {app.years_experience || '—'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {app.linkedin_url && (
                      <a
                        href={app.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {app.portfolio_url && (
                      <a
                        href={app.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                    {app.resume_url && (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary"
                        title="Download Resume"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Select
                    value={app.status}
                    onValueChange={(v) => updateStatus(app.id, v)}
                    disabled={loading === app.id}
                  >
                    <SelectTrigger className={`w-32 ${statusColors[app.status] || ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {APPLICATION_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedApp(app)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteApplication(app.id)}
                      disabled={loading === app.id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {applications.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ApplicationModal
        application={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
      />
    </>
  );
}
