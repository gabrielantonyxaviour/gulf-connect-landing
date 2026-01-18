"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AnimatedGradientOrb({
  className,
  size = "lg",
  color = "accent",
  delay = 0,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "accent" | "blue" | "purple" | "pink";
  delay?: number;
}) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-72 h-72",
    xl: "w-96 h-96",
  };

  const colorClasses = {
    accent: "from-accent/40 via-accent/20 to-transparent",
    blue: "from-blue-500/40 via-blue-500/20 to-transparent",
    purple: "from-purple-500/40 via-purple-500/20 to-transparent",
    pink: "from-pink-500/40 via-pink-500/20 to-transparent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.4, 0.6, 0.4],
        scale: [1, 1.1, 1],
        x: [0, 20, -20, 0],
        y: [0, -20, 20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={cn(
        "absolute rounded-full blur-3xl bg-gradient-radial",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      style={{
        background: `radial-gradient(circle, var(--tw-gradient-stops))`,
      }}
    />
  );
}

export function GradientBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <AnimatedGradientOrb
        className="top-0 left-1/4"
        size="xl"
        color="accent"
        delay={0}
      />
      <AnimatedGradientOrb
        className="top-1/3 right-1/4"
        size="lg"
        color="purple"
        delay={2}
      />
      <AnimatedGradientOrb
        className="bottom-1/4 left-1/3"
        size="lg"
        color="blue"
        delay={4}
      />
    </div>
  );
}

export function MeshGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-30",
        className
      )}
      style={{
        background: `
          radial-gradient(at 40% 20%, hsla(var(--accent), 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(276, 100%, 50%, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(var(--accent), 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(225, 100%, 50%, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(var(--accent), 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(276, 100%, 50%, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(var(--accent), 0.2) 0px, transparent 50%)
        `,
      }}
    />
  );
}
