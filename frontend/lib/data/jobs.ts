import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase';
import { CACHE_TAGS } from '../cache';
import type { Job, JobApplicationInsert } from '../types/database';

/**
 * Fetches all active job listings
 * Cached with tag-based revalidation for instant updates
 */
export const getActiveJobs = unstable_cache(
  async (): Promise<Job[]> => {
    try {
      const { data, error } = await supabase
        .from('rax_landing_jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch active jobs:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Failed to fetch active jobs:', error);
      return [];
    }
  },
  ['active-jobs'],
  { tags: [CACHE_TAGS.jobs, CACHE_TAGS.careers] }
);

/**
 * Fetches a single job by its slug
 * Cached with tag-based revalidation
 */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  return unstable_cache(
    async (): Promise<Job | null> => {
      try {
        const { data, error } = await supabase
          .from('rax_landing_jobs')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error(`Failed to fetch job by slug ${slug}:`, error);
          return null;
        }
        return data;
      } catch (error) {
        console.error(`Failed to fetch job by slug ${slug}:`, error);
        return null;
      }
    },
    [`job-slug-${slug}`],
    { tags: [CACHE_TAGS.jobs] }
  )();
}

/**
 * Fetches a single job by its ID
 * Cached with tag-based revalidation
 */
export async function getJobById(id: string): Promise<Job | null> {
  return unstable_cache(
    async (): Promise<Job | null> => {
      try {
        const { data, error } = await supabase
          .from('rax_landing_jobs')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error(`Failed to fetch job by id ${id}:`, error);
          return null;
        }
        return data;
      } catch (error) {
        console.error(`Failed to fetch job by id ${id}:`, error);
        return null;
      }
    },
    [`job-id-${id}`],
    { tags: [CACHE_TAGS.jobs] }
  )();
}

/**
 * Fetches jobs by department
 * Cached with tag-based revalidation
 */
export async function getJobsByDepartment(department: string): Promise<Job[]> {
  return unstable_cache(
    async (): Promise<Job[]> => {
      try {
        const { data, error } = await supabase
          .from('rax_landing_jobs')
          .select('*')
          .eq('department', department)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error(`Failed to fetch jobs by department ${department}:`, error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.error(`Failed to fetch jobs by department ${department}:`, error);
        return [];
      }
    },
    [`jobs-department-${department}`],
    { tags: [CACHE_TAGS.jobs] }
  )();
}

/**
 * Submit a job application - not cached as it's a write operation
 */
export async function submitJobApplication(
  application: Omit<JobApplicationInsert, 'id' | 'created_at' | 'updated_at' | 'status' | 'notes'>
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('rax_landing_job_applications') as any).insert(application);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
