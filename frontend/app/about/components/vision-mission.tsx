"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { VISION, MISSION } from "@/lib/constants";

export function VisionMission() {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-muted/50 rounded-2xl p-5 sm:p-6 md:p-8"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <Eye className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Vision</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {VISION}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-accent text-white rounded-2xl p-5 sm:p-6 md:p-8"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <Target className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">{MISSION}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
