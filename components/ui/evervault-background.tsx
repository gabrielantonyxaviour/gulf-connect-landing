"use client";

import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

function generateRandomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

interface EvervaultBackgroundProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function EvervaultBackground({
  children,
  className,
  containerClassName,
}: EvervaultBackgroundProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    setRandomString(generateRandomString(2000));
  }, []);

  const onMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      setRandomString(generateRandomString(2000));
    },
    [mouseX, mouseY]
  );

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group/evervault relative overflow-hidden",
        containerClassName
      )}
    >
      <EvervaultPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}

function EvervaultPattern({
  mouseX,
  mouseY,
  randomString,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  randomString: string;
}) {
  const maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Base gradient always visible but subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-red-950/10" />

      {/* Hover gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600/40 via-red-800/30 to-red-950/40 opacity-0 group-hover/evervault:opacity-100 backdrop-blur-sm transition-opacity duration-300"
        style={style}
      />

      {/* Random characters overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 mix-blend-overlay group-hover/evervault:opacity-100 transition-opacity duration-300"
        style={style}
      >
        <p className="absolute inset-0 text-red-500/60 font-mono text-[10px] leading-tight whitespace-pre-wrap break-all overflow-hidden select-none">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}
