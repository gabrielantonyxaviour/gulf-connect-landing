"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const benefits = [
  {
    image: "/careers/innovation.png",
    title: "Innovation First",
    description: "Work on cutting-edge IoT and automation technologies",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    image: "/careers/growth-opportunities.png",
    title: "Growth Opportunities",
    description: "Clear career paths and continuous learning",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    image: "/careers/work-life-balance.png",
    title: "Work-Life Balance",
    description: "Flexible arrangements and supportive culture",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    image: "/careers/global-impact.png",
    title: "Global Impact",
    description: "Solutions deployed across 17+ industries worldwide",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    image: "/careers/collabrative-culture.png",
    title: "Collaborative Culture",
    description: "Work alongside experienced engineers and innovators",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    image: "/careers/competitive-benefits.png",
    title: "Competitive Benefits",
    description: "Comprehensive health coverage and employee perks",
    className: "md:col-span-2 md:row-span-1",
  },
];

export function WhyJoinUs() {
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
            Why Join <span className="text-accent">Rax Tech</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Be part of a team that&apos;s shaping the future of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[180px]">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${benefit.className}`}
            >
              {/* Background Image */}
              <Image
                src={benefit.image}
                alt={benefit.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
