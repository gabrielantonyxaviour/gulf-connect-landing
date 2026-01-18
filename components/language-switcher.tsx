"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { locales, languages, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function LanguageSwitcher({ variant = "desktop", className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLanguage = languages[locale];

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      // Set cookie for locale preference
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
      // Reload to apply the new locale
      window.location.reload();
    });
    setIsOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className={cn("w-full", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          className="flex items-center gap-2 py-2 text-lg font-medium text-neutral-800"
        >
          <Globe className="h-5 w-5" />
          <span>{currentLanguage.code}</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="ltr:pl-4 rtl:pr-4 space-y-2 py-2">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    disabled={isPending || loc === locale}
                    className={cn(
                      "block w-full text-start py-1",
                      loc === locale
                        ? "text-green-700 font-medium"
                        : "text-neutral-600"
                    )}
                  >
                    {languages[loc].nativeName} ({languages[loc].code})
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium",
          "text-neutral-800",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="font-semibold">{currentLanguage.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute top-full mt-2 z-50 min-w-[140px] rounded-lg",
                "bg-white border border-green-200 shadow-xl overflow-hidden",
                // Handle RTL positioning
                "ltr:right-0 rtl:left-0"
              )}
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  disabled={isPending || loc === locale}
                  className={cn(
                    "w-full px-4 py-2.5 text-sm text-start flex items-center justify-between",
                    loc === locale
                      ? "bg-green-100 text-green-800"
                      : "text-neutral-700 hover:bg-green-50"
                  )}
                >
                  <span>{languages[loc].nativeName}</span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {languages[loc].code}
                  </span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
