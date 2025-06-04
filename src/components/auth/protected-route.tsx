'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/use-user';

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
  const { user, loading, status } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;

    // If we're still loading, do nothing
    if (loading || status === 'loading') return;

    // If there's no user, redirect to sign-in
    if (!user) {
      const callbackUrl = encodeURIComponent(
        `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`
      );
      router.push(`/sign-in?callbackUrl=${callbackUrl}`);
      return;
    }

    // If a role is required but the user doesn't have it, redirect to unauthorized
    if (requiredRole && user.role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }
  }, [user, loading, status, requiredRole, router, pathname, searchParams]);

  // Show loading state while checking auth
  if (loading || status === 'loading') {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If there's a user and they have the required role (if any), render children
  if (user && (!requiredRole || user.role === requiredRole)) {
    return <>{children}</>;
  }

  // If we get here, we're still loading or redirecting
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
