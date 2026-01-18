"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 100];

export function ScrollDepthTracker() {
  const pathname = usePathname();
  const trackedMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset tracked milestones when page changes
    trackedMilestonesRef.current = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      SCROLL_MILESTONES.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !trackedMilestonesRef.current.has(milestone)
        ) {
          trackedMilestonesRef.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      });
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Check initial scroll position (for users who land mid-page)
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [pathname]);

  return null;
}
