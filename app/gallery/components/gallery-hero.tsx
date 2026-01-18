"use client";

import { motion } from "framer-motion";

export function GalleryHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16 bg-gradient-to-b from-accent/5 via-accent/10 to-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our <span className="text-accent">Gallery</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Explore moments from our company events, celebrations, and team
            activities that make Rax Tech a great place to work.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
