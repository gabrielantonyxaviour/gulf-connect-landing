"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { trackNavClick, trackCTA, trackMobileMenu } from "@/lib/analytics";
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
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="primary"
              onClick={() => handleGetInTouch("desktop")}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Get in Touch
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
            {NAV_ITEMS.map((item, idx) => (
              <div key={`mobile-nav-${idx}`}>
                {"items" in item ? (
                  <MobileNavDropdown
                    label={item.label}
                    items={item.items}
                    onItemClick={() => setIsMobileMenuOpen(false)}
                  />
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => {
                      trackNavClick(item.label, { source: "mobile" });
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block py-2 text-lg font-medium transition-colors hover:text-white",
                      pathname === item.href
                        ? "text-white"
                        : "text-neutral-400"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleGetInTouch("mobile");
                }}
                variant="primary"
                className="w-full text-center justify-center bg-red-600 text-white hover:bg-red-700"
              >
                Get in Touch
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

  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList className="gap-1">
        {NAV_ITEMS.map((item, idx) => (
          <NavigationMenuItem key={`nav-item-${idx}`}>
            {"items" in item ? (
              <>
                <NavigationMenuTrigger className="bg-transparent text-neutral-300 hover:bg-transparent hover:text-white data-[state=open]:bg-transparent data-[state=open]:text-white">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-black !border-neutral-800 !rounded-xl !shadow-2xl overflow-hidden">
                  <ul className={cn(
                    "grid gap-0",
                    item.label === "More"
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
                              <div className="text-sm font-medium text-neutral-200 group-hover:text-white">
                                {subItem.label}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-neutral-500 mt-1 group-hover:text-neutral-400">
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
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  onClick={() => trackNavClick(item.label, { source: "desktop" })}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-neutral-300 hover:bg-transparent hover:text-white",
                    pathname === item.href && "text-white"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            )}
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
  items: readonly { label: string; href: string; description: string }[];
  onItemClick: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-lg font-medium text-neutral-300"
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
            <div className="pl-4 space-y-2 py-2">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-1 text-neutral-400 hover:text-white transition-colors"
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

// Keep the old export name for backwards compatibility
export { NavbarComponent as Navbar };
