"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, GripVertical, Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/types/database';

interface Props {
  testimonial: Testimonial;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  onToggleFeatured: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function TestimonialCard({
  testimonial,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
  onToggleFeatured,
  dragHandleProps,
}: Props) {
  return (
    <div className="bg-card border rounded-lg overflow-hidden group relative">
      <div className="flex">
        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="flex items-center justify-center px-3 bg-muted/30 cursor-move border-r"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Avatar Section */}
        <div className="flex-shrink-0 p-4 flex flex-col items-center justify-center gap-2 border-r bg-muted/10">
          {testimonial.avatar ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-2xl font-semibold text-primary">
                {testimonial.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
          {/* Company Logo */}
          {testimonial.company_logo && (
            <div className="relative w-16 h-8">
              <Image
                src={testimonial.company_logo}
                alt={testimonial.company}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 min-w-0">
          {/* Header: Name, Role, Company */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-lg truncate">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
                {testimonial.company && (
                  <span className="text-primary"> @ {testimonial.company}</span>
                )}
              </p>
            </div>

            {/* Rating */}
            {testimonial.rating && (
              <div className="flex items-center gap-1 flex-shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'text-primary fill-primary'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Testimonial Content */}
          <div className="relative">
            <Quote className="absolute -top-1 -left-1 h-4 w-4 text-primary/30" />
            <p className="text-sm text-muted-foreground pl-4 line-clamp-3">
              {testimonial.content}
            </p>
          </div>

          {/* Footer: Badges & Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex items-center gap-4">
              {/* Featured Toggle */}
              <div className="flex items-center gap-2">
                <Switch
                  checked={testimonial.is_featured}
                  onCheckedChange={onToggleFeatured}
                  disabled={loading}
                />
                <span className="text-xs text-muted-foreground">Featured</span>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2">
                <Switch
                  checked={testimonial.is_active}
                  onCheckedChange={onToggleActive}
                  disabled={loading}
                />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex items-center gap-2">
              {!testimonial.is_active && (
                <Badge variant="secondary">Inactive</Badge>
              )}
              {testimonial.is_featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                disabled={loading}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                disabled={loading}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
