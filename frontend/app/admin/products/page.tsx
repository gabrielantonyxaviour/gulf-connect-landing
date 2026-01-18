import { createServerClient } from '@/lib/supabase';
import { ProductsGrid } from './components/products-grid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AdminProductsPage() {
  const supabase = createServerClient();

  const { data: categories } = await supabase
    .from('rax_landing_product_categories')
    .select('*')
    .order('sort_order');

  const { data: products } = await supabase
    .from('rax_landing_products')
    .select('*')
    .order('category_id, sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog. Drag to reorder within categories.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/products/categories">
            Manage Categories
          </Link>
        </Button>
      </div>

      <ProductsGrid products={products || []} categories={categories || []} />
    </div>
  );
}
