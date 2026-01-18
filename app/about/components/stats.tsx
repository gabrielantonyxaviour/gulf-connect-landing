"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { STATISTICS } from "@/lib/constants";

export function Stats() {
  const t = useTranslations("statistics");
  const tLabels = useTranslations("statistics.labels");

  // Map stat labels to translation keys
  const labelKeyMap: Record<string, string> = {
    "Years of Experience": "yearsExperience",
    "Product Designs": "productDesigns",
    "Product Collaborations": "productCollaborations",
    "Engineering Hours": "engineeringHours",
    "Units Sold": "unitsSold",
    "Customers Served": "customersServed",
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          {STATISTICS.map((stat, index) => {
            const translationKey = labelKeyMap[stat.label] || stat.label;
            const translatedLabel = tLabels(translationKey);

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={translatedLabel}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
