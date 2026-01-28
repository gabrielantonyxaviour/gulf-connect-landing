"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { SITE_CONTACT, SITE_OFFICE, SOCIAL_LINKS, FOOTER_LINKS, PRODUCT_CATEGORIES, SERVICES } from "@/lib/constants";

// Map for product link translations
const productTranslationKeys: Record<string, string> = {
  "iot": "iot",
  "e-surveillance": "eSurveillance",
  "software": "software",
  "marine-technology": "marine",
  "hse": "hse",
  "automation": "automation",
};

// Map for service link translations
const serviceTranslationKeys: Record<string, string> = {
  "embedded-design": "embeddedDesign",
  "software-development": "softwareDev",
  "ai": "ai",
  "blockchain": "blockchain",
  "oem-odm": "oemOdm",
  "staffing": "staffing",
};
import { Separator } from "@/components/ui/separator";

// Custom X (formerly Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialIcons = {
  Facebook: Facebook,
  Linkedin: Linkedin,
  Instagram: Instagram,
  X: XIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tCompany = useTranslations("company");
  const tProducts = useTranslations("footer.productLinks");
  const tServices = useTranslations("footer.serviceLinks");

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-3 sm:mb-4">
              <Image
                src="/offices/gulf-connect-logo.png"
                alt={tCompany("name")}
                width={48}
                height={48}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-sm text-xs sm:text-sm">
              {tCompany("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {SITE_CONTACT.address.line1}
                  {SITE_CONTACT.address.line1 && <br />}
                  {SITE_CONTACT.address.line2}
                  {SITE_CONTACT.address.line2 && <br />}
                  {SITE_CONTACT.address.line3 && (
                    <>
                      {SITE_CONTACT.address.line3}
                      <br />
                    </>
                  )}
                  {SITE_CONTACT.address.city}
                  {SITE_CONTACT.address.pincode && ` - ${SITE_CONTACT.address.pincode}`}
                  <br />
                  {SITE_CONTACT.address.country}
                </p>
              </div>
              {SITE_CONTACT.phone && (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="h-4 sm:h-5 w-4 sm:w-5 text-accent flex-shrink-0" />
                  <a
                    href={`tel:${SITE_CONTACT.phone}`}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {SITE_CONTACT.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors break-all"
                >
                  {SITE_CONTACT.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">{t("products")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {PRODUCT_CATEGORIES.map((product) => {
                const translationKey = productTranslationKeys[product.id] || product.id;
                return (
                  <li key={product.route}>
                    <Link
                      href={product.route}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {tProducts(translationKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">{t("services")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {SERVICES.map((service) => {
                const translationKey = serviceTranslationKeys[service.id] || service.id;
                return (
                  <li key={service.route}>
                    <Link
                      href={service.route}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {tServices(translationKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">{t("company")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:ltr:text-left md:rtl:text-right">
            &copy; {currentYear} {tCompany("name")}. {t("copyright")}
          </p>

          {/* Certifications */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs text-muted-foreground hidden sm:inline">{t("certified")}:</span>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center p-1.5 sm:p-2 bg-white rounded-lg">
                <img
                  src="/images/bureau-clean.png"
                  alt="ISO 9001:2015 - Bureau Veritas"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center p-1.5 sm:p-2 bg-white rounded-lg">
                <img
                  src="/images/zed-clean.png"
                  alt="Zed Silver Certification"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
