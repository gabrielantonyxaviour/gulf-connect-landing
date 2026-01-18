import { createServerClient } from '@/lib/supabase';
import { MessagesTable } from './components/messages-table';

export default async function AdminMessagesPage() {
  const supabase = createServerClient();

  const { data: messages } = await supabase
    .from('rax_landing_contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const unreadCount = messages?.filter(m => !m.is_read).length || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread messages` : 'All messages read'}
          </p>
        </div>
      </div>

      <MessagesTable messages={messages || []} />
    </div>
  );
}
