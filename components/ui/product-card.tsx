"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProductSpec {
  label: string;
  value: string | number;
  unit?: string;
  max?: number;
}

interface ProductCardProps {
  name: string;
  model?: string;
  category: string;
  description?: string;
  specs: ProductSpec[];
  features?: string[];
  icon?: LucideIcon;
  gradient?: string;
  index?: number;
}

export function ProductCard({
  name,
  model,
  category,
  description,
  specs,
  features = [],
  icon: Icon,
  gradient = "from-accent/20 via-accent/10 to-transparent",
  index = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card h-full transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
        {/* Background gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            gradient
          )}
        />

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`circuit-${index}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 30 H20 M40 30 H60" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M30 0 V20 M30 40 V60" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="30" cy="30" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#circuit-${index})`} />
          </svg>
        </div>

        <div className="relative z-10 p-4 sm:p-5 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {category}
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-1 group-hover:text-accent transition-colors">
                {name}
              </h3>
              {model && (
                <span className="text-xs text-muted-foreground font-mono">
                  {model}
                </span>
              )}
            </div>
            {Icon && (
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:text-white transition-colors" />
              </div>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              {description}
            </p>
          )}

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            {specs.slice(0, 3).map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center p-2 sm:p-3 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors"
              >
                <div className="text-lg sm:text-xl font-bold text-accent">
                  {spec.value}
                  {spec.unit && <span className="text-xs ml-0.5">{spec.unit}</span>}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                  {spec.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="px-1.5 py-0.5 sm:px-2 text-[10px] font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export function ProductCardLarge({
  name,
  model,
  category,
  description,
  specs,
  features = [],
  icon: Icon,
  gradient = "from-accent/20 via-accent/10 to-transparent",
  index = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
        {/* Background gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            gradient
          )}
        />

        <div className="relative z-10 p-5 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            {/* Left side - Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                {Icon && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {category}
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-accent transition-colors">
                    {name}
                  </h3>
                  {model && (
                    <span className="text-sm text-muted-foreground font-mono">
                      Model: {model}
                    </span>
                  )}
                </div>
              </div>

              {description && (
                <p className="text-muted-foreground mb-4 sm:mb-5 md:mb-6">
                  {description}
                </p>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Specs */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-3 sm:p-4 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">
                      {spec.value}
                      {spec.unit && <span className="text-sm ml-1">{spec.unit}</span>}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {spec.label}
                    </div>
                    {spec.max && (
                      <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(Number(spec.value) / spec.max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TerminalProductCard({
  name,
  model,
  specs,
  features = [],
  index = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-black/90 font-mono text-xs sm:text-sm hover:border-accent transition-colors">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/10 border-b border-accent/20">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-muted-foreground">product-info</span>
        </div>

        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          <div className="text-accent">
            <span className="text-green-400">$</span> product --info {model || name}
          </div>
          <div className="border-t border-accent/20 my-2" />
          <div>
            <span className="text-muted-foreground">NAME:</span>{" "}
            <span className="text-white">{name}</span>
          </div>
          {model && (
            <div>
              <span className="text-muted-foreground">MODEL:</span>{" "}
              <span className="text-white">{model}</span>
            </div>
          )}
          {specs.map((spec) => (
            <div key={spec.label}>
              <span className="text-muted-foreground">{spec.label.toUpperCase()}:</span>{" "}
              <span className="text-accent">{spec.value}</span>
              {spec.unit && <span className="text-muted-foreground">{spec.unit}</span>}
              {spec.max && (
                <span className="ml-2 text-muted-foreground">
                  [{"█".repeat(Math.floor((Number(spec.value) / spec.max) * 10))}
                  {"░".repeat(10 - Math.floor((Number(spec.value) / spec.max) * 10))}]
                </span>
              )}
            </div>
          ))}
          {features.length > 0 && (
            <div>
              <span className="text-muted-foreground">FEATURES:</span>{" "}
              <span className="text-yellow-400">[{features.join("] [")}]</span>
            </div>
          )}
          <div className="text-muted-foreground">
            STATUS: <span className="text-green-400">[ACTIVE]</span>
          </div>
          <div className="text-accent animate-pulse">$ _</div>
        </div>
      </div>
    </motion.div>
  );
}
