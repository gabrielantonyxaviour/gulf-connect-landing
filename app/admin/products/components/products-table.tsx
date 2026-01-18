"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/types/database';

interface Props {
  products: Product[];
  categories: ProductCategory[];
}

export function ProductsTable({ products, categories }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.title || categoryId;
  };

  const toggleActive = async (product: Product) => {
    setLoading(product.id);
    try {
      await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !product.is_active }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No products found. Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              </TableCell>
              <TableCell>
                <div className="relative w-12 h-12 bg-gradient-to-br from-muted/50 to-muted rounded overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {product.model}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {getCategoryName(product.category_id)}
                </Badge>
              </TableCell>
              <TableCell>
                <Switch
                  checked={product.is_active}
                  onCheckedChange={() => toggleActive(product)}
                  disabled={loading === product.id}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/products/${product.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                    disabled={loading === product.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
