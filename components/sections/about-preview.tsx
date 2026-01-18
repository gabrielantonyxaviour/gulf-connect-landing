"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Clock, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SectionWrapper,
  SectionHeader,
} from "@/components/shared/section-wrapper";
import { cn } from "@/lib/utils";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");

  const highlights = [
    {
      icon: Clock,
      title: t("since"),
      description: t("sinceDescription"),
    },
    {
      icon: Award,
      title: t("certified"),
      description: t("certifiedDescription"),
    },
    {
      icon: Users,
      title: t("clients"),
      description: t("clientsDescription"),
    },
  ];
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
        {/* Content */}
        <div>
        

<div className={"mb-8 sm:mb-10 md:mb-12"}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t("title")}</h2>
    </div>

          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
            {t("description")}
          </p>

          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
            {t("mission")}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center sm:text-left"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 text-accent mb-2 sm:mb-3">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="font-semibold mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">{item.title}</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image/Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/about/company.png"
              alt="Rax-Tech Engineering Team"
              fill
              className="object-cover"
            />
            {/* Gradient overlay for better contrast with floating badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

        </motion.div>
      </div>
    </SectionWrapper>
  );
}
