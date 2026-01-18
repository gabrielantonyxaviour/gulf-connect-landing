import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase';
import { CACHE_TAGS } from '../cache';
import type { Product, ProductCategory } from '../types/database';

/**
 * Fetches all active product categories from Supabase
 * Cached with tag-based revalidation for instant updates
 */
export const getProductCategories = unstable_cache(
  async (): Promise<ProductCategory[]> => {
    try {
      const { data, error } = await supabase
        .from('rax_landing_product_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        console.error('Failed to fetch product categories:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Failed to fetch product categories:', error);
      return [];
    }
  },
  ['product-categories'],
  { tags: [CACHE_TAGS.categories, CACHE_TAGS.products] }
);

/**
 * Fetches all active products for a given category
 * Cached with tag-based revalidation for instant updates
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return unstable_cache(
    async (): Promise<Product[]> => {
      try {
        const { data, error } = await supabase
          .from('rax_landing_products')
          .select('*')
          .eq('category_id', categoryId)
          .eq('is_active', true)
          .order('sort_order');

        if (error) {
          console.error(`Failed to fetch products for category ${categoryId}:`, error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.error(`Failed to fetch products for category ${categoryId}:`, error);
        return [];
      }
    },
    [`products-category-${categoryId}`],
    { tags: [CACHE_TAGS.products, CACHE_TAGS.productsByCategory(categoryId)] }
  )();
}

/**
 * Fetches a single product by model number
 * Returns null if not found or database is unavailable
 */
export async function getProductByModel(model: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('rax_landing_products')
      .select('*')
      .eq('model', model)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error(`Failed to fetch product ${model}:`, error);
      return null;
    }
    return data;
  } catch (error) {
    console.error(`Failed to fetch product ${model}:`, error);
    return null;
  }
}

/**
 * Fetches a product category by its slug/id
 * Cached with tag-based revalidation for instant updates
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  return unstable_cache(
    async (): Promise<ProductCategory | null> => {
      try {
        const { data, error } = await supabase
          .from('rax_landing_product_categories')
          .select('*')
          .eq('id', slug)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error(`Failed to fetch category ${slug}:`, error);
          return null;
        }
        return data;
      } catch (error) {
        console.error(`Failed to fetch category ${slug}:`, error);
        return null;
      }
    },
    [`category-${slug}`],
    { tags: [CACHE_TAGS.categories, CACHE_TAGS.category(slug)] }
  )();
}

/**
 * Fetches all active products
 * Cached with tag-based revalidation for instant updates
 */
export const getAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('rax_landing_products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        console.error('Failed to fetch all products:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Failed to fetch all products:', error);
      return [];
    }
  },
  ['all-products'],
  { tags: [CACHE_TAGS.products] }
);

/**
 * Fetches all active customer usecases (IoT custom solutions)
 * Cached with tag-based revalidation for instant updates
 */
export const getCustomerUsecases = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('rax_landing_products')
        .select('*')
        .eq('is_customer_usecase', true)
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        console.error('Failed to fetch customer usecases:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Failed to fetch customer usecases:', error);
      return [];
    }
  },
  ['customer-usecases'],
  { tags: [CACHE_TAGS.products] }
);
