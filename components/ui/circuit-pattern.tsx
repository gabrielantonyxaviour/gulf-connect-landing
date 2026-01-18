"use client";

import { cn } from "@/lib/utils";

export function CircuitPattern({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="circuit-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Horizontal lines */}
          <path
            d="M0 50 H30 M70 50 H100"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          {/* Vertical lines */}
          <path
            d="M50 0 V30 M50 70 V100"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          {/* Connection nodes */}
          <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="30" cy="50" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="70" cy="50" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="50" cy="30" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="50" cy="70" r="2" fill="currentColor" opacity="0.3" />
          {/* Corner connectors */}
          <path
            d="M30 50 L30 30 L50 30"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M70 50 L70 70 L50 70"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    </svg>
  );
}

export function AnimatedCircuitPattern({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="animated-circuit"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Main circuit paths */}
            <path
              d="M0 40 H25 L35 30 H45 L55 40 H80"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              strokeDasharray="4 2"
            />
            <path
              d="M40 0 V20 L50 30 V50 L40 60 V80"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              strokeDasharray="4 2"
            />
            {/* Nodes */}
            <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="25" cy="40" r="2" fill="currentColor" opacity="0.2" />
            <circle cx="55" cy="40" r="2" fill="currentColor" opacity="0.2" />
            <circle cx="40" cy="20" r="2" fill="currentColor" opacity="0.2" />
            <circle cx="40" cy="60" r="2" fill="currentColor" opacity="0.2" />
          </pattern>

          {/* Animated pulse gradient */}
          <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.3;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.2">
              <animate
                attributeName="stop-opacity"
                values="0.2;0.5;0.2"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="currentColor" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.3;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#animated-circuit)" />
        <rect width="100%" height="100%" fill="url(#pulse-gradient)" opacity="0.1" />
      </svg>
    </div>
  );
}
