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
import { Badge } from '@/components/ui/badge';
import { Eye, Mail, MailOpen, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { ContactMessage } from '@/lib/types/database';
import { MessageModal } from './message-modal';

interface Props {
  messages: ContactMessage[];
}

export function MessagesTable({ messages }: Props) {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const toggleRead = async (message: ContactMessage) => {
    setLoading(message.id);
    try {
      await fetch(`/api/admin/messages/${message.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: !message.is_read }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const viewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      await fetch(`/api/admin/messages/${message.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: true }),
      });
      router.refresh();
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>From</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                className={!message.is_read ? 'bg-primary/10' : ''}
              >
                <TableCell>
                  {message.is_read ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="h-4 w-4 text-accent" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {message.first_name} {message.last_name}
                  </div>
                  {!message.is_read && (
                    <Badge variant="default" className="mt-1">New</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-accent hover:underline flex items-center gap-1"
                  >
                    {message.email}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell>
                  {message.company || <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate text-muted-foreground">
                    {message.message}
                  </p>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewMessage(message)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRead(message)}
                      disabled={loading === message.id}
                    >
                      {message.is_read ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <MailOpen className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                      disabled={loading === message.id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No messages yet. Messages from the contact form will appear here.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <MessageModal
        message={selectedMessage}
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </>
  );
}
