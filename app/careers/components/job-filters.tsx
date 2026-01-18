"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import type { Job } from "@/lib/types/database";

interface JobFiltersProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  jobs: Job[];
}

const DEPARTMENT_KEYS = ["all", "Engineering", "Marketing", "Sales"] as const;

export function JobFilters({
  selectedDepartment,
  onDepartmentChange,
  jobs,
}: JobFiltersProps) {
  const t = useTranslations("jobFilters");

  // Count jobs per department
  const departmentCounts = jobs.reduce((acc, job) => {
    acc[job.department] = (acc[job.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getCount = (dept: string) => {
    if (dept === "all") return jobs.length;
    return departmentCounts[dept] || 0;
  };

  const getLabel = (dept: string) => {
    switch (dept) {
      case "all":
        return t("all");
      case "Engineering":
        return t("engineering");
      case "Marketing":
        return t("marketing");
      case "Sales":
        return t("sales");
      default:
        return dept;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex justify-center"
    >
      <Tabs
        value={selectedDepartment}
        onValueChange={onDepartmentChange}
        className="w-full sm:w-auto"
      >
        <TabsList className="w-full sm:w-auto h-auto p-1 flex-wrap">
          {DEPARTMENT_KEYS.map((dept) => {
            const count = getCount(dept);
            return (
              <TabsTrigger
                key={dept}
                value={dept}
                className="px-4 py-2 text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none"
              >
                {getLabel(dept)}
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
