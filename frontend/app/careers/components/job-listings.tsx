"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Job } from "@/lib/types/database";
import { JobFilters } from "./job-filters";
import { JobCard } from "./job-card";
import { JobDetailsModal } from "./job-details-modal";
import { EmptyState } from "./empty-state";

interface JobListingsProps {
  initialJobs: Job[];
}

export function JobListings({ initialJobs }: JobListingsProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = initialJobs.filter((job) => {
    if (selectedDepartment !== "all" && job.department !== selectedDepartment)
      return false;
    return true;
  });

  const hasActiveFilters = selectedDepartment !== "all";

  // No jobs at all
  if (initialJobs.length === 0) {
    return (
      <section id="open-positions" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find your next opportunity
            </p>
          </motion.div>

          <EmptyState hasJobs={false} />
        </div>
      </section>
    );
  }

  return (
    <section id="open-positions" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Open Positions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your next opportunity
          </p>
        </motion.div>

        <JobFilters
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          jobs={initialJobs}
        />

        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)}
              />
            ))}
          </div>
        ) : (
          <EmptyState hasFilters={hasActiveFilters} hasJobs={true} />
        )}

        <JobDetailsModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      </div>
    </section>
  );
}
