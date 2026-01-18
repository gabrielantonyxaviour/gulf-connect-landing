"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";

export function AboutHero() {
  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 sm:mb-5 md:mb-6">
            About Us
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {COMPANY.yearsInBusiness}+ Years of{" "}
            <span className="text-accent">Technology Excellence</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {COMPANY.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
