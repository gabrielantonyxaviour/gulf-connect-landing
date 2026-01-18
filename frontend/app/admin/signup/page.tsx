"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null);
  const [whitelistData, setWhitelistData] = useState<{ name: string | null; role: string } | null>(null);
  const [success, setSuccess] = useState(false);

  const { user, adminUser, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user && adminUser) {
      router.push('/admin');
    }
  }, [user, adminUser, isLoading, router]);

  // Check if email is whitelisted (with debounce)
  useEffect(() => {
    if (!email || !email.includes('@')) {
      setIsWhitelisted(null);
      setWhitelistData(null);
      setEmailError('');
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingEmail(true);
      setEmailError('');

      try {
        // Check whitelist
        const { data: whitelistEntry, error: whitelistError } = await supabase
          .from('rax_landing_admin_whitelist')
          .select('name, role')
          .eq('email', email.toLowerCase())
          .single();

        if (whitelistError || !whitelistEntry) {
          setIsWhitelisted(false);
          setWhitelistData(null);
          setEmailError('This email is not authorized to sign up. Contact an administrator.');
        } else {
          // Check if user already exists
          const { data: existingAdmin } = await supabase
            .from('rax_landing_admin_users')
            .select('id')
            .eq('email', email.toLowerCase())
            .single();

          if (existingAdmin) {
            setIsWhitelisted(false);
            setWhitelistData(null);
            setEmailError('An account with this email already exists. Please login instead.');
          } else {
            setIsWhitelisted(true);
            setWhitelistData(whitelistEntry);
            if (whitelistEntry.name && !fullName) {
              setFullName(whitelistEntry.name);
            }
          }
        }
      } catch (err) {
        console.error('Error checking whitelist:', err);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email, fullName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!isWhitelisted) {
      setError('Email is not authorized to sign up');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    setIsSubmitting(true);

    try {
      // First try to sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
        options: {
          data: {
            full_name: fullName,
            role: whitelistData?.role || 'admin',
          },
        },
      });

      // If user already exists, try signing in
      if (authError?.message?.includes('already registered')) {
        // Try to sign in with the provided password
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.toLowerCase(),
          password: password,
        });

        if (signInError) {
          setError('An account with this email exists. Please use "Forgot Password" to reset your password, then login.');
          setIsSubmitting(false);
          return;
        }

        // Sign out so they can login fresh through the normal flow
        await supabase.auth.signOut();
        setSuccess(true);
        return;
      }

      if (authError) {
        setError(authError.message);
        setIsSubmitting(false);
        return;
      }

      if (authData.user) {
        // Don't create admin record here - it will be created on first login
        // after email is verified (due to FK constraint on auth.users)
        setSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Already logged in
  if (user && adminUser) {
    return null;
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Account Created</h1>
            <p className="text-muted-foreground mt-2">
              Your admin account has been created successfully
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <p className="text-muted-foreground text-sm text-center mb-6">
              Please check your email to verify your account, then you can login.
            </p>

            <Link href="/admin/login">
              <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground">
                Continue to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Sign up for admin access</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {error && (
              <div className="bg-destructive/20 border border-destructive text-destructive-foreground px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className={`h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary ${
                    emailError ? 'border-destructive' : isWhitelisted ? 'border-primary' : ''
                  }`}
                />
                {isCheckingEmail && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>
              {emailError && (
                <p className="text-xs text-destructive">{emailError}</p>
              )}
              {isWhitelisted && (
                <p className="text-xs text-primary">Email verified - you can sign up</p>
              )}
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                  placeholder="Create a password"
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
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-11 pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting || !isWhitelisted}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </div>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link href="/admin/login" className="text-primary hover:text-primary/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
