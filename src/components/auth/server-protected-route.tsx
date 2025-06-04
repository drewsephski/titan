import { ReactNode } from 'react';
import { requireAuth, requireRole } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

interface ServerProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  redirectTo?: string;
  unauthorizedRedirectTo?: string;
}

/**
 * A server component that protects routes based on authentication and roles
 * Usage:
 *
 * // Protect a route - redirects to /sign-in if not authenticated
 * <ServerProtectedRoute>
 *   <YourProtectedComponent />
 * </ServerProtectedRoute>
 *
 * // Protect a route with role requirement
 * <ServerProtectedRoute requiredRole="admin">
 *   <AdminDashboard />
 * </ServerProtectedRoute>
 *
 * // Custom redirect paths
 * <ServerProtectedRoute
 *   requiredRole="admin"
 *   redirectTo="/custom-sign-in"
 *   unauthorizedRedirectTo="/no-access"
 * >
 *   <AdminDashboard />
 * </ServerProtectedRoute>
 */
export async function ServerProtectedRoute({
  children,
  requiredRole,
  redirectTo = '/sign-in',
  unauthorizedRedirectTo = '/unauthorized',
}: ServerProtectedRouteProps) {
  try {
    if (requiredRole) {
      // Check for specific role
      await requireRole(requiredRole);
    } else {
      // Just check if authenticated
      await requireAuth();
    }

    // If we get here, the user is authenticated and has the required role
    return <>{children}</>;
  } catch (error) {
    // Handle redirects
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '/';

    // If it's an unauthorized error and we have a role requirement
    if (error instanceof Error && error.message.includes('unauthorized') && requiredRole) {
      redirect(unauthorizedRedirectTo);
    }

    // Otherwise, redirect to sign-in with a callback URL
    const callbackUrl = encodeURIComponent(pathname);
    redirect(`${redirectTo}?callbackUrl=${callbackUrl}`);
  }
}

/**
 * Higher Order Component for protecting server components
 *
 * Usage:
 *
 * const ProtectedPage = withServerAuth(MyPageComponent);
 * // With role requirement
 * const AdminPage = withServerAuth(AdminComponent, { requiredRole: 'admin' });
 */
export function withServerAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requiredRole?: string;
    redirectTo?: string;
    unauthorizedRedirectTo?: string;
  } = {}
) {
  return async function ServerAuthWrapper(props: P) {
    return (
      <ServerProtectedRoute
        requiredRole={options.requiredRole}
        redirectTo={options.redirectTo}
        unauthorizedRedirectTo={options.unauthorizedRedirectTo}
      >
        <Component {...props} />
      </ServerProtectedRoute>
    );
  };
}

/**
 * A server component that only renders its children if the user is not authenticated
 * Useful for auth pages like sign-in and sign-up
 */
export async function GuestOnlyRoute({
  children,
  redirectTo = '/dashboard',
}: {
  children: ReactNode;
  redirectTo?: string;
}) {
  const { getServerSession } = await import('@/lib/auth/server');
  const session = await getServerSession();

  if (session) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
