import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateCategories } from '@/lib/revalidation';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single category
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('rax_landing_product_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT update category
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createServerClient();

  // Remove id from body to prevent update conflicts
  const { id: _, ...updateData } = body;

  const { data, error } = await supabase
    .from('rax_landing_product_categories')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateCategories(id);

  return NextResponse.json(data);
}

// PATCH partial update (toggle active, etc.)
export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('rax_landing_product_categories')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateCategories(id);

  return NextResponse.json(data);
}

// DELETE category
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();

  // Check if category has products
  const { count } = await supabase
    .from('rax_landing_products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id);

  if (count && count > 0) {
    return NextResponse.json(
      { error: `Cannot delete category with ${count} products. Remove or reassign products first.` },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from('rax_landing_product_categories')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateCategories();

  return NextResponse.json({ success: true });
}
