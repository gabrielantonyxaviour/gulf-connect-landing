"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '../supabase';
import type { AdminUser } from '../types/database';

interface AuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cache keys for localStorage
const ADMIN_USER_CACHE_KEY = 'rax_admin_user';
const CACHE_EXPIRY_KEY = 'rax_admin_user_expiry';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Helper to get cached admin user
function getCachedAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    if (expiry && Date.now() > parseInt(expiry, 10)) {
      localStorage.removeItem(ADMIN_USER_CACHE_KEY);
      localStorage.removeItem(CACHE_EXPIRY_KEY);
      return null;
    }
    const cached = localStorage.getItem(ADMIN_USER_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

// Helper to cache admin user
function setCachedAdminUser(admin: AdminUser | null) {
  if (typeof window === 'undefined') return;
  try {
    if (admin) {
      localStorage.setItem(ADMIN_USER_CACHE_KEY, JSON.stringify(admin));
      localStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION));
    } else {
      localStorage.removeItem(ADMIN_USER_CACHE_KEY);
      localStorage.removeItem(CACHE_EXPIRY_KEY);
    }
  } catch {
    // Ignore localStorage errors
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Initialize adminUser from cache for instant restore
  const [adminUser, setAdminUserState] = useState<AdminUser | null>(() => getCachedAdminUser());
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabaseRef = useRef(getSupabaseBrowserClient());

  // Wrapper to also update cache when setting admin user
  const setAdminUser = useCallback((admin: AdminUser | null) => {
    setAdminUserState(admin);
    setCachedAdminUser(admin);
  }, []);

  const fetchAdminUser = useCallback(async (userId: string): Promise<AdminUser | null> => {
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const { data, error } = await supabaseRef.current
        .from('rax_landing_admin_users')
        .select('*')
        .eq('id', userId)
        .eq('is_active', true)
        .abortSignal(controller.signal)
        .single();

      clearTimeout(timeoutId);

      // No admin record found is expected for new users - not an error
      if (error?.code === 'PGRST116' || !data) {
        return null;
      }

      if (error) {
        console.error('Failed to fetch admin user:', error);
        return null;
      }

      return data;
    } catch (err) {
      // Handle abort or other errors gracefully
      if (err instanceof Error && err.name === 'AbortError') {
        console.warn('Fetch admin user timed out');
      } else {
        console.error('Error fetching admin user:', err);
      }
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const supabase = supabaseRef.current;

    // Initialize auth state
    const initAuth = async () => {
      try {
        // Check if we have cached admin user - use it immediately for instant UX
        const cachedAdmin = getCachedAdminUser();

        // If we have a cached admin, trust it immediately and validate in background
        // This provides instant auth experience
        if (cachedAdmin) {
          setAdminUser(cachedAdmin);
          // Set a minimal user object to satisfy AdminGuard until real session is validated
          setUser({ id: cachedAdmin.id, email: cachedAdmin.email } as User);
          setIsLoading(false);

          // Validate session in background - if invalid, will clear state
          supabase.auth.getSession().then(async ({ data: { session }, error }) => {
            if (!isMounted) return;

            if (error || !session?.user) {
              // Session invalid - clear auth state
              setSession(null);
              setUser(null);
              setAdminUser(null);
              return;
            }

            // Update session/user from validated data
            setSession(session);
            setUser(session.user);

            // Verify admin user ID matches
            if (session.user.id !== cachedAdmin.id) {
              const freshAdmin = await fetchAdminUser(session.user.id);
              if (isMounted) {
                setAdminUser(freshAdmin);
              }
            }
          });

          return;
        }

        // No cache - do synchronous auth check
        const { data: { session }, error } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (error) {
          setIsLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const admin = await fetchAdminUser(session.user.id);
          if (isMounted) {
            setAdminUser(admin);
          }
        }

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Start initialization
    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const admin = await fetchAdminUser(session.user.id);
          if (isMounted) {
            setAdminUser(admin);
          }
        } else {
          setAdminUser(null);
        }

        if (isMounted) {
          setIsLoading(false);
        }
      }
    );

    // Safety timeout - ensure loading stops even if everything fails
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [fetchAdminUser]);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    setIsLoading(true);
    const supabase = supabaseRef.current;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      return { error: error.message };
    }

    if (data.user && data.session) {
      // Immediately set user and session from sign-in response
      setUser(data.user);
      setSession(data.session);

      // Check if user is an active admin
      let admin = await fetchAdminUser(data.user.id);

      if (!admin) {
        // No admin record - check if user is whitelisted
        const { data: whitelistEntry } = await supabase
          .from('rax_landing_admin_whitelist')
          .select('name, role')
          .eq('email', email.toLowerCase())
          .single();

        if (whitelistEntry) {
          // User is whitelisted - create admin record
          const fullName = data.user.user_metadata?.full_name || whitelistEntry.name || email.split('@')[0];
          const role = data.user.user_metadata?.role || whitelistEntry.role || 'admin';

          const { data: newAdmin, error: createError } = await supabase
            .from('rax_landing_admin_users')
            .insert({
              id: data.user.id,
              email: email.toLowerCase(),
              full_name: fullName,
              role: role,
              is_active: true,
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating admin user:', createError);
            await supabase.auth.signOut();
            setIsLoading(false);
            return { error: 'Failed to create admin account. Please try again.' };
          }

          // Remove from whitelist
          await supabase
            .from('rax_landing_admin_whitelist')
            .delete()
            .eq('email', email.toLowerCase());

          admin = newAdmin;
        } else {
          // User is not whitelisted and has no admin record
          await supabase.auth.signOut();
          setIsLoading(false);
          return { error: 'You do not have admin access.' };
        }
      }

      setAdminUser(admin);
    }

    setIsLoading(false);
    return {};
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabaseRef.current.auth.signOut();
    setUser(null);
    setAdminUser(null); // This also clears the cache via the wrapper
    setSession(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminUser,
        session,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
