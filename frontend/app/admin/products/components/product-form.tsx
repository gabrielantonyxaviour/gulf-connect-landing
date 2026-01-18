"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { Product, ProductCategory } from '@/lib/types/database';

interface Props {
  product: Product | null;
  categories: ProductCategory[];
}

interface FormData {
  category_id: string;
  model: string;
  name: string;
  short_description: string;
  long_description: string;
  image: string;
  is_customer_usecase: boolean;
  is_active: boolean;
  sort_order: number;
}

export function ProductForm({ product, categories }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNew = !product;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      category_id: product?.category_id || '',
      model: product?.model || '',
      name: product?.name || '',
      short_description: product?.short_description || '',
      long_description: product?.long_description || '',
      image: product?.image || '',
      is_customer_usecase: product?.is_customer_usecase || false,
      is_active: product?.is_active ?? true,
      sort_order: product?.sort_order || 0,
    },
  });

  const imageValue = watch('image');
  const shortDescription = watch('short_description');
  const isCustomerUsecase = watch('is_customer_usecase');
  const isActive = watch('is_active');
  const categoryId = watch('category_id');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const url = isNew ? '/api/admin/products' : `/api/admin/products/${product.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to save product');

      toast.success(isNew ? 'Product created' : 'Product updated');
      router.push('/admin/products');
      router.refresh();
    } catch {
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg border">
      {/* Category Select */}
      <div className="space-y-2">
        <Label htmlFor="category_id">Category *</Label>
        <Select
          value={categoryId}
          onValueChange={(value) => setValue('category_id', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && (
          <p className="text-sm text-destructive">Category is required</p>
        )}
      </div>

      {/* Model Input */}
      <div className="space-y-2">
        <Label htmlFor="model">Model Number *</Label>
        <Input
          id="model"
          {...register('model', { required: true })}
          placeholder="e.g., RT-RC01-W"
        />
        {errors.model && (
          <p className="text-sm text-destructive">Model is required</p>
        )}
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          {...register('name', { required: true })}
          placeholder="e.g., Smart Remote Controller"
        />
        {errors.name && (
          <p className="text-sm text-destructive">Name is required</p>
        )}
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description *</Label>
        <Textarea
          id="short_description"
          {...register('short_description', { required: true })}
          placeholder="Brief product summary (shown on card)"
          rows={2}
          maxLength={200}
        />
        <p className="text-xs text-muted-foreground">
          {shortDescription?.length || 0}/200 characters
        </p>
        {errors.short_description && (
          <p className="text-sm text-destructive">Short description is required</p>
        )}
      </div>

      {/* Long Description */}
      <div className="space-y-2">
        <Label htmlFor="long_description">Long Description</Label>
        <Textarea
          id="long_description"
          {...register('long_description')}
          placeholder="Detailed product description (shown when expanded)..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Full product details for expanded view
        </p>
      </div>

      {/* Image Path Input */}
      <div className="space-y-2">
        <Label htmlFor="image">Image Path *</Label>
        <Input
          id="image"
          {...register('image', { required: true })}
          placeholder="/products/category/image.png"
        />
        {errors.image && (
          <p className="text-sm text-destructive">Image path is required</p>
        )}
        {imageValue && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
            <div className="relative w-24 h-24 bg-gradient-to-br from-muted/50 to-muted rounded overflow-hidden border">
              <Image
                src={imageValue}
                alt="Preview"
                fill
                className="object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Is Customer Usecase Switch */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="is_customer_usecase">Customer Use Case</Label>
          <p className="text-sm text-muted-foreground">
            Mark as a customer use case product (for IoT category)
          </p>
        </div>
        <Switch
          id="is_customer_usecase"
          checked={isCustomerUsecase}
          onCheckedChange={(checked) => setValue('is_customer_usecase', checked)}
        />
      </div>

      {/* Is Active Switch */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="is_active">Active</Label>
          <p className="text-sm text-muted-foreground">
            Show this product on the website
          </p>
        </div>
        <Switch
          id="is_active"
          checked={isActive}
          onCheckedChange={(checked) => setValue('is_active', checked)}
        />
      </div>

      {/* Sort Order Input */}
      <div className="space-y-2">
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input
          id="sort_order"
          type="number"
          {...register('sort_order', { valueAsNumber: true })}
          placeholder="0"
        />
        <p className="text-sm text-muted-foreground">
          Lower numbers appear first
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 border-t">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (isNew ? 'Create Product' : 'Update Product')}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
