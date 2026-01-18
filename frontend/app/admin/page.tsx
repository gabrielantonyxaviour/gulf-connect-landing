"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  Briefcase,
  FileText,
  Mail,
  ArrowRight,
  BarChart3,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalProducts: number;
  activeJobs: number;
  recentApplications: number;
  unreadMessages: number;
}

export default function AdminDashboardPage() {
  const { adminUser } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeJobs: 0,
    recentApplications: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch all stats in parallel
        const [productsRes, jobsRes, applicationsRes, messagesRes] = await Promise.all([
          supabase
            .from('rax_landing_products')
            .select('*', { count: 'exact', head: true }),
          supabase
            .from('rax_landing_jobs')
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true),
          supabase
            .from('rax_landing_job_applications')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
          supabase
            .from('rax_landing_contact_messages')
            .select('*', { count: 'exact', head: true })
            .eq('is_read', false),
        ]);

        setStats({
          totalProducts: productsRes.count || 0,
          activeJobs: jobsRes.count || 0,
          recentApplications: applicationsRes.count || 0,
          unreadMessages: messagesRes.count || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      href: '/admin/products',
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: Briefcase,
      href: '/admin/jobs',
    },
    {
      title: 'New Applications',
      value: stats.recentApplications,
      icon: FileText,
      href: '/admin/applications',
      subtitle: 'Last 7 days',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: Mail,
      href: '/admin/messages',
    },
  ];

  const quickActions = [
    {
      title: 'Add Product',
      description: 'Add a new product to the catalog',
      href: '/admin/products/new',
      icon: Package,
    },
    {
      title: 'Post Job',
      description: 'Create a new job listing',
      href: '/admin/jobs/new',
      icon: Briefcase,
    },
    {
      title: 'View Numbers',
      description: 'Manage website numbers',
      href: '/admin/numbers',
      icon: BarChart3,
    },
    {
      title: 'Testimonials',
      description: 'Manage customer testimonials',
      href: '/admin/testimonials',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Welcome message */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Welcome back, {adminUser?.full_name?.split(' ')[0] || 'Admin'}!
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-0.5 sm:mt-1">
          Here&apos;s what&apos;s happening with your website today.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 sm:p-4 lg:p-6 h-full">
                  <div className="flex items-center justify-between h-full gap-2">
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.title}</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mt-0.5 sm:mt-1">
                        {isLoading ? '-' : stat.value}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 min-h-[0.75rem] sm:min-h-[1rem] truncate">
                        {stat.subtitle || '\u00A0'}
                      </p>
                    </div>
                    <div className="bg-primary p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl self-center flex-shrink-0">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="p-3 sm:p-4 lg:p-6 pb-1 sm:pb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-secondary rounded-md sm:rounded-lg flex-shrink-0">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm sm:text-base text-foreground truncate">{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{action.description}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 sm:mt-3 px-0 text-primary hover:text-primary/80 h-auto py-0 text-xs sm:text-sm"
                    >
                      Go <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
