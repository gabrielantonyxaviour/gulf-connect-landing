import { createServerClient } from '@/lib/supabase';
import { ApplicationsTable } from './components/applications-table';
import { ApplicationFilters } from './components/application-filters';

interface SearchParams {
  job?: string;
  status?: string;
}

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = createServerClient();

  // Fetch applications
  let query = supabase
    .from('rax_landing_job_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (params.job) {
    query = query.eq('job_id', params.job);
  }

  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data: applications } = await query;

  // Fetch jobs for lookup and filter dropdown
  const { data: jobs } = await supabase
    .from('rax_landing_jobs')
    .select('id, title')
    .order('title');

  // Create a job lookup map
  const jobMap = new Map(jobs?.map(j => [j.id, j]) || []);

  // Merge applications with job data
  const applicationsWithJobs = applications?.map(app => ({
    ...app,
    job: jobMap.get(app.job_id) || null,
  })) || [];

  // Count by status
  const statusCounts = {
    all: applicationsWithJobs.length,
    pending: applicationsWithJobs.filter(a => a.status === 'pending').length,
    reviewing: applicationsWithJobs.filter(a => a.status === 'reviewing').length,
    interviewed: applicationsWithJobs.filter(a => a.status === 'interviewed').length,
    hired: applicationsWithJobs.filter(a => a.status === 'hired').length,
    rejected: applicationsWithJobs.filter(a => a.status === 'rejected').length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <p className="text-muted-foreground">
          Review and manage candidate applications
        </p>
      </div>

      <ApplicationFilters
        jobs={jobs || []}
        statusCounts={statusCounts}
        currentJob={params.job}
        currentStatus={params.status}
      />

      <ApplicationsTable applications={applicationsWithJobs} />
    </div>
  );
}
