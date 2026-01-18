import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateProducts } from '@/lib/revalidation';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single product
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('rax_landing_products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT update product
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_products')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateProducts(data?.category_id);

  return NextResponse.json(data);
}

// PATCH partial update (toggle active, etc.)
export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_products')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateProducts(data?.category_id);

  return NextResponse.json(data);
}

// DELETE product
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();

  // First get the product to know its category for revalidation
  const { data: product } = await supabase
    .from('rax_landing_products')
    .select('category_id')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('rax_landing_products')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateProducts(product?.category_id);

  return NextResponse.json({ success: true });
}
