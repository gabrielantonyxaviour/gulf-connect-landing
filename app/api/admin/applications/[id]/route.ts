import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateApplications } from '@/lib/revalidation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = createServerClient();

  // Fetch application
  const { data: application, error } = await supabase
    .from('rax_landing_job_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!application) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

  // Fetch associated job
  let job = null;
  if (application.job_id) {
    const { data: jobData } = await supabase
      .from('rax_landing_jobs')
      .select('id, title')
      .eq('id', application.job_id)
      .single();
    job = jobData;
  }

  return NextResponse.json({ ...application, job });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const supabase = createServerClient();

  const { error } = await supabase
    .from('rax_landing_job_applications')
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateApplications();

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = createServerClient();

  const { error } = await supabase
    .from('rax_landing_job_applications')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateApplications();

  return NextResponse.json({ success: true });
}
