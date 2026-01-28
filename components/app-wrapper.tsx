"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IntroScreen } from "@/components/intro-screen";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactModalProvider } from "@/components/providers/contact-modal-provider";
import { PostHogProvider } from "@/lib/posthog";
import { PageViewTracker, ScrollDepthTracker } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  // TEMPORARILY DISABLED - set to true to re-enable intro screen
  const showIntro = false;
  // const [showIntro, setShowIntro] = useState(true);
  // const handleIntroComplete = () => {
  //   setShowIntro(false);
  // };

  // Admin pages have their own layout without main navbar/footer
  if (isAdminPage) {
    return (
      <PostHogProvider>
        {children}
      </PostHogProvider>
    );
  }

  return (
    <PostHogProvider>
      <ContactModalProvider>
        {/* Analytics Trackers */}
        <PageViewTracker />
        <ScrollDepthTracker />

        {/* TEMPORARILY DISABLED
        <AnimatePresence mode="wait">
          {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
        </AnimatePresence>
        */}

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
        </motion.div>
      </ContactModalProvider>
    </PostHogProvider>
  );
}
