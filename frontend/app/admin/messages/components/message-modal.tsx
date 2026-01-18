"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { ContactMessage } from '@/lib/types/database';

interface Props {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageModal({ message, isOpen, onClose }: Props) {
  if (!message) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Message from {message.first_name} {message.last_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${message.email}`} className="text-accent hover:underline">
                {message.email}
              </a>
            </div>

            {message.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${message.phone}`} className="hover:underline">
                  {message.phone}
                </a>
              </div>
            )}

            {message.company && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{message.company}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(message.created_at), 'PPp')}</span>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <h4 className="font-medium mb-2">Message</h4>
            <div className="p-4 bg-background border rounded-lg whitespace-pre-wrap">
              {message.message}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button asChild className="flex-1">
              <a href={`mailto:${message.email}?subject=Re: Your inquiry to Rax Tech`}>
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
