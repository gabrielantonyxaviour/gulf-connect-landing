"use client";

import { motion } from "framer-motion";
import { Briefcase, Search, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/constants";

interface EmptyStateProps {
  hasFilters?: boolean;
  hasJobs?: boolean;
}

export function EmptyState({ hasFilters = false, hasJobs = true }: EmptyStateProps) {
  const t = useTranslations("emptyState");

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
        <h3 className="text-xl font-semibold mb-2">{t("noOpenPositions")}</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          {t("noPositionsMessage")}
        </p>
        <div className="inline-flex items-center gap-2 text-accent">
          <Mail className="h-4 w-4" />
          <a
            href={`mailto:${CONTACT.email}`}
            className="hover:underline"
          >
            {t("sendResume")} {CONTACT.email}
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
      <h3 className="text-xl font-semibold mb-2">{t("noPositionsFound")}</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        {hasFilters ? t("adjustFilters") : t("checkBackSoon")}
      </p>
    </motion.div>
  );
}
