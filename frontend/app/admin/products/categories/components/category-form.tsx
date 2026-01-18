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
import { Switch } from '@/components/ui/switch';
import { X, Plus } from 'lucide-react';
import type { ProductCategory } from '@/lib/types/database';

interface Props {
  category: ProductCategory | null;
}

interface FormData {
  id: string;
  title: string;
  short_title: string;
  route: string;
  headline: string;
  description: string;
  icon: string;
  image: string;
  offerings: string[];
  is_active: boolean;
  sort_order: number;
}

export function CategoryForm({ category }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerings, setOfferings] = useState<string[]>(category?.offerings || ['']);
  const isNew = !category;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      id: category?.id || '',
      title: category?.title || '',
      short_title: category?.short_title || '',
      route: category?.route || '',
      headline: category?.headline || '',
      description: category?.description || '',
      icon: category?.icon || '',
      image: category?.image || '',
      offerings: category?.offerings || [],
      is_active: category?.is_active ?? true,
      sort_order: category?.sort_order || 0,
    },
  });

  const imageValue = watch('image');
  const isActive = watch('is_active');

  const addOffering = () => {
    setOfferings([...offerings, '']);
  };

  const removeOffering = (index: number) => {
    setOfferings(offerings.filter((_, i) => i !== index));
  };

  const updateOffering = (index: number, value: string) => {
    const newOfferings = [...offerings];
    newOfferings[index] = value;
    setOfferings(newOfferings);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Filter out empty offerings
      const filteredOfferings = offerings.filter(o => o.trim() !== '');

      const payload = {
        ...data,
        offerings: filteredOfferings,
      };

      const url = isNew ? '/api/admin/categories' : `/api/admin/categories/${category.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save category');

      toast.success(isNew ? 'Category created' : 'Category updated');
      router.push('/admin/products/categories');
      router.refresh();
    } catch {
      toast.error('Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg border">
      {/* Category ID (only for new categories) */}
      {isNew && (
        <div className="space-y-2">
          <Label htmlFor="id">Category ID *</Label>
          <Input
            id="id"
            {...register('id', { required: true })}
            placeholder="e.g., iot, automation, surveillance"
          />
          <p className="text-sm text-muted-foreground">
            Unique identifier for this category (lowercase, no spaces)
          </p>
          {errors.id && (
            <p className="text-sm text-destructive">ID is required</p>
          )}
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          {...register('title', { required: true })}
          placeholder="e.g., Internet of Things"
        />
        {errors.title && (
          <p className="text-sm text-destructive">Title is required</p>
        )}
      </div>

      {/* Short Title */}
      <div className="space-y-2">
        <Label htmlFor="short_title">Short Title *</Label>
        <Input
          id="short_title"
          {...register('short_title', { required: true })}
          placeholder="e.g., IoT"
        />
        <p className="text-sm text-muted-foreground">
          Used in navigation tabs
        </p>
        {errors.short_title && (
          <p className="text-sm text-destructive">Short title is required</p>
        )}
      </div>

      {/* Route */}
      <div className="space-y-2">
        <Label htmlFor="route">Route *</Label>
        <div className="flex items-center">
          <span className="text-muted-foreground mr-2">/products/</span>
          <Input
            id="route"
            {...register('route', { required: true })}
            placeholder="e.g., iot"
            className="flex-1"
          />
        </div>
        {errors.route && (
          <p className="text-sm text-destructive">Route is required</p>
        )}
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <Label htmlFor="headline">Headline *</Label>
        <Input
          id="headline"
          {...register('headline', { required: true })}
          placeholder="e.g., Smart IoT Solutions for Modern Businesses"
        />
        {errors.headline && (
          <p className="text-sm text-destructive">Headline is required</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register('description', { required: true })}
          placeholder="Enter category description..."
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-destructive">Description is required</p>
        )}
      </div>

      {/* Icon */}
      <div className="space-y-2">
        <Label htmlFor="icon">Icon Name *</Label>
        <Input
          id="icon"
          {...register('icon', { required: true })}
          placeholder="e.g., Cpu, Camera, Shield"
        />
        <p className="text-sm text-muted-foreground">
          Lucide icon name (see lucide.dev/icons)
        </p>
        {errors.icon && (
          <p className="text-sm text-destructive">Icon is required</p>
        )}
      </div>

      {/* Image */}
      <div className="space-y-2">
        <Label htmlFor="image">Image Path *</Label>
        <Input
          id="image"
          {...register('image', { required: true })}
          placeholder="/products/category/hero.jpg"
        />
        {errors.image && (
          <p className="text-sm text-destructive">Image path is required</p>
        )}
        {imageValue && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
            <div className="relative w-32 h-20 bg-gradient-to-br from-muted/50 to-muted rounded overflow-hidden border">
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

      {/* Offerings */}
      <div className="space-y-2">
        <Label>Offerings</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Key offerings or features for this category
        </p>
        <div className="space-y-2">
          {offerings.map((offering, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={offering}
                onChange={(e) => updateOffering(index, e.target.value)}
                placeholder="e.g., Smart sensors and devices"
              />
              {offerings.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOffering(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addOffering}>
            <Plus className="h-4 w-4 mr-2" />
            Add Offering
          </Button>
        </div>
      </div>

      {/* Is Active */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="is_active">Active</Label>
          <p className="text-sm text-muted-foreground">
            Show this category on the website
          </p>
        </div>
        <Switch
          id="is_active"
          checked={isActive}
          onCheckedChange={(checked) => setValue('is_active', checked)}
        />
      </div>

      {/* Sort Order */}
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
          {isSubmitting ? 'Saving...' : (isNew ? 'Create Category' : 'Update Category')}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
