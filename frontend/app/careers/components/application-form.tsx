"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Job } from "@/lib/types/database";
import {
  jobApplicationSchema,
  type JobApplicationFormData,
} from "@/lib/validations";
import { EXPERIENCE_LEVELS } from "@/lib/constants";
import { ResumeUpload } from "./resume-upload";
import { trackFormSubmit } from "@/lib/analytics";

interface ApplicationFormProps {
  job: Job;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ApplicationForm({
  job,
  onSuccess,
  onCancel,
}: ApplicationFormProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const onSubmit = async (data: JobApplicationFormData) => {
    if (!resumeFile) {
      setResumeError("Please upload your resume");
      return;
    }
    setResumeError(null);

    setIsSubmitting(true);

    try {
      // 1. Upload resume
      const formData = new FormData();
      formData.append("file", resumeFile);

      const uploadRes = await fetch("/api/careers/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const uploadData = await uploadRes.json();
        throw new Error(uploadData.error || "Failed to upload resume");
      }

      const { url: resumeUrl } = await uploadRes.json();

      // 2. Submit application
      const submitRes = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: job.id,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          current_company: data.currentCompany || null,
          linkedin_url: data.linkedinUrl || null,
          portfolio_url: data.portfolioUrl || null,
          years_experience: data.yearsExperience || null,
          cover_letter: data.coverLetter || null,
          resume_url: resumeUrl,
        }),
      });

      if (!submitRes.ok) {
        const submitData = await submitRes.json();
        throw new Error(submitData.error || "Failed to submit application");
      }

      toast.success("Application submitted successfully!");
      trackFormSubmit("job_application", true, { job_id: job.id, job_title: job.title });
      onSuccess();
    } catch (error) {
      trackFormSubmit("job_application", false, {
        job_id: job.id,
        job_title: job.title,
        error: error instanceof Error ? error.message : "Unknown error"
      });
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-accent">*</span>
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="John"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-accent">*</span>
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Doe"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-accent">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="john.doe@example.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="+91 98765 43210"
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Current Company */}
      <div className="space-y-2">
        <Label htmlFor="currentCompany">Current Company</Label>
        <Input
          id="currentCompany"
          {...register("currentCompany")}
          placeholder="Acme Inc."
          disabled={isSubmitting}
        />
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <Label htmlFor="yearsExperience">Years of Experience</Label>
        <select
          id="yearsExperience"
          {...register("yearsExperience")}
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select experience level</option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* LinkedIn URL */}
      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
        <Input
          id="linkedinUrl"
          type="url"
          {...register("linkedinUrl")}
          placeholder="https://linkedin.com/in/johndoe"
          disabled={isSubmitting}
        />
        {errors.linkedinUrl && (
          <p className="text-sm text-red-500">{errors.linkedinUrl.message}</p>
        )}
      </div>

      {/* Portfolio URL */}
      <div className="space-y-2">
        <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
        <Input
          id="portfolioUrl"
          type="url"
          {...register("portfolioUrl")}
          placeholder="https://johndoe.dev"
          disabled={isSubmitting}
        />
        {errors.portfolioUrl && (
          <p className="text-sm text-red-500">{errors.portfolioUrl.message}</p>
        )}
      </div>

      {/* Resume Upload */}
      <ResumeUpload
        value={resumeFile}
        onChange={setResumeFile}
        error={resumeError || undefined}
      />

      {/* Cover Letter */}
      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <textarea
          id="coverLetter"
          {...register("coverLetter")}
          placeholder="Tell us why you're interested in this role..."
          disabled={isSubmitting}
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </div>
    </form>
  );
}
