"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import type { Statistic } from '@/lib/types/database';

interface Props {
  statistics: Statistic[];
}

export function StatisticsClient({ statistics }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper variant="muted" id="statistics">
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {statistics.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-baseline justify-center">
              <CountUp
                end={stat.value}
                suffix={stat.suffix}
                start={isInView}
              />
            </div>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

// Count-up animation component
function CountUp({ end, suffix, start }: { end: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [start, end]);

  // Format the count for display
  const displayValue = end >= 1000000
    ? (count / 1000000).toFixed(1)
    : end >= 1000
      ? count.toLocaleString()
      : count.toString();

  return (
    <>
      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
        {displayValue}
      </span>
      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent ml-0.5 sm:ml-1">
        {suffix}
      </span>
    </>
  );
}
