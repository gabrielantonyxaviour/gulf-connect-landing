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

import { COMPANY, SITE_CONTACT, SITE_OFFICE, SOCIAL_LINKS, FOOTER_LINKS } from "@/lib/constants";
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

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-3 sm:mb-4">
              <Image
                src="/images/logo.png"
                alt="Rax Tech"
                width={48}
                height={48}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-sm text-xs sm:text-sm">
              {COMPANY.description}
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
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">Products</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">Services</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">Company</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} {SITE_OFFICE.name}. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <span>{COMPANY.certification}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
