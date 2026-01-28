"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Certifications() {
  const t = useTranslations("about.certifications");

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
          >
            {t("titlePrefix")} <span className="text-accent">{t("titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/bureau-clean.png"
                alt="ISO 9001:2015 - Bureau Veritas"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground font-medium">
              {t("iso")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/zed-clean.png"
                alt="Zed Silver Certification"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground font-medium">
              {t("zed")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
