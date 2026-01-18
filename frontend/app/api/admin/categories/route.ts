import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateCategories } from '@/lib/revalidation';

// GET all categories
export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('rax_landing_product_categories')
    .select('*')
    .order('sort_order');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create category
export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_product_categories')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateCategories();

  return NextResponse.json(data);
}
