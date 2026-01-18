"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import type { Product } from '@/lib/types/database';

interface Props {
  product: Product;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function ProductCard({
  product,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
  dragHandleProps,
}: Props) {
  return (
    <div className="bg-card border rounded-lg overflow-hidden group">
      {/* Drag Handle */}
      <div
        {...dragHandleProps}
        className="flex items-center justify-center py-2 bg-muted/30 cursor-move border-b"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
        />
        {!product.is_active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary">Inactive</Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <p className="font-mono text-xs text-muted-foreground mb-1">
          {product.model}
        </p>
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <Switch
            checked={product.is_active}
            onCheckedChange={onToggleActive}
            disabled={loading}
          />
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
  );
}
