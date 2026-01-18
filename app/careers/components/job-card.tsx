"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Job } from "@/lib/types/database";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

// Map departments to cover images
const departmentImages: Record<string, string> = {
  Engineering: "/services/software-development.png",
  Sales: "/careers/sales.png",
  Marketing: "/careers/marketing.png",
  HR: "/careers/hr.png",
  "Business Development": "/careers/business-dev.png",
};

// Fallback image
const defaultImage = "/services/staffing.png";

export function JobCard({ job, onClick }: JobCardProps) {
  const t = useTranslations("jobDetails");

  // Use embedded design image for embedded roles
  const isEmbeddedRole = job.title.toLowerCase().includes("embedded");
  const coverImage = isEmbeddedRole
    ? "/services/embedded-design.png"
    : (departmentImages[job.department] || defaultImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl border bg-card hover:shadow-lg hover:border-accent/50 transition-all duration-300 overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative h-36 w-full overflow-hidden bg-muted">
        <Image
          src={coverImage}
          alt={`${job.department} department`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Job title */}
        <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors line-clamp-1">
          {job.title}
        </h3>

        {/* Job meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{job.job_type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 flex-shrink-0" />
            <span>{job.experience_level}</span>
          </div>
        </div>

        {/* Description preview */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        {/* View details link */}
        <div className="mt-4 pt-4 border-t">
          <span className="text-sm font-medium text-accent group-hover:underline">
            {t("viewDetails")} &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
