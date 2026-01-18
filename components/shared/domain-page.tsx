"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Cpu,
  Cog,
  Shield,
  Blocks,
  Brain,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_DOMAINS, INDUSTRIES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Cog,
  Shield,
  Blocks,
  Brain,
};

interface DomainPageProps {
  domainId: string;
}

export function DomainPage({ domainId }: DomainPageProps) {
  const [scrollOpacity, setScrollOpacity] = useState(0.25);
  const domain = BUSINESS_DOMAINS.find((d) => d.id === domainId);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600;
      const minOpacity = 0;
      const maxOpacity = 0.25;

      const newOpacity = Math.max(
        minOpacity,
        maxOpacity - (scrollY / maxScroll) * maxOpacity
      );
      setScrollOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!domain) {
    return null;
  }

  const Icon = iconMap[domain.icon];
  const otherDomains = BUSINESS_DOMAINS.filter((d) => d.id !== domainId);

  // Select relevant industries for each domain
  const relevantIndustries = INDUSTRIES.slice(0, 8);

  return (
    <>
      {/* Fixed Background Image with Scroll Fade */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Image
          src={domain.image}
          alt={domain.title}
          fill
          className="object-cover"
          style={{ opacity: scrollOpacity }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  {Icon && <Icon className="h-7 sm:h-8 md:h-10 w-7 sm:w-8 md:w-10 text-accent" />}
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    Business Domain
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                    {domain.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-accent font-medium mb-2">
                    {domain.headline}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                    {domain.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">
                Key Offerings
              </h2>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {domain.offerings.map((offering, index) => (
                  <motion.div
                    key={offering}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg sm:rounded-xl"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 sm:h-4 w-3 sm:w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{offering}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 sm:py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
                Why Choose Rax Tech for {domain.title}?
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {[
                  {
                    title: "Proven Track Record",
                    desc: "Trusted by 1200+ clients across industries",
                  },
                  {
                    title: "ISO Certified",
                    desc: "Quality management systems in place",
                  },
                  {
                    title: "End-to-End Solutions",
                    desc: "From design to deployment and support",
                  },
                  {
                    title: "100+ OEM/ODM Projects",
                    desc: "Extensive manufacturing expertise",
                  },
                  {
                    title: "17+ Industries",
                    desc: "Cross-industry experience and knowledge",
                  },
                  {
                    title: "Dedicated Support",
                    desc: "Ongoing maintenance and assistance",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-center p-4 sm:p-6 bg-background rounded-lg sm:rounded-xl"
                  >
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-center">
                Industries We Serve
              </h2>
              <p className="text-muted-foreground text-center mb-6 sm:mb-8 text-sm sm:text-base">
                Our {domain.title.toLowerCase()} solutions are deployed across
                multiple sectors
              </p>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {relevantIndustries.map((industry, index) => (
                  <motion.span
                    key={industry.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/50 rounded-full text-xs sm:text-sm"
                  >
                    {industry.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-accent text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Explore {domain.title} Solutions?
            </h2>
            <p className="text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
              Contact our team to discuss how our {domain.title.toLowerCase()}{" "}
              expertise can help transform your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="h-10 sm:h-11 text-sm sm:text-base">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 h-10 sm:h-11 text-sm sm:text-base"
              >
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Domains */}
      <section className="py-10 sm:py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Explore Other Domains
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
            {otherDomains.map((d) => {
              const DIcon = iconMap[d.icon];
              return (
                <Link key={d.id} href={d.route}>
                  <Card className="h-full hover:shadow-md transition-shadow hover:border-accent/50">
                    <CardContent className="p-4 sm:p-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4">
                        {DIcon && <DIcon className="h-5 sm:h-6 w-5 sm:w-6 text-accent" />}
                      </div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{d.title}</h3>
                      <p className="text-[10px] sm:text-xs text-accent">{d.headline}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
