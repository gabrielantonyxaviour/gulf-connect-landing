import { supabase } from './supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Bucket names
export const BUCKETS = {
  PRODUCTS: 'rax_landing_products',
  GALLERY: 'rax_landing_gallery',
  RESUMES: 'rax_landing_resumes',
  TESTIMONIALS: 'rax_landing_testimonials',
  CATALOGS: 'rax_landing_catalogs',
} as const;

/**
 * Get public URL for a product image
 * @param path - Image path (e.g., 'categories/iot.png' or 'iot/rt-icm.png')
 */
export function getProductImageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKETS.PRODUCTS}/${path}`;
}

/**
 * Get public URL for a product catalog PDF
 * @param path - Catalog path (e.g., 'iot/rt-icm-catalog.pdf')
 */
export function getCatalogUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKETS.CATALOGS}/${path}`;
}

/**
 * Get public URL for a gallery image
 * @param section - Gallery section (e.g., 'pongal-2025', 'sports-day-2022')
 * @param filename - Image filename
 */
export function getGalleryImageUrl(section: string, filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKETS.GALLERY}/${section}/${filename}`;
}

/**
 * Get public URL for a testimonial image
 * @param type - Image type ('avatars' or 'logos')
 * @param filename - Image filename
 */
export function getTestimonialImageUrl(type: 'avatars' | 'logos', filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKETS.TESTIMONIALS}/${type}/${filename}`;
}

/**
 * Get public URL for a category cover image
 * @param filename - Image filename (e.g., 'iot.png')
 */
export function getCategoryImageUrl(filename: string): string {
  return getProductImageUrl(`categories/${filename}`);
}

/**
 * List all files in a gallery section
 * @param section - Gallery section name
 */
export async function listGalleryImages(section: string) {
  const { data, error } = await supabase.storage
    .from(BUCKETS.GALLERY)
    .list(section);

  if (error) {
    console.error('Error listing gallery images:', error);
    return [];
  }

  return data
    .filter((file) => !file.name.startsWith('.'))
    .map((file) => ({
      name: file.name,
      url: getGalleryImageUrl(section, file.name),
    }));
}

/**
 * List all products in a category
 * @param category - Category slug (e.g., 'iot', 'automation')
 */
export async function listProductImages(category: string) {
  const { data, error } = await supabase.storage
    .from(BUCKETS.PRODUCTS)
    .list(category);

  if (error) {
    console.error('Error listing product images:', error);
    return [];
  }

  return data
    .filter((file) => !file.name.startsWith('.'))
    .map((file) => ({
      name: file.name,
      url: getProductImageUrl(`${category}/${file.name}`),
    }));
}

// Gallery sections configuration
export const GALLERY_SECTIONS = [
  { id: 'pongal-2025', title: 'Pongal Celebrations - 2025' },
  { id: 'sports-day-2022', title: 'Sports Day - Nov 2022' },
  { id: 'environmental-2025', title: 'Environmental Awareness - 2025' },
] as const;
