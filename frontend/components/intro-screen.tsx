"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [tapCount, setTapCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [loadProgress, setLoadProgress] = useState(0); // 0 to 100
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight * 0.95;
      setDimensions({ width, height });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Show hint after 3 seconds
  useEffect(() => {
    hintTimeoutRef.current = setTimeout(() => {
      setShowHint(true);
    }, 3000);

    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, []);

  const handleTap = useCallback(() => {
    // Reset timeout for tap sequence
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Animate progress from center outward
    const targetProgress = (newCount / 2) * 100;
    setLoadProgress(targetProgress);

    if (newCount >= 2) {
      // Double tap detected - wait for animation then fade out slowly
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 1200);
      }, 800);
    } else {
      // Reset tap count after 1500ms of no tapping
      tapTimeoutRef.current = setTimeout(() => {
        setTapCount(0);
        setLoadProgress(0);
      }, 1500);
    }
  }, [tapCount, onComplete]);

  // Handle both click and touch
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      handleTap();
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      handleTap();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchend", handleTouch);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchend", handleTouch);
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, [handleTap]);

  // Prevent scrolling when intro is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center cursor-pointer select-none"
        >
          {/* Logo container with loading effect */}
          <div className="relative">
            {/* Faded/light version of logo (always visible) */}
            <div className="opacity-20">
              <PixelatedCanvas
                src="/images/logo.png"
                width={dimensions.width}
                height={dimensions.height}
                cellSize={4}
                dotScale={0.85}
                shape="square"
                backgroundColor="#0a0a0a"
                interactive={true}
                distortionMode="swirl"
                distortionStrength={5}
                distortionRadius={100}
                jitterStrength={3}
                jitterSpeed={3}
                dropoutStrength={0.1}
                objectFit="contain"
                tintColor="#ffffff"
                tintStrength={0}
                fadeOnLeave={true}
                fadeSpeed={0.2}
                hoverDropoutStrength={0.8}
                hoverDropoutRadius={120}
              />
            </div>

            {/* Full color version with clip mask animating from center outward */}
            <motion.div
              className="absolute inset-0 opacity-60"
              initial={{ clipPath: "inset(0 50% 0 50%)" }}
              animate={{ clipPath: `inset(0 ${50 - loadProgress / 2}% 0 ${50 - loadProgress / 2}%)` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <PixelatedCanvas
                src="/images/logo.png"
                width={dimensions.width}
                height={dimensions.height}
                cellSize={4}
                dotScale={0.85}
                shape="square"
                backgroundColor="transparent"
                interactive={true}
                distortionMode="swirl"
                distortionStrength={5}
                distortionRadius={100}
                jitterStrength={3}
                jitterSpeed={3}
                dropoutStrength={0.1}
                objectFit="contain"
                tintColor="#ffffff"
                tintStrength={0}
                fadeOnLeave={true}
                fadeSpeed={0.2}
                hoverDropoutStrength={0.8}
                hoverDropoutRadius={120}
              />
            </motion.div>
          </div>

          {/* Hint text - bottom right */}
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 text-accent text-xs sm:text-sm font-medium tracking-wider"
              >
                Tap to enter
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-background"
        />
      )}
    </AnimatePresence>
  );
}
