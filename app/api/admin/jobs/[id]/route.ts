import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateJobs } from '@/lib/revalidation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const supabase = createServerClient();

  // Check slug uniqueness (excluding current job)
  const { data: existing } = await supabase
    .from('rax_landing_jobs')
    .select('id')
    .eq('slug', body.slug)
    .neq('id', id)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('rax_landing_jobs')
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateJobs();

  return NextResponse.json(data);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_jobs')
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateJobs();

  return NextResponse.json(data);
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = createServerClient();

  // First delete related applications
  await supabase
    .from('rax_landing_job_applications')
    .delete()
    .eq('job_id', id);

  // Then delete the job
  const { error } = await supabase
    .from('rax_landing_jobs')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateJobs();

  return NextResponse.json({ success: true });
}
