"use client";

import { motion } from "framer-motion";
import { Briefcase, Search, Mail } from "lucide-react";

interface EmptyStateProps {
  hasFilters?: boolean;
  hasJobs?: boolean;
}

export function EmptyState({ hasFilters = false, hasJobs = true }: EmptyStateProps) {
  if (!hasJobs) {
    // No jobs at all in the system
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Briefcase className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Open Positions</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          We don&apos;t have any open positions at the moment. However, we&apos;re always
          looking for talented individuals.
        </p>
        <div className="inline-flex items-center gap-2 text-accent">
          <Mail className="h-4 w-4" />
          <a
            href="mailto:careers@rax-tech.com"
            className="hover:underline"
          >
            Send your resume to careers@rax-tech.com
          </a>
        </div>
      </motion.div>
    );
  }

  // Filters applied but no matches
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Positions Found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        {hasFilters
          ? "Try adjusting your filters to see more opportunities."
          : "Check back soon for new opportunities."}
      </p>
    </motion.div>
  );
}
