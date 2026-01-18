"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
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
import type { ProductCategory } from '@/lib/types/database';

interface Props {
  categories: ProductCategory[];
  productCounts: Record<string, number>;
}

export function CategoriesTable({ categories: initialCategories, productCounts }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState<string | null>(null);

  const toggleActive = async (category: ProductCategory) => {
    setLoading(category.id);
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !category.is_active }),
      });
      if (res.ok) {
        // Update local state immediately
        setCategories(prev =>
          prev.map(c => c.id === category.id ? { ...c, is_active: !c.is_active } : c)
        );
        toast.success(`Category ${!category.is_active ? 'activated' : 'deactivated'}`);
      }
      // Refresh in background after short delay
      setTimeout(() => router.refresh(), 100);
    } finally {
      setLoading(null);
    }
  };

  const deleteCategory = async (id: string) => {
    const count = productCounts[id] || 0;
    if (count > 0) {
      alert(`Cannot delete category with ${count} products. Please remove or reassign products first.`);
      return;
    }

    if (!confirm('Are you sure you want to delete this category?')) return;

    setLoading(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        // Update local state immediately
        setCategories(prev => prev.filter(c => c.id !== id));
        toast.success('Category deleted');
      }
      // Refresh in background after short delay
      setTimeout(() => router.refresh(), 100);
    } finally {
      setLoading(null);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No categories found. Add your first category to get started.</p>
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
            <TableHead>Title</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              </TableCell>
              <TableCell>
                <div className="relative w-12 h-12 bg-gradient-to-br from-muted/50 to-muted rounded overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{category.title}</p>
                  <p className="text-sm text-muted-foreground">{category.short_title}</p>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                /products/{category.route}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {productCounts[category.id] || 0} products
                </Badge>
              </TableCell>
              <TableCell>
                <Switch
                  checked={category.is_active}
                  onCheckedChange={() => toggleActive(category)}
                  disabled={loading === category.id}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/products/categories/${category.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCategory(category.id)}
                    disabled={loading === category.id || (productCounts[category.id] || 0) > 0}
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
