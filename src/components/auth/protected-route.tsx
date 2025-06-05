'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  loadingComponent?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  loadingComponent,
}: ProtectedRouteProps) {
  const { session, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;

    // If we're still loading, do nothing
    if (status === 'loading') return;

    // If there's no session, redirect to sign-in
    if (!session) {
      const callbackUrl = encodeURIComponent(
        `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`
      );
      router.push(`/sign-in?callbackUrl=${callbackUrl}`);
      return;
    }

    // If a role is required but the user doesn't have it, redirect to unauthorized
    if (requiredRole && session?.user?.role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }
  }, [session, status, requiredRole, router, pathname, searchParams]);

  // Show loading state while checking auth
  if (status === 'loading') {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If the user is authenticated and has the required role (if any), render the children
  if (session && (!requiredRole || session.user.role === requiredRole)) {
    return <>{children}</>;
  }

  // If we get here, something went wrong with the auth flow
  return null;
}

// Higher Order Component for protecting pages
export function withAuth<T extends object>(
  Component: React.ComponentType<T>,
  options: { requiredRole?: string; loadingComponent?: React.ReactNode } = {}
) {
  return function WithAuth(props: T) {
    return (
      <ProtectedRoute
        requiredRole={options.requiredRole}
        loadingComponent={options.loadingComponent}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
