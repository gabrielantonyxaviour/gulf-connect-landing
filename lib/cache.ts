/**
 * Cache tags for Next.js tag-based revalidation
 *
 * Using tags allows precise cache invalidation - when admin updates data,
 * only the relevant cached data is invalidated, not entire pages.
 *
 * This ensures users ALWAYS see fresh data after admin updates.
 */

/**
 * Cache tags for each resource type
 * These are used with unstable_cache and revalidateTag
 */
export const CACHE_TAGS = {
  // Products
  products: 'products',
  productsByCategory: (categoryId: string) => `products-${categoryId}`,

  // Categories
  categories: 'categories',
  category: (categoryId: string) => `category-${categoryId}`,

  // Jobs
  jobs: 'jobs',

  // Testimonials
  testimonials: 'testimonials',

  // Statistics
  statistics: 'statistics',

  // Homepage (depends on testimonials + statistics)
  homepage: 'homepage',

  // About page
  about: 'about',

  // Careers page
  careers: 'careers',
} as const;

/**
 * Get all tags that should be invalidated for a resource type
 */
export function getTagsForResource(resource: string, dynamicId?: string): string[] {
  switch (resource) {
    case 'products':
      return dynamicId
        ? [CACHE_TAGS.products, CACHE_TAGS.productsByCategory(dynamicId)]
        : [CACHE_TAGS.products];

    case 'categories':
      return dynamicId
        ? [CACHE_TAGS.categories, CACHE_TAGS.category(dynamicId), CACHE_TAGS.products]
        : [CACHE_TAGS.categories, CACHE_TAGS.products];

    case 'jobs':
      return [CACHE_TAGS.jobs, CACHE_TAGS.careers];

    case 'testimonials':
      return [CACHE_TAGS.testimonials, CACHE_TAGS.homepage];

    case 'statistics':
      return [CACHE_TAGS.statistics, CACHE_TAGS.homepage, CACHE_TAGS.about];

    default:
      return [];
  }
}
