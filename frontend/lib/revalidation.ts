/**
 * Centralized cache revalidation utility
 *
 * This module ensures consistent cache invalidation across all admin operations.
 * Uses BOTH path-based AND tag-based revalidation for maximum reliability.
 *
 * IMPORTANT: Always use these functions instead of calling revalidatePath directly.
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { CACHE_TAGS, getTagsForResource } from './cache';

/**
 * Revalidation config for each resource type
 */
const REVALIDATION_CONFIG = {
  products: {
    adminPaths: ['/admin/products'],
    publicPaths: (categoryId?: string) => categoryId ? [`/products/${categoryId}`] : [],
    tags: (categoryId?: string) => getTagsForResource('products', categoryId),
  },

  categories: {
    adminPaths: ['/admin/products', '/admin/products/categories'],
    publicPaths: (categoryId?: string) => categoryId ? [`/products/${categoryId}`] : [],
    tags: (categoryId?: string) => getTagsForResource('categories', categoryId),
  },

  jobs: {
    adminPaths: ['/admin/jobs'],
    publicPaths: ['/careers'],
    tags: () => getTagsForResource('jobs'),
  },

  testimonials: {
    adminPaths: ['/admin/testimonials'],
    publicPaths: ['/'],
    tags: () => getTagsForResource('testimonials'),
  },

  statistics: {
    adminPaths: ['/admin/numbers'],
    publicPaths: ['/', '/about'],
    tags: () => getTagsForResource('statistics'),
  },

  messages: {
    adminPaths: ['/admin/messages'],
    publicPaths: [],
    tags: () => [],
  },

  applications: {
    adminPaths: ['/admin/applications'],
    publicPaths: [],
    tags: () => [],
  },
} as const;

type ResourceType = keyof typeof REVALIDATION_CONFIG;

/**
 * Revalidate all caches for a given resource type
 * Uses both path-based and tag-based revalidation for reliability
 */
function revalidateResource(resource: ResourceType, dynamicId?: string): void {
  const config = REVALIDATION_CONFIG[resource];

  // 1. Revalidate by tags (precise cache invalidation)
  // Using 'max' profile for stale-while-revalidate behavior (Next.js 16+)
  const tags = typeof config.tags === 'function' ? config.tags(dynamicId) : config.tags;
  tags.forEach(tag => {
    try {
      revalidateTag(tag, 'max');
    } catch (e) {
      console.error(`Failed to revalidate tag ${tag}:`, e);
    }
  });

  // 2. Revalidate admin paths
  config.adminPaths.forEach(path => {
    try {
      revalidatePath(path);
    } catch (e) {
      console.error(`Failed to revalidate path ${path}:`, e);
    }
  });

  // 3. Revalidate public paths
  const publicPaths = typeof config.publicPaths === 'function'
    ? config.publicPaths(dynamicId)
    : config.publicPaths;

  publicPaths.forEach(path => {
    try {
      revalidatePath(path);
    } catch (e) {
      console.error(`Failed to revalidate path ${path}:`, e);
    }
  });
}

/**
 * Helper functions for each resource type
 */
export function revalidateProducts(categoryId?: string): void {
  revalidateResource('products', categoryId);
}

export function revalidateCategories(categoryId?: string): void {
  revalidateResource('categories', categoryId);
}

export function revalidateJobs(): void {
  revalidateResource('jobs');
}

export function revalidateTestimonials(): void {
  revalidateResource('testimonials');
}

export function revalidateStatistics(): void {
  revalidateResource('statistics');
}

export function revalidateMessages(): void {
  revalidateResource('messages');
}

export function revalidateApplications(): void {
  revalidateResource('applications');
}

/**
 * Revalidate multiple resources at once
 */
export function revalidateResources(
  resources: Array<{ type: ResourceType; dynamicId?: string }>
): void {
  resources.forEach(({ type, dynamicId }) => {
    revalidateResource(type, dynamicId);
  });
}

// Re-export cache tags for use in data functions
export { CACHE_TAGS } from './cache';
