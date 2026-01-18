"use client";

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Upload, X, Loader2, FileText } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/types/database';

interface Props {
  product: Product | null;
  categories: ProductCategory[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (updatedProduct: Product) => void;
}

interface FormData {
  category_id: string;
  model: string;
  name: string;
  short_description: string;
  long_description: string;
  catalog_url: string;
  image: string;
  is_customer_usecase: boolean;
  is_active: boolean;
}

export function ProductEditDialog({
  product,
  categories,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCatalog, setUploadingCatalog] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const catalogInputRef = useRef<HTMLInputElement>(null);
  const isNew = !product;

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      category_id: '',
      model: '',
      name: '',
      short_description: '',
      long_description: '',
      catalog_url: '',
      image: '',
      is_customer_usecase: false,
      is_active: true,
    },
  });

  // Reset form when product changes or dialog opens
  useEffect(() => {
    if (open) {
      reset({
        category_id: product?.category_id || '',
        model: product?.model || '',
        name: product?.name || '',
        short_description: product?.short_description || '',
        long_description: product?.long_description || '',
        catalog_url: product?.catalog_url || '',
        image: product?.image || '',
        is_customer_usecase: product?.is_customer_usecase || false,
        is_active: product?.is_active ?? true,
      });
    }
  }, [product, open, reset]);

  const imageValue = watch('image');
  const catalogUrl = watch('catalog_url');
  const isCustomerUsecase = watch('is_customer_usecase');
  const isActive = watch('is_active');
  const categoryId = watch('category_id');
  const shortDescription = watch('short_description');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (categoryId) {
        formData.append('categoryId', categoryId);
      }

      const res = await fetch('/api/admin/products/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to upload');
      }

      const data = await res.json();
      setValue('image', data.url);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleCatalogUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCatalog(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (categoryId) formData.append('categoryId', categoryId);
      formData.append('productModel', watch('model') || 'product');

      const res = await fetch('/api/admin/products/upload-catalog', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to upload');
      }

      const data = await res.json();
      setValue('catalog_url', data.url);
      toast.success('Catalog uploaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload catalog');
    } finally {
      setUploadingCatalog(false);
      if (catalogInputRef.current) catalogInputRef.current.value = '';
    }
  };

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

      const updatedProduct: Product = await res.json();
      toast.success(isNew ? 'Product created' : 'Product updated');
      onOpenChange(false);
      onSuccess(updatedProduct);
    } catch {
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add Product' : 'Edit Product'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Model & Name row */}
          <div className="grid grid-cols-2 gap-4">
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
              placeholder="Detailed product description (shown in enquiry dialog)..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Full product details for enquiry context
            </p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Image *</Label>
            <div className="flex items-start gap-4">
              {imageValue ? (
                <div className="relative w-32 h-32 bg-gradient-to-br from-muted/50 to-muted rounded-lg overflow-hidden border group">
                  <Image
                    src={imageValue}
                    alt="Product"
                    fill
                    className="object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setValue('image', '')}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG, WebP (max 5MB)
                </p>
                {errors.image && (
                  <p className="text-sm text-destructive mt-1">Image is required</p>
                )}
              </div>
            </div>
          </div>

          {/* Catalog PDF Upload */}
          <div className="space-y-2">
            <Label>Product Catalog (PDF)</Label>
            <div className="flex items-center gap-4">
              {catalogUrl ? (
                <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50 flex-1">
                  <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                  <a
                    href={catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline truncate flex-1"
                  >
                    View Catalog PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => setValue('catalog_url', '')}
                    className="text-muted-foreground hover:text-destructive flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 border rounded-lg border-dashed flex-1">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">No catalog uploaded</span>
                </div>
              )}
              <div>
                <input
                  ref={catalogInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleCatalogUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => catalogInputRef.current?.click()}
                  disabled={uploadingCatalog}
                >
                  {uploadingCatalog ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {catalogUrl ? 'Replace' : 'Upload'}
                    </>
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              PDF file up to 10MB
            </p>
          </div>

          {/* Switches row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="is_customer_usecase">Customer Use Case</Label>
                <p className="text-xs text-muted-foreground">For IoT category</p>
              </div>
              <Switch
                id="is_customer_usecase"
                checked={isCustomerUsecase}
                onCheckedChange={(checked) => setValue('is_customer_usecase', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="is_active">Active</Label>
                <p className="text-xs text-muted-foreground">Show on website</p>
              </div>
              <Switch
                id="is_active"
                checked={isActive}
                onCheckedChange={(checked) => setValue('is_active', checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit" disabled={isSubmitting || uploadingImage || uploadingCatalog}>
              {isSubmitting ? 'Saving...' : (isNew ? 'Create Product' : 'Update Product')}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
