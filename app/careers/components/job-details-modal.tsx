"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, DollarSign, X, CheckCircle, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Job } from "@/lib/types/database";
import { ApplicationForm } from "./application-form";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

// Map departments to cover images
const departmentImages: Record<string, string> = {
  Engineering: "/services/software-development.png",
  Sales: "/careers/sales.png",
  Marketing: "/careers/marketing.png",
  HR: "/careers/hr.png",
  "Business Development": "/careers/business-dev.png",
};

const defaultImage = "/services/staffing.png";

function getCoverImage(job: Job): string {
  const isEmbeddedRole = job.title.toLowerCase().includes("embedded");
  return isEmbeddedRole
    ? "/services/embedded-design.png"
    : (departmentImages[job.department] || defaultImage);
}

export function JobDetailsModal({
  job,
  isOpen,
  onClose,
}: JobDetailsModalProps) {
  const [showApplication, setShowApplication] = useState(false);
  const t = useTranslations("jobDetails");
  const tCareers = useTranslations("careers");

  if (!job) return null;

  const coverImage = getCoverImage(job);

  const handleApply = () => {
    setShowApplication(true);
  };

  const handleBack = () => {
    setShowApplication(false);
  };

  const handleClose = () => {
    setShowApplication(false);
    onClose();
  };

  const handleSuccess = () => {
    setShowApplication(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {showApplication ? (
          <>
            {/* Application Form View */}
            <DialogHeader className="sticky top-0 z-10 bg-background border-b p-6 pb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t("applyingFor")}
                  </p>
                  <DialogTitle className="text-xl font-bold">
                    {job.title}
                  </DialogTitle>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <ApplicationForm
                job={job}
                onSuccess={handleSuccess}
                onCancel={handleBack}
              />
            </div>
          </>
        ) : (
          <>
            {/* Job Details View */}
            {/* Cover Image */}
            <div className="relative h-48 w-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={coverImage}
                alt={`${job.department} department`}
                fill
                className="object-cover"
              />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Header */}
            <DialogHeader className="sticky top-0 z-10 bg-background border-b p-6 pb-4">
              <DialogTitle className="text-xl sm:text-2xl font-bold">
                {job.title}
              </DialogTitle>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{job.job_type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.experience_level}</span>
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary_range}</span>
                  </div>
                )}
              </div>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-3">{t("aboutTheRole")}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">{t("requirements")}</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">{t("responsibilities")}</h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">{t("benefits")}</h4>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 z-10 bg-background border-t p-6">
              <Button size="lg" className="w-full" onClick={handleApply}>
                {tCareers("applyNow")}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
