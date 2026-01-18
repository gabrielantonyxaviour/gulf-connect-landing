import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateJobs } from '@/lib/revalidation';

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('rax_landing_jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServerClient();

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from('rax_landing_jobs')
    .select('id')
    .eq('slug', body.slug)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('rax_landing_jobs')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateJobs();

  return NextResponse.json(data);
}
