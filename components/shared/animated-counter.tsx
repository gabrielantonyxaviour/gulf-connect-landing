"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const { ref, isInView } = useScrollAnimation(0.5);
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) => {
    if (value >= 1000000) {
      return (current / 1000000).toFixed(1);
    }
    if (value >= 1000) {
      return Math.floor(current).toLocaleString();
    }
    return Math.floor(current).toString();
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center">
        <motion.span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
          {display}
        </motion.span>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent ml-0.5 sm:ml-1">
          {suffix}
        </span>
      </div>
      <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm">{label}</p>
    </div>
  );
}
