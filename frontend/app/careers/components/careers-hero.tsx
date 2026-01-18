"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface CareersHeroProps {
  jobCount: number;
}

export function CareersHero({ jobCount }: CareersHeroProps) {
  const scrollToPositions = () => {
    document.getElementById("open-positions")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <AuroraBackground className="min-h-[60vh] pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          {jobCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
            >
              {jobCount} Open Position{jobCount !== 1 ? "s" : ""}
            </motion.span>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Build the Future{" "}
            <span className="text-accent">with Us</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Join a team of innovators creating IoT, automation, and surveillance
            solutions that transform industries worldwide.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={scrollToPositions}
              className="gap-2"
            >
              View Open Positions
              <ChevronDown className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
