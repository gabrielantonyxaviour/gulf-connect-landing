import { createServerClient } from '@/lib/supabase';
import { CategoriesTable } from './components/categories-table';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function AdminCategoriesPage() {
  const supabase = createServerClient();

  const { data: categories } = await supabase
    .from('rax_landing_product_categories')
    .select('*')
    .order('sort_order');

  // Get product count for each category
  const { data: products } = await supabase
    .from('rax_landing_products')
    .select('category_id');

  const productCounts = products?.reduce((acc, product) => {
    acc[product.category_id] = (acc[product.category_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/products">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Products
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Product Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/categories/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoriesTable
        categories={categories || []}
        productCounts={productCounts}
      />
    </div>
  );
}
