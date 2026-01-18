"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { EncryptedWords } from "@/components/ui/encrypted-words";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { COMPANY } from "@/lib/constants";
import { GL } from "@/components/gl";

const words = [
  "IoT Solutions",
  "Automation",
  "e-Surveillance",
  "Blockchain",
  "AI Systems",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--accent))"
      />

      {/* Grid Pattern Background */}
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-40"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none opacity-50" />

      {/* WebGL Particle Effect */}
      <div className="absolute top-0 left-0 right-0 bottom-[30%] overflow-hidden pointer-events-none z-[1]">
        <GL hovering={false} className="w-full h-full opacity-30" />
      </div>

      {/* Animated Glow Orb */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 -mt-16 sm:-mt-20 md:-mt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs sm:text-sm font-medium backdrop-blur-sm">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-accent mr-1.5 sm:mr-2 animate-pulse" />
              25+ Years of Technology Excellence
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
          >
            Technology Enabler for
            <br />
            <span className="relative inline-flex mt-1 sm:mt-2 min-h-[1.4em]">
              <EncryptedWords
                words={words}
                duration={3000}
                revealDelayMs={30}
                flipDelayMs={30}
                encryptedClassName="text-muted-foreground/50"
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
          >
            {COMPANY.description}
          </motion.p>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
