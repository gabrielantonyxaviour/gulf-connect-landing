"use client";

import { motion } from "framer-motion";

export function Certifications() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/bureau-clean.png"
                alt="ISO 9001:2015 - Bureau Veritas"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/zed-clean.png"
                alt="Zed Silver Certification"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
