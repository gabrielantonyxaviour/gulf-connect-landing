"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { SectionWrapper } from "@/components/shared/section-wrapper";

export function ContactCTA() {
  const pathname = usePathname();
  const router = useRouter();

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
            Ready to Transform Your Business?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
            Let&apos;s discuss how Rax Tech can help you leverage technology for
            growth. Our team of experts is ready to understand your needs and
            deliver tailored solutions.
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
            <span>Get in Touch</span>
            <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
