"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";

const milestones = [
  {
    year: "2000",
    title: "Company Founded",
    description:
      "Rax Tech International was established in Chennai with a vision to become a global technology enabler.",
  },
  {
    year: "2005",
    title: "ISO Certification",
    description:
      "Achieved ISO 9001 certification, establishing our commitment to quality management systems.",
  },
  {
    year: "2010",
    title: "100+ OEM Designs",
    description:
      "Reached the milestone of 100+ OEM and ODM design collaborations across multiple industries.",
  },
  {
    year: "2015",
    title: "IoT Solutions Launch",
    description:
      "Expanded into Internet of Things solutions, offering remote monitoring and smart device integration.",
  },
  {
    year: "2020",
    title: "1M+ Units Sold",
    description:
      "Celebrated the milestone of 1 million+ units sold across our product portfolio.",
  },
  {
    year: "2024",
    title: "Blockchain & Web3",
    description:
      "Launched Blockchain and Web3 services, embracing the future of decentralized technologies.",
  },
];

export function Timeline() {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key milestones that have shaped Rax Tech over the past{" "}
            {COMPANY.yearsInBusiness}+ years.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

            {/* Milestones */}
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center mb-5 sm:mb-6 md:mb-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-background border rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                      <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background md:-translate-x-1/2 -translate-x-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
