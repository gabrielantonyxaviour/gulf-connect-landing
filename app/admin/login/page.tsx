"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, user, adminUser, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user && adminUser) {
      router.push('/admin');
    }
  }, [user, adminUser, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await signIn(email, password);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push('/admin');
    }
  };

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't show login if already authenticated
  if (user && adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">Sign in to your admin account</p>
        </div>

        {/* Login form */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-destructive/20 border border-destructive text-destructive-foreground px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@rax-tech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-11 pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <Link
                href="/admin/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </div>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/admin/signup" className="text-primary hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          &copy; {new Date().getFullYear()} Rax Tech International. All rights reserved.
        </p>
      </div>
    </div>
  );
}
