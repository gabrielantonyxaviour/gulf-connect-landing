"use client";

import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/jobs': 'Jobs',
  '/admin/applications': 'Applications',
  '/admin/messages': 'Messages',
  '/admin/numbers': 'Numbers',
  '/admin/testimonials': 'Testimonials',
  '/admin/settings': 'Settings',
};

export function AdminHeader() {
  const pathname = usePathname();
  const { adminUser, signOut } = useAuth();

  // Get page title from pathname
  const getPageTitle = () => {
    // Check for exact match first
    if (pageTitles[pathname]) {
      return pageTitles[pathname];
    }

    // Check for partial match (e.g., /admin/products/edit)
    for (const [path, title] of Object.entries(pageTitles)) {
      if (path !== '/admin' && pathname.startsWith(path)) {
        return title;
      }
    }

    return 'Admin';
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="bg-card sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-foreground">{getPageTitle()}</h1>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-secondary">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {adminUser?.full_name?.charAt(0).toUpperCase() || adminUser?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="hidden md:inline-block text-sm font-medium text-foreground">
                  {adminUser?.full_name || 'Admin'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-foreground">{adminUser?.full_name || adminUser?.email}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {adminUser?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-foreground hover:bg-secondary">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-secondary">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:bg-destructive/20">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
