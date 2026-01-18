"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, Building2, Calendar, Linkedin, Globe, Download, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { APPLICATION_STATUSES } from '@/lib/constants';

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
  application: ApplicationWithJob | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  pending: 'bg-primary/20 text-primary',
  reviewing: 'bg-primary/20 text-primary',
  interviewed: 'bg-primary/20 text-primary',
  hired: 'bg-primary/20 text-primary',
  rejected: 'bg-destructive/20 text-destructive',
};

export function ApplicationModal({ application, isOpen, onClose }: Props) {
  const router = useRouter();
  const [notes, setNotes] = useState(application?.notes || '');
  const [saving, setSaving] = useState(false);

  if (!application) return null;

  const updateApplication = async (data: Partial<ApplicationWithJob>) => {
    setSaving(true);
    try {
      await fetch(`/api/admin/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = () => {
    updateApplication({ notes });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {application.first_name} {application.last_name}
            </DialogTitle>
            <Badge className={statusColors[application.status]}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </div>
          {application.job && (
            <p className="text-muted-foreground">
              Applied for: <span className="font-medium">{application.job.title}</span>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${application.email}`} className="text-accent hover:underline">
                {application.email}
              </a>
            </div>

            {application.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${application.phone}`} className="hover:underline">
                  {application.phone}
                </a>
              </div>
            )}

            {application.current_company && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{application.current_company}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(application.created_at), 'PPp')}</span>
            </div>

            {application.years_experience && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{application.years_experience} experience</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {application.linkedin_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={application.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            )}
            {application.portfolio_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={application.portfolio_url} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Portfolio
                </a>
              </Button>
            )}
            {application.resume_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            )}
          </div>

          {/* Cover Letter */}
          {application.cover_letter && (
            <div>
              <h4 className="font-medium mb-2">Cover Letter</h4>
              <div className="p-4 bg-background border rounded-lg whitespace-pre-wrap text-sm max-h-48 overflow-y-auto">
                {application.cover_letter}
              </div>
            </div>
          )}

          {/* Status Update */}
          <div>
            <h4 className="font-medium mb-2">Update Status</h4>
            <Select
              value={application.status}
              onValueChange={(value) => updateApplication({ status: value })}
              disabled={saving}
            >
              <SelectTrigger className="w-48">
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
          </div>

          {/* Notes */}
          <div>
            <h4 className="font-medium mb-2">Internal Notes</h4>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this candidate..."
              rows={3}
            />
            <Button
              size="sm"
              className="mt-2"
              onClick={handleSaveNotes}
              disabled={saving || notes === application.notes}
            >
              Save Notes
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button asChild className="flex-1">
              <a href={`mailto:${application.email}?subject=Re: Your application for ${application.job?.title || 'a position'} at Rax Tech`}>
                Reply via Email
              </a>
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
