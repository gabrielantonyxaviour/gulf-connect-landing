"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  link: string;
}

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Navbar({ children, className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "fixed top-4 inset-x-0 z-50 w-full",
        className
      )}
    >
      {children}
    </nav>
  );
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function NavBody({ children, className }: NavBodyProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 1280) {
        setScreenSize("sm"); // Small desktop/laptop (1024-1280px)
      } else if (width < 1536) {
        setScreenSize("md"); // Medium desktop (1280-1536px)
      } else {
        setScreenSize("lg"); // Large desktop (1536px+)
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Responsive width values based on screen size
  const widthValues = {
    sm: { expanded: "85%", collapsed: "65%" },  // Small desktop
    md: { expanded: "80%", collapsed: "60%" },  // Medium desktop
    lg: { expanded: "70%", collapsed: "55%" },  // Large desktop
  };

  const { expanded, collapsed } = widthValues[screenSize];

  return (
    <motion.div
      animate={{
        width: isScrolled ? collapsed : expanded,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "hidden lg:flex items-center justify-between mx-auto px-4 xl:px-6 py-2 xl:py-2.5 h-12 xl:h-14 rounded-full bg-black border border-neutral-800 shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

export function NavItems({ items, className, onItemClick }: NavItemsProps) {
  return (
    <div className={cn("flex items-center gap-4 lg:gap-5 xl:gap-8", className)}>
      {items.map((item, idx) => (
        <Link
          key={`nav-item-${idx}`}
          href={item.link}
          onClick={onItemClick}
          className="relative text-xs lg:text-sm font-medium text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
        >
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className }: NavbarLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/images/logo.png"
        alt="Rax Tech"
        width={40}
        height={40}
        className="h-8 lg:h-9 xl:h-10 w-auto"
      />
    </Link>
  );
}

interface NavbarButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function NavbarButton({
  children,
  variant = "primary",
  className,
  onClick,
  href,
}: NavbarButtonProps) {
  const baseStyles =
    "px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap";
  const variants = {
    primary:
      "bg-white text-black hover:bg-neutral-200 shadow-sm",
    secondary:
      "bg-transparent border border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white",
  };

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNav({ children, className }: MobileNavProps) {
  return (
    <div className={cn("lg:hidden", className)}>
      {children}
    </div>
  );
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNavHeader({ children, className }: MobileNavHeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.div
      animate={{
        width: isScrolled ? "70%" : "80%",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "flex items-center justify-between mx-auto px-3 sm:px-4 py-2 h-11 sm:h-12 rounded-full bg-black border border-neutral-800 shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MobileNavToggle({ isOpen, onClick, className }: MobileNavToggleProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-8 h-8 flex flex-col items-center justify-center gap-1.5",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="w-5 h-0.5 bg-white origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="w-5 h-0.5 bg-white"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="w-5 h-0.5 bg-white origin-center"
      />
    </button>
  );
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MobileNavMenu({
  children,
  isOpen,
  onClose,
  className,
}: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed left-4 right-4 top-20 bg-black border border-neutral-800 rounded-2xl z-50 p-6",
              className
            )}
          >
            <div className="flex flex-col gap-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
