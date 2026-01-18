"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  SectionWrapper,
  SectionHeader,
} from "@/components/shared/section-wrapper";
import { cn } from "@/lib/utils";

interface Industry {
  key: string;
  image: string;
}

const industryData: Industry[] = [
  { key: "manufacturing", image: "/industries/manufacturing.png" },
  { key: "banking", image: "/industries/banking.png" },
  { key: "power", image: "/industries/power.png" },
  { key: "process", image: "/industries/process.png" },
  { key: "petroleum", image: "/industries/petroleum.png" },
  { key: "automotive", image: "/industries/automotive.png" },
  { key: "seaport", image: "/industries/seaport.png" },
  { key: "residential", image: "/industries/residential.png" },
  { key: "education", image: "/industries/education.png" },
  { key: "logistics", image: "/industries/logistics.png" },
  { key: "fashion", image: "/industries/fashion.png" },
  { key: "food", image: "/industries/food.png" },
  { key: "healthcare", image: "/industries/healthcare.png" },
  { key: "retail", image: "/industries/retail.png" },
];

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const t = useTranslations("industries.names");
  const name = t(industry.key);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-border bg-card overflow-hidden",
        "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300",
        "min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px]"
      )}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={industry.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-200"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
      </div>

      {/* Name */}
      <span className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-xs sm:text-sm font-semibold text-white text-center group-hover:text-accent transition-colors z-10">
        {name}
      </span>
    </motion.div>
  );
}

function InfiniteMarquee({
  industries,
  direction = "left",
  speed = "normal",
}: {
  industries: Industry[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}) {
  const speedMap = {
    slow: "40s",
    normal: "25s",
    fast: "15s",
  };

  return (
    // Force LTR direction to keep animation consistent regardless of page RTL setting
    <div dir="ltr" className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <motion.div
        className="flex gap-3 sm:gap-4 py-3 sm:py-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: parseInt(speedMap[speed]),
            ease: "linear",
          },
        }}
      >
        {/* Duplicate industries for seamless loop */}
        {[...industries, ...industries].map((industry, index) => (
          <IndustryCard
            key={`${industry.key}-${index}`}
            industry={industry}
            index={index % industries.length}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Industries() {
  const t = useTranslations("industries");

  // Split industries into two rows
  const firstRow = industryData.slice(0, 7);
  const secondRow = industryData.slice(7);

  return (
    <SectionWrapper id="industries" className="overflow-hidden">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Marquee Rows */}
      <div className="space-y-3 sm:space-y-4">
        <InfiniteMarquee industries={firstRow} direction="left" speed="normal" />
        <InfiniteMarquee industries={secondRow} direction="right" speed="slow" />
      </div>

    </SectionWrapper>
  );
}
