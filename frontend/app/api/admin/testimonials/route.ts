import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateTestimonials } from '@/lib/revalidation';

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('rax_landing_testimonials')
    .select('*')
    .order('sort_order');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_testimonials')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTestimonials();

  return NextResponse.json(data);
}
