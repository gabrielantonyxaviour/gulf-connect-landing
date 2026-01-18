import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateMessages } from '@/lib/revalidation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_contact_messages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const supabase = createServerClient();

  const { error } = await supabase
    .from('rax_landing_contact_messages')
    .update(body)
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateMessages();

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = createServerClient();

  const { error } = await supabase
    .from('rax_landing_contact_messages')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateMessages();

  return NextResponse.json({ success: true });
}
