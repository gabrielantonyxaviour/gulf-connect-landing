import { createServerClient } from '@/lib/supabase';
import { JobsGrid } from './components/jobs-grid';

export default async function AdminJobsPage() {
  const supabase = createServerClient();

  const { data: jobs } = await supabase
    .from('rax_landing_jobs')
    .select('*')
    .order('sort_order');

  // Get application counts per job
  const { data: applications } = await supabase
    .from('rax_landing_job_applications')
    .select('job_id');

  const applicationCounts: Record<string, number> = {};
  applications?.forEach(app => {
    applicationCounts[app.job_id] = (applicationCounts[app.job_id] || 0) + 1;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <p className="text-muted-foreground">
            Manage career opportunities. Drag to reorder.
          </p>
        </div>
      </div>

      <JobsGrid jobs={jobs || []} applicationCounts={applicationCounts} />
    </div>
  );
}
