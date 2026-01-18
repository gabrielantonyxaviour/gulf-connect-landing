"use client";

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

  return (
    <aside className="bg-background text-foreground flex flex-col h-screen sticky top-0 w-60">
      {/* Navigation - centered vertically */}
      <nav className="flex-1 flex flex-col justify-center overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
      </nav>
    </aside>
  );
}
