"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Image paths for each service
const serviceImages: Record<string, string> = {
  "embedded-design": "/services/embedded-design.png",
  "software-development": "/services/software-development.png",
  "oem-odm": "/services/oem-odm.png",
  staffing: "/services/staffing.png",
};

const colorMap: Record<string, string> = {
  "embedded-design": "from-blue-500/20 via-blue-500/10 to-transparent",
  "software-development": "from-purple-500/20 via-purple-500/10 to-transparent",
  "oem-odm": "from-orange-500/20 via-orange-500/10 to-transparent",
  staffing: "from-green-500/20 via-green-500/10 to-transparent",
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const imageSrc = serviceImages[service.id];
  const gradientColor = colorMap[service.id];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5">
        {/* Background gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            gradientColor
          )}
        />

        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className={cn(
            "relative w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden",
            !isEven && "lg:order-2"
          )}>
            <Image
              src={imageSrc}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r from-card via-card/60 to-transparent",
              isEven ? "lg:bg-gradient-to-r" : "lg:bg-gradient-to-l"
            )} />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:hidden" />
          </div>

          {/* Content Section */}
          <div className={cn(
            "flex-grow p-8",
            !isEven && "lg:order-1"
          )}>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
              {service.title}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {service.capabilities.map((capability, capIndex) => (
                <motion.div
                  key={capability}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + capIndex * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {capability}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-white group/btn"
            >
              <Link href={service.route}>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="hsl(var(--accent))"
        />

        {/* Grid Pattern */}
        <GridPattern
          width={50}
          height={50}
          className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] opacity-30"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              End-to-End{" "}
              <span className="text-accent">Technology Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              From concept to deployment, we provide comprehensive technology
              services backed by decades of expertise and 100+ successful
              projects.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-8"
            >
              {[
                { value: "100+", label: "Projects Delivered" },
                { value: "25+", label: "Years Experience" },
                { value: "50+", label: "Expert Engineers" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers results consistently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your requirements and objectives",
              },
              {
                step: "02",
                title: "Design",
                description: "Creating detailed technical specifications",
              },
              {
                step: "03",
                title: "Development",
                description: "Building and testing your solution",
              },
              {
                step: "04",
                title: "Delivery",
                description: "Deployment and ongoing support",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-accent/50 transition-colors">
                  <div className="text-5xl font-bold text-accent/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-accent/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 opacity-10">
          <GridPattern width={40} height={40} className="stroke-white/20 fill-white/5" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Let&apos;s discuss your project requirements and find the perfect
              solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-accent hover:bg-white/90"
              >
                <Link href="/contact">
                  Contact Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
