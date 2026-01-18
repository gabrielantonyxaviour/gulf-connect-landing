import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateProducts } from '@/lib/revalidation';

export async function POST(request: NextRequest) {
  try {
    const { categoryId, productIds } = await request.json();

    if (!categoryId || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'categoryId and productIds array required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Update sort_order for each product
    const updates = productIds.map((id: string, index: number) =>
      supabase
        .from('rax_landing_products')
        .update({ sort_order: index })
        .eq('id', id)
        .eq('category_id', categoryId)
    );

    await Promise.all(updates);

    revalidateProducts(categoryId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder products:', error);
    return NextResponse.json(
      { error: 'Failed to reorder products' },
      { status: 500 }
    );
  }
}
