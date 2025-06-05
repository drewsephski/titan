'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role?: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type AuthState = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};

const AuthStateContext = createContext<AuthState | null>(null);

interface AuthStateProviderProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
}

/**
 * Provider component that wraps your app and provides auth state to all children
 */
export function AuthStateProvider({
  children,
  loadingComponent
}: AuthStateProviderProps) {
  const auth = useUser();

  // Default loading component
  const defaultLoadingComponent = (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  // Show loading state while checking auth
  if (auth.loading) {
    return <>{loadingComponent || defaultLoadingComponent}</>;
  }


  return (
    <AuthStateContext.Provider value={auth}>
      {children}
    </AuthStateContext.Provider>
  );
}

/**
 * Hook to access the auth state and methods
 * Must be used within an AuthStateProvider
 */
export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthStateProvider');
  }
  return context;
}

/**
 * Component that only renders its children if the user is authenticated
 * Optionally requires a specific role
 */
interface RequireAuthProps {
  children: ReactNode;
  requiredRole?: string;
  loadingComponent?: ReactNode;
  unauthorizedComponent?: ReactNode;
}

export function RequireAuth({
  children,
  requiredRole,
  loadingComponent,
  unauthorizedComponent,
}: RequireAuthProps) {
  const { user, loading } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Default loading component
  const defaultLoadingComponent = (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  // Default unauthorized component
  const defaultUnauthorizedComponent = (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2 className="text-2xl font-bold">Unauthorized</h2>
      <p className="text-muted-foreground">
        You don&apos;t have permission to view this page.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Go Home
      </button>
    </div>
  );

  // Show loading state while checking auth
  if (loading) {
    return <>{loadingComponent || defaultLoadingComponent}</>;
  }


  // If there's no user, redirect to sign-in
  if (!user) {
    const callbackUrl = encodeURIComponent(
      `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`
    );
    router.push(`/sign-in?callbackUrl=${callbackUrl}`);
    return null;
  }

  // If a role is required but the user doesn't have it
  if (requiredRole && user.role !== requiredRole) {
    return <>{unauthorizedComponent || defaultUnauthorizedComponent}</>;
  }

  // If we get here, the user is authenticated and has the required role
  return <>{children}</>;
}

/**
 * Component that only renders its children if the user is a guest (not authenticated)
 * Useful for auth pages like sign-in and sign-up
 */
interface GuestOnlyProps {
  children: ReactNode;
  redirectTo?: string;
  loadingComponent?: ReactNode;
}

export function GuestOnly({
  children,
  redirectTo = '/dashboard',
  loadingComponent,
}: GuestOnlyProps) {
  const { user, loading } = useAuthState();
  const router = useRouter();

  // Default loading component
  const defaultLoadingComponent = (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  // Show loading state while checking auth
  if (loading) {
    return <>{loadingComponent || defaultLoadingComponent}</>;
  }

  // If user is authenticated, redirect to dashboard
  if (user) {
    router.push(redirectTo);
    return null;
  }

  // If we get here, the user is a guest
  return <>{children}</>;
}



/**
 * Higher Order Component that requires authentication
 * @deprecated Prefer using the RequireAuth component
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: { requiredRole?: string } = {}
) {
  return function WithAuth(props: P) {
    return (
      <RequireAuth requiredRole={options.requiredRole}>
        <Component {...props} />
      </RequireAuth>
    );
  };
}
function useUser(): AuthState {
  const { data: session, isPending } = useSession();
  const [state, setState] = useState<Omit<AuthState, 'signIn' | 'signOut'>>({
    user: session?.user ? {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name || undefined,
      image: session.user.image || undefined,
      role: 'user', // Default role, adjust as needed
      emailVerified: session.user.emailVerified,
      createdAt: session.user.createdAt,
      updatedAt: session.user.updatedAt
    } : null,
    loading: isPending,
    error: null,
    status: isPending ? 'loading' : session?.user ? 'authenticated' : 'unauthenticated',
  });

  useEffect(() => {
    setState(prev => ({
      ...prev,
      user: session?.user ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || undefined,
        image: session.user.image || undefined,
        role: 'user',
        emailVerified: session.user.emailVerified,
        createdAt: session.user.createdAt,
        updatedAt: session.user.updatedAt
      } : null,
      loading: isPending,
      error: null,
      status: isPending ? 'loading' : session?.user ? 'authenticated' : 'unauthenticated',
    }));
  }, [session, isPending]);

  const signIn = async (provider?: string) => {
    try {
      // This would be implemented based on your auth provider
      // For example, redirect to sign-in page with provider
      if (provider) {
        window.location.href = `/api/auth/signin/${provider}`;
      } else {
        window.location.href = '/sign-in';
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // This would be implemented based on your auth provider
      // For example, call sign out API
      await fetch('/api/auth/signout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return {
    ...state,
    signIn,
    signOut,
  };
}

