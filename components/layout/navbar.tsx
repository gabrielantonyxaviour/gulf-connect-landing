"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES, SERVICES } from "@/lib/constants";
import { trackNavClick, trackCTA, trackMobileMenu } from "@/lib/analytics";
import { LanguageSwitcher } from "@/components/language-switcher";

// Map for product translations
const productTranslationKeys: Record<string, string> = {
  "iot": "iot",
  "e-surveillance": "eSurveillance",
  "software": "software",
  "marine-technology": "marine",
  "hse": "hse",
  "automation": "automation",
};

// Map for service translations
const serviceTranslationKeys: Record<string, string> = {
  "embedded-design": "embeddedDesign",
  "software-development": "softwareDev",
  "ai": "ai",
  "blockchain": "blockchain",
  "oem-odm": "oemOdm",
  "staffing": "staffing",
};
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { EvervaultBackground } from "@/components/ui/evervault-background";

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  const handleGetInTouch = (source: "desktop" | "mobile") => {
    trackCTA("Get in Touch", "navbar", source === "mobile" ? { source: "mobile" } : undefined);

    if (pathname === "/contact") {
      // Already on contact page, just scroll
      document.getElementById("conversation")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to contact page with hash
      router.push("/contact#conversation");
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems />
          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="desktop" />
            <NavbarButton
              variant="primary"
              onClick={() => handleGetInTouch("desktop")}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {t("getInTouch")}
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => {
                const newState = !isMobileMenuOpen;
                trackMobileMenu(newState);
                setIsMobileMenuOpen(newState);
              }}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <MobileNavContent
              onItemClick={() => setIsMobileMenuOpen(false)}
              pathname={pathname}
            />

            {/* Language Switcher for Mobile */}
            <div className="border-t border-green-200 pt-4 mt-2">
              <LanguageSwitcher variant="mobile" />
            </div>

            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleGetInTouch("mobile");
                }}
                variant="primary"
                className="w-full text-center justify-center bg-green-600 text-white hover:bg-green-700"
              >
                {t("getInTouch")}
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

function NavItems() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products.categories");
  const tServices = useTranslations("servicesPage");
  const tCareers = useTranslations("careers");
  const tGallery = useTranslations("nav");

  // Build translated product items
  const productItems = PRODUCT_CATEGORIES.map((product) => {
    const translationKey = productTranslationKeys[product.id] || product.id;
    return {
      label: tProducts(`${translationKey}.title`),
      href: product.route,
      description: tProducts(`${translationKey}.headline`),
    };
  });

  // Build translated service items
  const serviceItems = SERVICES.map((service) => {
    const translationKey = serviceTranslationKeys[service.id] || service.id;
    return {
      label: tServices(`${translationKey}.title`),
      href: service.route,
      description: tServices(`${translationKey}.description`),
    };
  });

  // Build navigation structure with translations
  const navItems = [
    {
      label: tNav("products"),
      key: "products",
      items: productItems,
    },
    {
      label: tNav("services"),
      key: "services",
      items: serviceItems,
    },
    {
      label: tNav("about"),
      key: "about",
      href: "/about",
    },
    {
      label: tNav("contact"),
      key: "contact",
      href: "/contact",
    },
    {
      label: tNav("more"),
      key: "more",
      items: [
        {
          label: tNav("careers"),
          href: "/careers",
          description: tCareers("heroSubtitle"),
        },
        {
          label: tNav("gallery"),
          href: "/gallery",
          description: tNav("galleryDescription"),
        },
      ],
    },
  ];

  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList className="gap-1">
        {navItems.map((item) => (
          <NavigationMenuItem key={`nav-item-${item.key}`}>
            {"items" in item && item.items ? (
              <>
                <NavigationMenuTrigger className="bg-transparent text-neutral-700 hover:bg-transparent hover:text-green-600 data-[state=open]:bg-transparent data-[state=open]:text-green-600">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-white !border-green-200 !rounded-xl !shadow-2xl overflow-hidden">
                  <ul className={cn(
                    "grid gap-0",
                    item.key === "more"
                      ? "w-[280px] grid-cols-1"
                      : "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  )}>
                    {item.items.map((subItem) => (
                      <li key={subItem.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={subItem.href}
                            onClick={() => trackNavClick(subItem.label, { source: "desktop", parent: item.label })}
                            className="block select-none leading-none no-underline outline-none transition-colors group overflow-hidden"
                          >
                            <EvervaultBackground
                              containerClassName=""
                              className="p-3"
                            >
                              <div className="text-sm font-medium text-neutral-800 group-hover:text-green-600">
                                {subItem.label}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-neutral-500 mt-1 group-hover:text-neutral-600">
                                {subItem.description}
                              </p>
                            </EvervaultBackground>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : "href" in item && item.href ? (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  onClick={() => trackNavClick(item.label, { source: "desktop" })}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-neutral-700 hover:bg-transparent hover:text-green-600",
                    pathname === item.href && "text-green-600"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            ) : null}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNavDropdown({
  label,
  items,
  onItemClick,
}: {
  label: string;
  items: { label: string; href: string; description: string }[];
  onItemClick: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-lg font-medium text-neutral-700"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="ltr:pl-4 rtl:pr-4 space-y-2 py-2">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-1 text-neutral-600 hover:text-green-600 transition-colors"
                  onClick={() => {
                    trackNavClick(item.label, { source: "mobile", parent: label });
                    onItemClick();
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile navigation content with translations
function MobileNavContent({ onItemClick, pathname }: { onItemClick: () => void; pathname: string }) {
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products.categories");
  const tServices = useTranslations("servicesPage");
  const tCareers = useTranslations("careers");

  // Build translated product items
  const productItems = PRODUCT_CATEGORIES.map((product) => {
    const translationKey = productTranslationKeys[product.id] || product.id;
    return {
      label: tProducts(`${translationKey}.title`),
      href: product.route,
      description: tProducts(`${translationKey}.headline`),
    };
  });

  // Build translated service items
  const serviceItems = SERVICES.map((service) => {
    const translationKey = serviceTranslationKeys[service.id] || service.id;
    return {
      label: tServices(`${translationKey}.title`),
      href: service.route,
      description: tServices(`${translationKey}.description`),
    };
  });

  // Build navigation structure with translations
  const navItems = [
    {
      label: tNav("products"),
      key: "products",
      items: productItems,
    },
    {
      label: tNav("services"),
      key: "services",
      items: serviceItems,
    },
    {
      label: tNav("about"),
      key: "about",
      href: "/about",
    },
    {
      label: tNav("contact"),
      key: "contact",
      href: "/contact",
    },
    {
      label: tNav("more"),
      key: "more",
      items: [
        {
          label: tNav("careers"),
          href: "/careers",
          description: tCareers("heroSubtitle"),
        },
        {
          label: tNav("gallery"),
          href: "/gallery",
          description: tNav("galleryDescription"),
        },
      ],
    },
  ];

  return (
    <>
      {navItems.map((item) => (
        <div key={`mobile-nav-${item.key}`}>
          {"items" in item && item.items ? (
            <MobileNavDropdown
              label={item.label}
              items={item.items}
              onItemClick={onItemClick}
            />
          ) : "href" in item && item.href ? (
            <Link
              href={item.href}
              onClick={() => {
                trackNavClick(item.label, { source: "mobile" });
                onItemClick();
              }}
              className={cn(
                "block py-2 text-lg font-medium transition-colors hover:text-green-600",
                pathname === item.href
                  ? "text-green-600"
                  : "text-neutral-600"
              )}
            >
              {item.label}
            </Link>
          ) : null}
        </div>
      ))}
    </>
  );
}

// Keep the old export name for backwards compatibility
export { NavbarComponent as Navbar };
