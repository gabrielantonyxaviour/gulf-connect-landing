import type { Metadata } from "next";
import { Toaster } from "sonner";
import { SEO } from "@/lib/constants";
import { CareersHero } from "./components/careers-hero";
import { WhyJoinUs } from "./components/why-join-us";
import { JobListings } from "./components/job-listings";
import { getActiveJobs } from "@/lib/data/jobs";

export const metadata: Metadata = {
  title: SEO.careers.title,
  description: SEO.careers.description,
};

export default async function CareersPage() {
  const jobs = await getActiveJobs();

  return (
    <>
      <Toaster position="top-right" richColors />
      <CareersHero jobCount={jobs.length} />
      <WhyJoinUs />
      <JobListings initialJobs={jobs} />
    </>
  );
}
