"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Briefcase,
  FileText,
  Mail,
  BarChart3,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    label: 'Jobs',
    href: '/admin/jobs',
    icon: Briefcase,
  },
  {
    label: 'Applications',
    href: '/admin/applications',
    icon: FileText,
  },
  {
    label: 'Messages',
    href: '/admin/messages',
    icon: Mail,
  },
  {
    label: 'Numbers',
    href: '/admin/numbers',
    icon: BarChart3,
  },
  {
    label: 'Testimonials',
    href: '/admin/testimonials',
    icon: MessageSquare,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavContent = () => (
    <ul className="space-y-1 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== '/admin' && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                isActive
                  ? 'text-white font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-background border border-border text-foreground hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed left-0 top-0 h-screen w-64 bg-background border-r border-border z-40 transform transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex-1 flex flex-col justify-center h-full overflow-y-auto pt-16">
          <NavContent />
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex bg-background text-foreground flex-col h-screen sticky top-0 w-60 border-r border-border">
        <nav className="flex-1 flex flex-col justify-center overflow-y-auto">
          <NavContent />
        </nav>
      </aside>
    </>
  );
}
