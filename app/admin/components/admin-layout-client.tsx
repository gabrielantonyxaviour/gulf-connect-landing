"use client";

import { usePathname } from 'next/navigation';
import { AdminGuard } from './admin-guard';
import { AdminSidebar } from './admin-sidebar';
import { useAuth } from '@/lib/auth/auth-context';
import { LogOut } from 'lucide-react';

// Auth pages that don't need the admin layout (sidebar/header)
const authPages = [
  '/admin/login',
  '/admin/signup',
  '/admin/forgot-password',
  '/admin/reset-password',
];

function TopRightActions() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50">
      <button
        onClick={handleLogout}
        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-colors"
        title="Logout"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = authPages.some(page => pathname.startsWith(page));

  // Auth pages have their own simple layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  // All other admin pages use the full layout with sidebar
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopRightActions />
          <main className="flex-1 p-3 pt-16 sm:p-4 sm:pt-20 md:p-6 md:pt-24 lg:pt-12">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
