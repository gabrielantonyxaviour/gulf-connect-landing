import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase';
import { CACHE_TAGS } from '../cache';
import type { Statistic, Testimonial, ContactMessageInsert } from '../types/database';

/**
 * Fetches all active statistics from Supabase
 * Cached with tag-based revalidation for instant updates
 */
export const getStatistics = unstable_cache(
  async (): Promise<Statistic[]> => {
    try {
      const { data, error } = await supabase
        .from('rax_landing_statistics')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        console.error('Failed to fetch statistics:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      return [];
    }
  },
  ['statistics'],
  { tags: [CACHE_TAGS.statistics, CACHE_TAGS.homepage, CACHE_TAGS.about] }
);

/**
 * Fetches all active testimonials from Supabase
 * Cached with tag-based revalidation for instant updates
 */
export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    try {
      const { data, error } = await supabase
        .from('rax_landing_testimonials')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        console.error('Failed to fetch testimonials:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      return [];
    }
  },
  ['testimonials'],
  { tags: [CACHE_TAGS.testimonials] }
);

/**
 * Fetches featured testimonials from Supabase
 * Cached with tag-based revalidation for instant updates
 */
export const getFeaturedTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    try {
      const { data, error } = await supabase
        .from('rax_landing_testimonials')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('sort_order');

      if (error) {
        console.error('Failed to fetch featured testimonials:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Failed to fetch featured testimonials:', error);
      return [];
    }
  },
  ['featured-testimonials'],
  { tags: [CACHE_TAGS.testimonials, CACHE_TAGS.homepage] }
);

/**
 * Submit a contact message - not cached as it's a write operation
 */
export async function submitContactMessage(
  message: Omit<ContactMessageInsert, 'id' | 'created_at' | 'is_read' | 'notes'>
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('rax_landing_contact_messages') as any).insert(message);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
