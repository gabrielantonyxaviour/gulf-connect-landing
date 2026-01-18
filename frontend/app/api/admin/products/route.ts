import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateProducts } from '@/lib/revalidation';

// GET all products
export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('rax_landing_products')
    .select('*')
    .order('category_id, sort_order');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create product
export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_products')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Revalidate all product-related pages
  revalidateProducts(data?.category_id);

  return NextResponse.json(data);
}
