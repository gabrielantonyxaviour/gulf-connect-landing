"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "dark";
}

export function SectionWrapper({
  children,
  className,
  id,
  variant = "default",
}: SectionWrapperProps) {
  const { ref, isInView } = useScrollAnimation(0.1);

  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted/50",
    dark: "bg-foreground text-background",
  };

  return (
    <section
      id={id}
      ref={ref}
      className={cn("py-12 sm:py-16 md:py-20 lg:py-24", bgClasses[variant], className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        {children}
      </motion.div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-8 sm:mb-10 md:mb-12", className)}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}
