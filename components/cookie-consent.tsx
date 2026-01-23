"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const savePreferences = (acceptAll = false) => {
    const finalPreferences = acceptAll
      ? { necessary: true, analytics: true, marketing: true }
      : preferences;

    localStorage.setItem("cookie-consent", JSON.stringify(finalPreferences));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());

    // Here you would typically initialize analytics/marketing scripts based on consent
    if (finalPreferences.analytics) {
      // Initialize analytics (e.g., Google Analytics)
      console.log("Analytics enabled");
    }
    if (finalPreferences.marketing) {
      // Initialize marketing cookies
      console.log("Marketing enabled");
    }

    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true);
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    savePreferences(false);
  };

  const handleSavePreferences = () => {
    savePreferences(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl">
              {/* Close button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="h-5 w-5" />
              </button>

              {!showSettings ? (
                // Main banner
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Cookie className="h-10 w-10 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        Cookie Preferences
                      </h3>
                      <p className="text-sm text-neutral-600 max-w-2xl">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking "Accept All", you consent to our use of cookies.{" "}
                        <button
                          onClick={() => setShowSettings(true)}
                          className="text-red-600 hover:text-red-700 underline font-medium"
                        >
                          Customize preferences
                        </button>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-2.5 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              ) : (
                // Settings panel
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Cookie Settings
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Choose which cookies you want to accept. You can change these settings at any time.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Necessary Cookies */}
                    <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-neutral-900">
                            Necessary Cookies
                          </h4>
                          <span className="px-2 py-0.5 text-xs font-medium text-neutral-600 bg-neutral-200 rounded">
                            Always Active
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600">
                          Essential for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="mt-1 h-5 w-5 rounded border-neutral-300"
                      />
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                          Analytics Cookies
                        </h4>
                        <p className="text-xs text-neutral-600">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="mt-1 h-5 w-5 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                      />
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                          Marketing Cookies
                        </h4>
                        <p className="text-xs text-neutral-600">
                          Used to track visitors across websites for marketing purposes.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) =>
                          setPreferences({ ...preferences, marketing: e.target.checked })
                        }
                        className="mt-1 h-5 w-5 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 px-6 py-2.5 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 px-6 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
