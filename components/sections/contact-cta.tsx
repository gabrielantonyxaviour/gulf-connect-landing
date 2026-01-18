"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { SectionWrapper } from "@/components/shared/section-wrapper";

export function ContactCTA() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("contactCta");
  const tCommon = useTranslations("common");

  const handleGetInTouch = () => {
    if (pathname === "/contact") {
      document.getElementById("conversation")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact#conversation");
    }
  };

  return (
    <SectionWrapper variant="default" id="contact">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
            {t("description")} {t("subDescription")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={handleGetInTouch}
            className="bg-accent hover:bg-accent/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg flex items-center gap-2 group transition-all duration-300"
          >
            <span>{tCommon("getInTouch")}</span>
            <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
          </button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
