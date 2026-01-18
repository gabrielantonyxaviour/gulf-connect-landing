import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateJobs } from '@/lib/revalidation';

export async function POST(request: NextRequest) {
  try {
    const { jobIds } = await request.json();

    if (!Array.isArray(jobIds)) {
      return NextResponse.json(
        { error: 'jobIds array required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Update sort_order for each job
    const updates = jobIds.map((id: string, index: number) =>
      supabase
        .from('rax_landing_jobs')
        .update({ sort_order: index })
        .eq('id', id)
    );

    await Promise.all(updates);

    revalidateJobs();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder jobs:', error);
    return NextResponse.json(
      { error: 'Failed to reorder jobs' },
      { status: 500 }
    );
  }
}
