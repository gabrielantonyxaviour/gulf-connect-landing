import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateStatistics } from '@/lib/revalidation';

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('rax_landing_statistics')
    .select('*')
    .order('sort_order');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const { statistics } = await request.json();
  const supabase = createServerClient();

  // Get existing IDs
  const { data: existing } = await supabase
    .from('rax_landing_statistics')
    .select('id');

  const existingIds = existing?.map(e => e.id) || [];
  const newIds = statistics.map((s: { id: string }) => s.id);

  // Delete removed statistics
  const toDelete = existingIds.filter(id => !newIds.includes(id));
  if (toDelete.length > 0) {
    await supabase
      .from('rax_landing_statistics')
      .delete()
      .in('id', toDelete);
  }

  // Upsert all statistics
  const { error } = await supabase
    .from('rax_landing_statistics')
    .upsert(
      statistics.map((s: { id: string; value: number; suffix: string; label: string; is_active: boolean }, index: number) => ({
        id: s.id,
        value: s.value,
        suffix: s.suffix,
        label: s.label,
        sort_order: index,
        is_active: s.is_active,
      }))
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateStatistics();

  return NextResponse.json({ success: true });
}
