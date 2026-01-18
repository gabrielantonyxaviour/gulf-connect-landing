"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const benefitKeys = [
  {
    key: "innovation",
    image: "/careers/innovation.png",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    key: "growth",
    image: "/careers/growth-opportunities.png",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    key: "balance",
    image: "/careers/work-life-balance.png",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    key: "impact",
    image: "/careers/global-impact.png",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    key: "culture",
    image: "/careers/collabrative-culture.png",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    key: "benefits",
    image: "/careers/competitive-benefits.png",
    className: "md:col-span-2 md:row-span-1",
  },
];

export function WhyJoinUs() {
  const t = useTranslations("careers.whyJoin");
  const tBenefits = useTranslations("careers.whyJoin.benefits");
  const tCompany = useTranslations("company");

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[180px]">
          {benefitKeys.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${benefit.className}`}
            >
              {/* Background Image */}
              <Image
                src={benefit.image}
                alt={tBenefits(`${benefit.key}.title`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                  {tBenefits(`${benefit.key}.title`)}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {tBenefits(`${benefit.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
