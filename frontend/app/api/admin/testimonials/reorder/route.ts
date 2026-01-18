import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateTestimonials } from '@/lib/revalidation';

export async function POST(request: NextRequest) {
  try {
    const { testimonialIds } = await request.json();

    if (!Array.isArray(testimonialIds)) {
      return NextResponse.json(
        { error: 'testimonialIds array required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Update sort_order for each testimonial
    const updates = testimonialIds.map((id: string, index: number) =>
      supabase
        .from('rax_landing_testimonials')
        .update({ sort_order: index })
        .eq('id', id)
    );

    await Promise.all(updates);

    revalidateTestimonials();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to reorder testimonials' },
      { status: 500 }
    );
  }
}
