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
import { Star, Upload, X, Loader2 } from 'lucide-react';
import type { Testimonial } from '@/lib/types/database';

interface Props {
  testimonial: Testimonial | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (testimonial: Testimonial) => void;
}

interface FormData {
  name: string;
  role: string;
  company: string;
  company_logo: string;
  avatar: string;
  content: string;
  rating: number | null;
  is_featured: boolean;
  is_active: boolean;
}

export function TestimonialEditDialog({
  testimonial,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const isNew = !testimonial;

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      role: '',
      company: '',
      company_logo: '',
      avatar: '',
      content: '',
      rating: null,
      is_featured: false,
      is_active: true,
    },
  });

  // Reset form when testimonial changes or dialog opens
  useEffect(() => {
    if (open) {
      reset({
        name: testimonial?.name || '',
        role: testimonial?.role || '',
        company: testimonial?.company || '',
        company_logo: testimonial?.company_logo || '',
        avatar: testimonial?.avatar || '',
        content: testimonial?.content || '',
        rating: testimonial?.rating || null,
        is_featured: testimonial?.is_featured ?? false,
        is_active: testimonial?.is_active ?? true,
      });
    }
  }, [testimonial, open, reset]);

  const avatarValue = watch('avatar');
  const companyLogoValue = watch('company_logo');
  const isFeatured = watch('is_featured');
  const isActive = watch('is_active');
  const ratingValue = watch('rating');

  const uploadImage = async (file: File, type: 'avatar' | 'logo') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const res = await fetch('/api/admin/testimonials/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to upload');
    }

    const data = await res.json();
    return data.url;
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const url = await uploadImage(file, 'avatar');
      setValue('avatar', url);
      toast.success('Avatar uploaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const url = await uploadImage(file, 'logo');
      setValue('company_logo', url);
      toast.success('Logo uploaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload logo');
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${testimonial.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to save testimonial');

      const savedTestimonial: Testimonial = await res.json();
      toast.success(isNew ? 'Testimonial created' : 'Testimonial updated');
      onOpenChange(false);
      onSuccess(savedTestimonial);
    } catch {
      toast.error('Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Client Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Client Name *</Label>
            <Input
              id="name"
              {...register('name', { required: true })}
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="text-sm text-destructive">Name is required</p>
            )}
          </div>

          {/* Role & Company row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Title/Position *</Label>
              <Input
                id="role"
                {...register('role', { required: true })}
                placeholder="CEO, CTO, etc."
              />
              {errors.role && (
                <p className="text-sm text-destructive">Role is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                {...register('company', { required: true })}
                placeholder="Company Name"
              />
              {errors.company && (
                <p className="text-sm text-destructive">Company is required</p>
              )}
            </div>
          </div>

          {/* Image Uploads Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Avatar Upload */}
            <div className="space-y-2">
              <Label>Client Photo</Label>
              <div className="flex items-center gap-3">
                {avatarValue ? (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border group">
                    <Image
                      src={avatarValue}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setValue('avatar', '')}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={uploadingAvatar}
                  >
                    {uploadingAvatar ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WebP (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Company Logo Upload */}
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-3">
                {companyLogoValue ? (
                  <div className="relative w-20 h-12 rounded overflow-hidden border bg-white group">
                    <Image
                      src={companyLogoValue}
                      alt="Logo"
                      fill
                      className="object-contain p-1"
                    />
                    <button
                      type="button"
                      onClick={() => setValue('company_logo', '')}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-12 rounded bg-muted flex items-center justify-center border-2 border-dashed">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadingLogo}
                  >
                    {uploadingLogo ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WebP (max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Testimonial Quote *</Label>
            <Textarea
              id="content"
              {...register('content', { required: true })}
              rows={4}
              placeholder="What the client said about your services..."
            />
            {errors.content && (
              <p className="text-sm text-destructive">Testimonial content is required</p>
            )}
          </div>

          {/* Rating & Switches row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <Select
                value={ratingValue?.toString() || ''}
                onValueChange={(v) => setValue('rating', v && v !== 'none' ? parseInt(v) : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No rating</SelectItem>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: n }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-primary fill-primary" />
                        ))}
                        <span className="ml-1">{n}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="is_featured">Featured</Label>
                <p className="text-xs text-muted-foreground">Show on homepage</p>
              </div>
              <Switch
                id="is_featured"
                checked={isFeatured}
                onCheckedChange={(checked) => setValue('is_featured', checked)}
              />
            </div>

            {/* Active Toggle */}
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
            <Button type="submit" disabled={isSubmitting || uploadingAvatar || uploadingLogo}>
              {isSubmitting ? 'Saving...' : (isNew ? 'Create Testimonial' : 'Update Testimonial')}
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
