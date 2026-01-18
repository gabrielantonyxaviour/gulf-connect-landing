"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent, trackCTA } from "@/lib/analytics";
import {
  ArrowRight,
  Package,
  Lightbulb,
  ChevronDown,
  Radio,
  Cpu,
  BarChart3,
  Factory,
  Bell,
  Video,
  KeyRound,
  Server,
  Smartphone,
  Building2,
  Navigation,
  Satellite,
  Database,
  Users,
  Timer,
  Thermometer,
  AlertTriangle,
  Settings,
  Gauge,
  Shield,
  Volume2,
  FileText,
  MessageSquare,
  LucideIcon,
} from "lucide-react";

// Icon mapping for offerings based on keywords
const getOfferingIcon = (offering: string): LucideIcon => {
  const lowerOffering = offering.toLowerCase();

  if (lowerOffering.includes("remote monitoring") || lowerOffering.includes("monitoring solutions")) return Radio;
  if (lowerOffering.includes("sensor") || lowerOffering.includes("smart sensor")) return Cpu;
  if (lowerOffering.includes("analytics") || lowerOffering.includes("data")) return BarChart3;
  if (lowerOffering.includes("industrial") || lowerOffering.includes("iot implementation")) return Factory;
  if (lowerOffering.includes("alarm")) return Bell;
  if (lowerOffering.includes("video")) return Video;
  if (lowerOffering.includes("access control")) return KeyRound;
  if (lowerOffering.includes("central monitoring") || lowerOffering.includes("software")) return Server;
  if (lowerOffering.includes("mobile") || lowerOffering.includes("app") || lowerOffering.includes("platform")) return Smartphone;
  if (lowerOffering.includes("campus") || lowerOffering.includes("building")) return Building2;
  if (lowerOffering.includes("navigation") || lowerOffering.includes("bridge")) return Navigation;
  if (lowerOffering.includes("satellite")) return Satellite;
  if (lowerOffering.includes("maritime")) return Database;
  if (lowerOffering.includes("assembly") || lowerOffering.includes("area")) return Users;
  if (lowerOffering.includes("lti") || lowerOffering.includes("tracking")) return Timer;
  if (lowerOffering.includes("environmental")) return Thermometer;
  if (lowerOffering.includes("safety") || lowerOffering.includes("alert")) return AlertTriangle;
  if (lowerOffering.includes("plc") || lowerOffering.includes("panel")) return Settings;
  if (lowerOffering.includes("vfd")) return Gauge;
  if (lowerOffering.includes("protection")) return Shield;
  if (lowerOffering.includes("annunciator")) return Volume2;

  return Package; // Default icon
};

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { EvervaultBackground } from "@/components/ui/evervault-background";
import { ProductEnquiryDialog } from "@/components/shared/product-enquiry-dialog";
import type { Product, ProductCategory } from "@/lib/types/database";

// Video paths for each category
const categoryVideos: Record<string, string> = {
  iot: "/videos/hero-iot.mp4",
  "e-surveillance": "/videos/hero-e-surveillance.mp4",
  software: "/videos/hero-software.mp4",
  "marine-technology": "/videos/hero-marine-technology.mp4",
  hse: "/videos/hero-hse.mp4",
  automation: "/videos/hero-automation.mp4",
};

type ProductItem = {
  model: string;
  name: string;
  image: string;
  short_description: string | null;
  long_description?: string | null;
  catalog_url?: string | null;
};

interface ProductCatalogPageProps {
  category: ProductCategory;
  products: Product[];
  customerUsecases?: Product[];
  allCategories: ProductCategory[];
}

function ProductCard({
  product,
  index,
  isSoftware = false,
  onEnquire,
}: {
  product: ProductItem;
  index: number;
  isSoftware?: boolean;
  onEnquire: (product: ProductItem) => void;
}) {
  const hasCatalog = !!product.catalog_url;
  const hasLongDescription = !!product.long_description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      // Fixed height container - this keeps grid layout stable
      className="group relative h-[340px]"
    >
      {/* Card positioned absolute so it can expand as overlay - expands in all directions */}
      <Card className="absolute left-0 right-0 top-0 sm:group-hover:left-[-20px] sm:group-hover:right-[-20px] sm:group-hover:top-[-100px] flex flex-col overflow-hidden border-border hover:border-accent/50 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-accent/10 !p-0 !gap-0 cursor-default select-none h-[340px] sm:group-hover:h-[540px] z-10 sm:group-hover:z-50 bg-card">
        {/* Product Image */}
        <div className="relative h-48 flex-shrink-0 bg-gradient-to-br from-muted/50 to-muted overflow-hidden rounded-t-xl">
          <motion.div
            className="relative w-full h-full"
            animate={isSoftware ? {} : {
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        <EvervaultBackground containerClassName="flex-1 rounded-b-xl overflow-hidden" className="p-4 sm:p-5 flex flex-col h-full">
          {/* Model number */}
          <span className="text-xs font-mono text-accent group-hover:text-red-300 bg-accent/10 group-hover:bg-red-500/20 px-2 py-1 rounded transition-colors inline-block w-fit flex-shrink-0">
            {product.model}
          </span>

          {/* Name */}
          <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-white transition-colors line-clamp-1 flex-shrink-0">
            {product.name}
          </h3>

          {/* Short Description - hidden on hover when long description exists */}
          <p className={`text-sm text-muted-foreground group-hover:text-neutral-300 transition-all line-clamp-2 flex-shrink-0 ${hasLongDescription ? 'sm:group-hover:hidden' : ''}`}>
            {product.short_description}
          </p>

          {/* Long Description - revealed on hover, fills available space and scrolls */}
          {hasLongDescription && (
            <div className="hidden sm:group-hover:flex flex-col transition-all duration-500 ease-out flex-1 min-h-0 overflow-hidden mt-3">
              <div className="border-t border-border/50 pt-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-white/60">
                <p className="text-sm text-muted-foreground group-hover:text-neutral-400 leading-relaxed pr-2">
                  {product.long_description}
                </p>
              </div>
            </div>
          )}

          {/* Spacer to push buttons to bottom - only when long description is not shown */}
          <div className={`flex-1 ${hasLongDescription ? 'sm:group-hover:hidden' : ''}`} />

          {/* Hover Action Buttons - visible on mobile, hover-reveal on desktop */}
          <div className="mt-4 flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:translate-y-2 sm:group-hover:translate-y-0 flex-shrink-0">
            {hasCatalog && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs !border-white/40 text-white !bg-transparent hover:!bg-white/10 hover:!border-white active:scale-95 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(product.catalog_url!, '_blank', 'noopener,noreferrer');
                }}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                <span className="hidden xs:inline">View </span>Catalog
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              className={`${hasCatalog ? 'flex-1' : 'w-full'} text-xs bg-accent hover:bg-accent/90 text-white active:scale-95 transition-all`}
              onClick={(e) => {
                e.stopPropagation();
                onEnquire(product);
              }}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Enquire
            </Button>
          </div>
        </EvervaultBackground>
      </Card>
    </motion.div>
  );
}

export function ProductCatalogPage({ category, products, customerUsecases = [], allCategories }: ProductCatalogPageProps) {
  const otherCategories = allCategories.filter((c) => c.id !== category.id);

  // State for enquiry dialog
  const [enquiryProduct, setEnquiryProduct] = useState<ProductItem | null>(null);
  const [enquiryDialogOpen, setEnquiryDialogOpen] = useState(false);

  // Check if this category has customer usecases
  const hasCustomerUsecases = customerUsecases.length > 0;

  const videoSrc = categoryVideos[category.id];

  const handleEnquire = (product: ProductItem) => {
    setEnquiryProduct(product);
    setEnquiryDialogOpen(true);
  };

  // Track product category view
  useEffect(() => {
    trackEvent("product_category_view", {
      category_id: category.id,
      category_name: category.title,
      products_count: products.length,
    });
  }, [category.id, category.title, products.length]);

  return (
    <>
      {/* Video Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Spotlight Effect */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="hsl(var(--accent))"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none opacity-50 z-[1]" />

        {/* Animated Glow Orb */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-32 sm:pt-40 md:pt-48">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
            >
              {category.title}
            </motion.h1>

            {/* Headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent font-semibold mb-4 sm:mb-6"
            >
              {category.headline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {category.description}
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">Explore products</span>
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Main Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-6 w-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Products
              </h2>
            </div>
            <p className="text-muted-foreground">
              Explore our complete range of products
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.model}
                product={product}
                index={index}
                isSoftware={category.id === "software"}
                onEnquire={handleEnquire}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Usecases Section (IoT only) */}
      {hasCustomerUsecases && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Custom Solutions
                </h2>
              </div>
              <p className="text-muted-foreground">
                IoT solutions we&apos;ve built for our customers across industries
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {customerUsecases.map((product, index) => (
                <ProductCard
                  key={product.model}
                  product={product}
                  index={index}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Offerings */}
      <section className={`py-12 md:py-16 ${hasCustomerUsecases ? "" : "bg-muted/30"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Key Offerings
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                What we deliver in this domain
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {category.offerings.map((offering, index) => {
                const OfferingIcon = getOfferingIcon(offering);
                return (
                  <motion.div
                    key={offering}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 cursor-default select-none"
                  >
                    <EvervaultBackground containerClassName="h-full" className="p-5 sm:p-6 h-full">
                      <div className="flex items-start gap-4">
                        {/* Icon badge */}
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                          <OfferingIcon className="w-6 h-6 sm:w-7 sm:h-7 text-accent group-hover:text-white transition-colors" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-2 sm:pt-3">
                          <p className="font-semibold text-sm sm:text-base md:text-lg group-hover:text-white transition-colors">
                            {offering}
                          </p>
                        </div>
                      </div>
                    </EvervaultBackground>
                  </motion.div>
                );
              })}
            </div>
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
            className="max-w-4xl mx-auto bg-accent text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <GridPattern width={40} height={40} className="stroke-white" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                Interested in {category.title} Products?
              </h2>
              <p className="text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Contact our team for pricing, technical specifications, or to discuss
                custom requirements for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="h-10 sm:h-11 text-sm sm:text-base">
                  <Link
                    href="/contact"
                    onClick={() => trackCTA("Request Quote", `products/${category.id}`)}
                  >
                    Request Quote
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 h-10 sm:h-11 text-sm sm:text-base"
                >
                  <Link
                    href="/services/oem-odm"
                    onClick={() => trackCTA("Custom Solutions", `products/${category.id}`)}
                  >
                    Custom Solutions
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-10 sm:py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Explore Other Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {otherCategories.map((c, index) => {
              return (
                <Link key={c.id} href={c.route}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 h-full cursor-default select-none"
                  >
                    {/* Category Image Header */}
                    <div className="relative h-28 sm:h-32 md:h-40 overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Content */}
                    <EvervaultBackground containerClassName="-mt-6 sm:-mt-8 relative z-10" className="p-3 sm:p-4 md:p-6">
                      {/* Title */}
                      <h3 className="text-sm sm:text-base md:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-white transition-colors">
                        {c.title}
                      </h3>

                      {/* Link */}
                      <div className="flex items-center text-xs sm:text-sm font-medium text-accent group-hover:text-white transition-colors">
                        Explore
                        <ArrowRight className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </EvervaultBackground>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Enquiry Dialog */}
      {enquiryProduct && (
        <ProductEnquiryDialog
          product={{
            model: enquiryProduct.model,
            name: enquiryProduct.name,
            image: enquiryProduct.image,
            category: category.title,
            short_description: enquiryProduct.short_description || undefined,
            long_description: enquiryProduct.long_description || undefined,
          }}
          open={enquiryDialogOpen}
          onOpenChange={setEnquiryDialogOpen}
        />
      )}
    </>
  );
}
