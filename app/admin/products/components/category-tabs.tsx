"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProductCategory } from '@/lib/types/database';

interface Props {
  categories: ProductCategory[];
}

export function CategoryTabs({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <Tabs value={currentCategory} onValueChange={handleCategoryChange} className="mb-4">
      <TabsList>
        <TabsTrigger value="all">All Products</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.short_title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
