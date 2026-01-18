"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';
import { ProductCard } from './product-card';
import { ProductEditDialog } from './product-edit-dialog';
import type { Product, ProductCategory } from '@/lib/types/database';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  products: Product[];
  categories: ProductCategory[];
}

function SortableProductCard({
  product,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  product: Product;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ProductCard
        product={product}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export function ProductsGrid({ products: initialProducts, categories }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = products
      .filter(p => p.category_id === category.id)
      .sort((a, b) => a.sort_order - b.sort_order);
    return acc;
  }, {} as Record<string, Product[]>);

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const toggleActive = async (product: Product) => {
    setLoading(product.id);
    try {
      await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !product.is_active }),
      });
      setProducts(prev =>
        prev.map(p =>
          p.id === product.id ? { ...p, is_active: !p.is_active } : p
        )
      );
    } finally {
      setLoading(null);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted');
    } finally {
      setLoading(null);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleAddNew = (categoryId?: string) => {
    setEditingProduct(null);
    setSelectedCategory(categoryId || null);
    setDialogOpen(true);
  };

  const handleDialogSuccess = (updatedProduct: Product) => {
    // Update local state immediately for instant reflection
    setProducts(prev => {
      const existingIndex = prev.findIndex(p => p.id === updatedProduct.id);
      if (existingIndex >= 0) {
        // Update existing product
        return prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      } else {
        // Add new product
        return [...prev, updatedProduct];
      }
    });
    // Refresh server components in background after a short delay
    // to ensure local state update is fully processed first
    setTimeout(() => router.refresh(), 100);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeProduct = products.find(p => p.id === active.id);
    const overProduct = products.find(p => p.id === over.id);

    if (!activeProduct || !overProduct) return;

    // Only allow reordering within the same category
    if (activeProduct.category_id !== overProduct.category_id) {
      toast.error('Cannot move products between categories');
      return;
    }

    const categoryId = activeProduct.category_id;
    const categoryProducts = productsByCategory[categoryId];

    const oldIndex = categoryProducts.findIndex(p => p.id === active.id);
    const newIndex = categoryProducts.findIndex(p => p.id === over.id);

    const newOrder = arrayMove(categoryProducts, oldIndex, newIndex);

    // Update local state immediately for smooth UX
    setProducts(prev => {
      const otherProducts = prev.filter(p => p.category_id !== categoryId);
      return [...otherProducts, ...newOrder.map((p, i) => ({ ...p, sort_order: i }))];
    });

    // Persist to server
    try {
      await fetch('/api/admin/products/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          productIds: newOrder.map(p => p.id),
        }),
      });
    } catch {
      toast.error('Failed to save order');
      router.refresh();
    }
  };

  const activeProduct = activeId ? products.find(p => p.id === activeId) : null;

  if (products.length === 0 && categories.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <p className="text-muted-foreground mb-4">No products found. Add categories and products to get started.</p>
        <Button onClick={() => handleAddNew()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
        <ProductEditDialog
          product={null}
          categories={categories}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={handleDialogSuccess}
        />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        {categories.map(category => {
          const categoryProducts = productsByCategory[category.id] || [];
          const isCollapsed = collapsedCategories.has(category.id);

          return (
            <div key={category.id} className="bg-card rounded-lg border overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center gap-3 hover:bg-muted/50 transition-colors rounded -m-2 p-2"
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                  <h3 className="font-semibold">{category.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    ({categoryProducts.length} products)
                  </span>
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddNew(category.id)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              {/* Products Grid */}
              {!isCollapsed && (
                <div className="p-4 pt-0">
                  {categoryProducts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No products in this category
                    </p>
                  ) : (
                    <SortableContext
                      items={categoryProducts.map(p => p.id)}
                      strategy={rectSortingStrategy}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {categoryProducts.map(product => (
                          <SortableProductCard
                            key={product.id}
                            product={product}
                            loading={loading === product.id}
                            onEdit={() => handleEdit(product)}
                            onDelete={() => deleteProduct(product.id)}
                            onToggleActive={() => toggleActive(product)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeProduct && (
          <div className="opacity-90">
            <ProductCard
              product={activeProduct}
              loading={false}
              onEdit={() => {}}
              onDelete={() => {}}
              onToggleActive={() => {}}
            />
          </div>
        )}
      </DragOverlay>

      <ProductEditDialog
        product={editingProduct}
        categories={categories}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleDialogSuccess}
      />
    </DndContext>
  );
}
