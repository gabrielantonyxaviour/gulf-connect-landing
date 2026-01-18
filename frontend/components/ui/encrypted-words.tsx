"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type EncryptedWordsProps = {
  words: string[];
  className?: string;
  /**
   * Time in milliseconds to display each word before transitioning.
   * Defaults to 3000ms.
   */
  duration?: number;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 50ms per character.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string
): string {
  if (!original) return "";
  let result = "";
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result += ch === " " ? " " : generateRandomCharacter(charset);
  }
  return result;
}

export const EncryptedWords: React.FC<EncryptedWordsProps> = ({
  words,
  className,
  duration = 3000,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const [revealCount, setRevealCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [exitProgress, setExitProgress] = useState(0);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastFlipTimeRef = useRef<number>(0);
  const scrambleCharsRef = useRef<string[]>([]);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentWord = words[currentIndex];

  // Set mounted after hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize scramble characters when word changes
  useEffect(() => {
    if (!mounted) return;
    const initial = currentWord
      ? generateGibberishPreservingSpaces(currentWord, charset)
      : "";
    scrambleCharsRef.current = initial.split("");
  }, [mounted, currentWord, charset]);

  // Reveal animation
  useEffect(() => {
    if (!mounted || !isRevealing || isExiting) return;

    startTimeRef.current = performance.now();
    lastFlipTimeRef.current = startTimeRef.current;
    setRevealCount(0);

    let isCancelled = false;

    const update = (now: number) => {
      if (isCancelled) return;

      const elapsedMs = now - startTimeRef.current;
      const totalLength = currentWord.length;
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs))
      );

      setRevealCount(currentRevealCount);

      if (currentRevealCount >= totalLength) {
        setIsRevealing(false);
        // Hold the word for the duration before starting exit
        holdTimeoutRef.current = setTimeout(() => {
          setIsExiting(true);
        }, duration);
        return;
      }

      // Re-randomize unrevealed scramble characters on an interval
      const timeSinceLastFlip = now - lastFlipTimeRef.current;
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        for (let index = 0; index < totalLength; index += 1) {
          if (index >= currentRevealCount) {
            if (currentWord[index] !== " ") {
              scrambleCharsRef.current[index] =
                generateRandomCharacter(charset);
            } else {
              scrambleCharsRef.current[index] = " ";
            }
          }
        }
        lastFlipTimeRef.current = now;
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, isRevealing, isExiting, currentWord, revealDelayMs, charset, flipDelayMs, duration]);

  // Exit animation (scramble out)
  useEffect(() => {
    if (!mounted || !isExiting) return;

    startTimeRef.current = performance.now();
    lastFlipTimeRef.current = startTimeRef.current;
    setExitProgress(0);

    let isCancelled = false;

    const update = (now: number) => {
      if (isCancelled) return;

      const elapsedMs = now - startTimeRef.current;
      const totalLength = currentWord.length;
      const currentExitProgress = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs))
      );

      setExitProgress(currentExitProgress);

      // Re-randomize characters that are "exiting"
      const timeSinceLastFlip = now - lastFlipTimeRef.current;
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        for (let index = 0; index < currentExitProgress; index += 1) {
          if (currentWord[index] !== " ") {
            scrambleCharsRef.current[index] = generateRandomCharacter(charset);
          }
        }
        lastFlipTimeRef.current = now;
      }

      if (currentExitProgress >= totalLength) {
        // Move to next word
        setIsExiting(false);
        setIsRevealing(true);
        setCurrentIndex((prev) => (prev + 1) % words.length);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, isExiting, currentWord, revealDelayMs, charset, flipDelayMs, words.length]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!currentWord) return null;

  // Before mounting, render static text to avoid hydration mismatch
  if (!mounted) {
    return (
      <motion.span
        className={cn("inline-block text-accent", className)}
        aria-label={currentWord}
        role="text"
      >
        {currentWord.split("").map((char, index) => (
          <span key={index} className={encryptedClassName}>
            {char}
          </span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn("inline-block text-accent", className)}
      aria-label={currentWord}
      role="text"
    >
      {currentWord.split("").map((char, index) => {
        let displayChar: string;
        let charClassName: string | undefined;

        if (isExiting) {
          // During exit: characters up to exitProgress are scrambled
          if (index < exitProgress) {
            displayChar =
              char === " "
                ? " "
                : scrambleCharsRef.current[index] ??
                  generateRandomCharacter(charset);
            charClassName = encryptedClassName;
          } else {
            displayChar = char;
            charClassName = revealedClassName;
          }
        } else if (isRevealing) {
          // During reveal: characters up to revealCount are revealed
          if (index < revealCount) {
            displayChar = char;
            charClassName = revealedClassName;
          } else {
            displayChar =
              char === " "
                ? " "
                : scrambleCharsRef.current[index] ??
                  generateRandomCharacter(charset);
            charClassName = encryptedClassName;
          }
        } else {
          // Holding: all characters revealed
          displayChar = char;
          charClassName = revealedClassName;
        }

        return (
          <span key={index} className={charClassName}>
            {displayChar}
          </span>
        );
      })}
    </motion.span>
  );
};
