"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

// Initialize PostHog only on client side
if (typeof window !== "undefined") {
  const posthogEnabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true";
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

  if (posthogEnabled && posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      // Enable session recording
      capture_pageview: false, // We'll handle this manually for better control
      capture_pageleave: true, // Track when users leave pages
      // Session recording settings
      disable_session_recording: false,
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
          password: true,
        },
      },
      // Autocapture clicks
      autocapture: true,
      // Persistence
      persistence: "localStorage+cookie",
      // Performance
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          // Log events in development for debugging
          console.log("[PostHog] Initialized successfully");
        }
      },
    });
  } else if (process.env.NODE_ENV === "development") {
    if (!posthogEnabled) {
      console.warn("[PostHog] Disabled via NEXT_PUBLIC_POSTHOG_ENABLED.");
    } else {
      console.warn("[PostHog] No API key found. Analytics disabled.");
    }
  }
}

interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}

// Export posthog instance for direct usage
export { posthog };
