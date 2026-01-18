"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SectionWrapper,
  SectionHeader,
} from "@/components/shared/section-wrapper";
import { EvervaultBackground } from "@/components/ui/evervault-background";
import { SERVICES } from "@/lib/constants";

// Map service IDs to translation keys
const serviceTranslationKeys: Record<string, string> = {
  "embedded-design": "embeddedDesign",
  "software-development": "softwareDev",
  "ai": "ai",
  "blockchain": "blockchain",
  "oem-odm": "oemOdm",
  "staffing": "staffing",
};

// Helper component for learn more link
function LearnMoreLink({ href }: { href: string }) {
  const t = useTranslations("common");
  return (
    <Link
      href={href}
      className="flex items-center text-xs sm:text-sm font-medium text-accent group-hover:text-green-700 transition-colors mt-auto"
    >
      {t("learnMore")}
      <ArrowRight className="ltr:ml-1 ltr:sm:ml-2 rtl:mr-1 rtl:sm:mr-2 h-3 sm:h-4 w-3 sm:w-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
    </Link>
  );
}

// Helper component for capabilities heading
function CapabilitiesHeading() {
  const t = useTranslations("services");
  return (
    <h4 className="font-semibold text-foreground group-hover/expanded:text-neutral-900 mb-2 lg:mb-3 text-xs lg:text-sm transition-colors">
      {t("capabilities")}
    </h4>
  );
}

// Mobile card component
function MobileServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const t = useTranslations("servicesPage");
  const translationKey = serviceTranslationKeys[service.id] || service.id;

  // Get translated content
  const title = t(`${translationKey}.title`);
  const description = t(`${translationKey}.description`);
  const capabilities = [
    t(`${translationKey}.capabilities.1`),
    t(`${translationKey}.capabilities.2`),
    t(`${translationKey}.capabilities.3`),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-background rounded-xl overflow-hidden border border-border h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 flex-shrink-0">
        <Image
          fill
          src={service.image}
          alt={title}
          className={`object-cover ${service.id === "staffing" ? "brightness-125" : "brightness-[1.75]"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/50 via-green-400/15 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 -mt-8 relative z-10 flex flex-col flex-1">
        <h3 className="font-bold text-lg sm:text-xl text-white mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Capabilities - show first 3 */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {capabilities.map((capability) => (
            <li
              key={capability}
              className="text-xs sm:text-sm text-muted-foreground flex items-start"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full ltr:mr-2 rtl:ml-2 mt-1.5 flex-shrink-0" />
              {capability}
            </li>
          ))}
        </ul>

        <LearnMoreLink href={service.route} />
      </div>
    </motion.div>
  );
}

// Desktop learn more link
function DesktopLearnMoreLink({ href }: { href: string }) {
  const t = useTranslations("common");
  return (
    <Link
      href={href}
      className="flex items-center text-sm lg:text-base font-medium text-accent group-hover/expanded:text-green-700 transition-colors"
    >
      {t("learnMore")}
      <ArrowRight className="ltr:ml-2 rtl:mr-2 h-4 w-4 ltr:group-hover/expanded:translate-x-1 rtl:group-hover/expanded:-translate-x-1 rtl:rotate-180 transition-transform" />
    </Link>
  );
}

// Desktop card content component (for translated content)
function DesktopServiceCardContent({ service, isActive, hasActive }: {
  service: typeof SERVICES[number];
  isActive: boolean;
  hasActive: boolean;
}) {
  const t = useTranslations("servicesPage");
  const translationKey = serviceTranslationKeys[service.id] || service.id;

  // Get translated content
  const title = t(`${translationKey}.title`);
  const description = t(`${translationKey}.description`);

  // Get capabilities count from the original service
  const capabilitiesCount = service.capabilities.length;
  const capabilities = Array.from({ length: capabilitiesCount }, (_, i) =>
    t(`${translationKey}.capabilities.${i + 1}`)
  );

  return (
    <>
      {/* Non-expanded view */}
      {!isActive && (
        <motion.div
          layout
          className="relative w-full h-full overflow-hidden"
        >
          <Image
            fill
            src={service.image}
            alt={title}
            className={`object-cover ${service.id === "staffing" ? "brightness-125" : "brightness-[1.75]"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/50 via-green-400/10 to-transparent" />

          <motion.div
            layout
            className="absolute bottom-0 left-0 right-0 p-3 lg:p-4"
          >
            <h3
              className={`font-semibold text-white ${hasActive ? "text-[10px] lg:text-xs" : "text-sm lg:text-base text-center"}`}
              style={hasActive ? { writingMode: "vertical-rl", textOrientation: "mixed" } : {}}
            >
              {title}
            </h3>
          </motion.div>
        </motion.div>
      )}

      {/* Expanded view */}
      {isActive && (
        <motion.div
          layout
          className="flex h-full group/expanded"
        >
          <div className="relative w-[35%] lg:w-[40%] h-full flex-shrink-0">
            <Image
              fill
              src={service.image}
              alt={title}
              className={`object-cover ${service.id === "staffing" ? "brightness-125" : "brightness-[1.75]"}`}
            />
          </div>

          <EvervaultBackground containerClassName="flex-1 overflow-y-auto" className="p-4 lg:p-6 h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 lg:mb-4">
                <div className="flex-1 lg:ltr:pr-4 lg:rtl:pl-4 mb-3 lg:mb-0">
                  <h3 className="font-bold text-lg lg:text-xl xl:text-2xl text-foreground group-hover/expanded:text-neutral-900 transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted-foreground group-hover/expanded:text-neutral-600 mt-1 lg:mt-2 text-xs lg:text-sm transition-colors">
                    {description}
                  </p>
                </div>
                <DesktopLearnMoreLink href={service.route} />
              </div>

              <div className="pt-3 lg:pt-4 border-t border-border group-hover/expanded:border-neutral-700 transition-colors">
                <CapabilitiesHeading />
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-1.5 lg:gap-2">
                  {capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="text-xs lg:text-sm text-muted-foreground group-hover/expanded:text-neutral-600 flex items-start transition-colors"
                    >
                      <span className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-accent group-hover/expanded:bg-green-400 rounded-full ltr:mr-2 rtl:ml-2 mt-1.5 flex-shrink-0 transition-colors" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </EvervaultBackground>
        </motion.div>
      )}
    </>
  );
}

// Desktop expandable cards
function DesktopServiceCards() {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <div onMouseLeave={() => setActiveId(null)}>
      <div className="flex gap-3 lg:gap-4 h-[400px] lg:h-[450px] xl:h-[500px]">
        {SERVICES.map((service) => {
          const isActive = activeId === service.id;
          const hasActive = activeId !== null;

          return (
            <motion.div
              key={service.id}
              layout
              onMouseEnter={() => setActiveId(service.id)}
              className={`
                bg-background rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer
                hover:shadow-lg relative h-full
                ${isActive ? "flex-[4]" : hasActive ? "flex-[0.5]" : "flex-1"}
              `}
              style={{ minWidth: hasActive && !isActive ? "50px" : "auto" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DesktopServiceCardContent service={service} isActive={isActive} hasActive={hasActive} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Services() {
  const t = useTranslations("services");

  return (
    <SectionWrapper variant="muted" id="services">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Mobile: Stacked cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:hidden">
        {SERVICES.map((service, index) => (
          <MobileServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Medium screens (smaller laptops): 3-column grid */}
      <div className="hidden md:grid lg:hidden grid-cols-3 gap-4 max-w-5xl mx-auto auto-rows-fr">
        {SERVICES.map((service, index) => (
          <div key={service.id} className="h-full">
            <MobileServiceCard service={service} index={index} />
          </div>
        ))}
      </div>

      {/* Large screens: Expandable cards */}
      <div className="hidden lg:block">
        <DesktopServiceCards />
      </div>
    </SectionWrapper>
  );
}
