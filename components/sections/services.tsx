"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  SectionWrapper,
  SectionHeader,
} from "@/components/shared/section-wrapper";
import { EvervaultBackground } from "@/components/ui/evervault-background";
import { SERVICES } from "@/lib/constants";

// Mobile card component
function MobileServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
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
          alt={service.title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 -mt-8 relative z-10 flex flex-col flex-1">
        <h3 className="font-bold text-lg sm:text-xl text-foreground mb-2">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Capabilities - show first 3 */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {service.capabilities.slice(0, 3).map((capability) => (
            <li
              key={capability}
              className="text-xs sm:text-sm text-muted-foreground flex items-start"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 mt-1.5 flex-shrink-0" />
              {capability}
            </li>
          ))}
        </ul>

        <Link
          href={service.route}
          className="flex items-center text-xs sm:text-sm font-medium text-accent group-hover:text-white transition-colors mt-auto"
        >
          Learn More
          <ArrowRight className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
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
              {/* Non-expanded view */}
              {!isActive && (
                <motion.div
                  layout
                  className="relative w-full h-full overflow-hidden"
                >
                  <Image
                    fill
                    src={service.image}
                    alt={service.title}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                  <motion.div
                    layout
                    className="absolute bottom-0 left-0 right-0 p-3 lg:p-4"
                  >
                    <h3
                      className={`font-semibold text-foreground ${hasActive ? "text-[10px] lg:text-xs" : "text-sm lg:text-base text-center"}`}
                      style={hasActive ? { writingMode: "vertical-rl", textOrientation: "mixed" } : {}}
                    >
                      {service.title}
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
                      alt={service.title}
                      className="object-cover"
                    />
                  </div>

                  <EvervaultBackground containerClassName="flex-1 overflow-y-auto" className="p-4 lg:p-6 h-full">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 lg:mb-4">
                        <div className="flex-1 lg:pr-4 mb-3 lg:mb-0">
                          <h3 className="font-bold text-lg lg:text-xl xl:text-2xl text-foreground group-hover/expanded:text-white transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground group-hover/expanded:text-neutral-300 mt-1 lg:mt-2 text-xs lg:text-sm transition-colors">
                            {service.description}
                          </p>
                        </div>
                        <Link
                          href={service.route}
                          className="flex items-center text-sm lg:text-base font-medium text-accent group-hover/expanded:text-white transition-colors"
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/expanded:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      <div className="pt-3 lg:pt-4 border-t border-border group-hover/expanded:border-neutral-700 transition-colors">
                        <h4 className="font-semibold text-foreground group-hover/expanded:text-white mb-2 lg:mb-3 text-xs lg:text-sm transition-colors">
                          Capabilities
                        </h4>
                        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-1.5 lg:gap-2">
                          {service.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="text-xs lg:text-sm text-muted-foreground group-hover/expanded:text-neutral-300 flex items-start transition-colors"
                            >
                              <span className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-accent group-hover/expanded:bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0 transition-colors" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </EvervaultBackground>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <SectionWrapper variant="muted" id="services">
      <SectionHeader
        title="Our Services"
        subtitle="End-to-end technology services from concept to deployment, backed by decades of expertise."
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
