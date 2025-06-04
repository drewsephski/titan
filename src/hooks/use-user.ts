'use client';

import React, { Component, useEffect, useState } from 'react';
import { useSession } from 'better-auth/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function useUser() {
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update user state when session changes
  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [session, status]);

  /**
   * Sign in with email and password
   */
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });

      if (error) {
        throw new Error(error.message || 'Failed to sign in');
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in with a social provider
   */
  const signInWithProvider = async (provider: 'github' | 'google' | 'discord') => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard',
      });

      if (error) {
        throw new Error(error.message || `Failed to sign in with ${provider}`);
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      setUser(null);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update the current user's profile
   */
  const updateProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);

      // Ensure name is not null
      const userUpdates = { ...updates };
      if ('name' in userUpdates && userUpdates.name === null) {
        userUpdates.name = undefined;
      }

      const { data, error } = await authClient.updateUser(userUpdates as any);

      if (error) {
        throw new Error(error.message || 'Failed to update profile');
      }

      // Update the local user state
      if (data?.user) {
        setUser(prev => ({
          ...prev,
          ...data.user,
        }));
      }

      return { success: true, user: data?.user };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    session,
    status,
    signInWithEmail,
    signInWithProvider,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isEmailVerified: user?.emailVerified || false,
    refresh: update,
  };
}

/**
 * Props for the ErrorState component
 */
interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

/**
 * A reusable error state component
 */
const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md w-full">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
        <svg
          className="h-6 w-6 text-red-600 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
        Something went wrong
      </h3>
      <p className="text-sm text-red-700 dark:text-red-300 mb-4">
        {error.message || 'An unexpected error occurred while loading user data.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Try again
        </button>
      )}
    </div>
  </div>
);

/**
 * A Higher-Order Component (HOC) that injects user data into a React component.
 * It handles the loading state by displaying a spinner and passes the `user` object
 * (or null) as a prop to the wrapped component once loading is complete.
 *
 * @template T The props of the wrapped component, excluding the `user` prop.
 * @param Component The React component to wrap.
 * @returns A new React component that provides the `user` prop.
 */
export function withUser<T extends object>(
  Component: React.ComponentType<T & { user: User | null }>,
  options: {
    /**
     * Whether to show a toast notification when an error occurs
     * @default true
     */
    showErrorToast?: boolean;
    /**
     * Whether to redirect to the sign-in page on authentication errors
     * @default false
     */
    redirectOnAuthError?: boolean;
    /**
     * Custom error component to display when an error occurs
     */
    ErrorComponent?: React.ComponentType<{ error: Error; onRetry?: () => void }>;
  } = {}
) {
  const {
    showErrorToast = true,
    redirectOnAuthError = false,
    ErrorComponent = ErrorState,
  } = options;

  // Extracted loading spinner for better readability and potential reusability
  const LoadingSpinner = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  /**
   * The wrapper component that fetches user data and renders the wrapped component.
   * Uses React.memo for performance optimization to prevent unnecessary re-renders
   * if its own props (T) do not change.
   */
  const WithUserComponent = React.memo(function WithUser(props: T) {
    const router = useRouter();
    const { user, loading, error, signOut } = useUser();

    // Handle errors
    React.useEffect(() => {
      if (error) {
        console.error('Error in withUser:', error);

        if (showErrorToast) {
          toast.error('Authentication Error', {
            description: error.message || 'Failed to load user data',
          });
        }

        // Handle authentication errors (e.g., token expired)
        if (redirectOnAuthError && isAuthError(error)) {
          // Clear any invalid session
          signOut();
          // Redirect to sign-in page with a return URL
          const currentPath = window.location.pathname + window.location.search;
          router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
        }
      }
    }, [error, showErrorToast, redirectOnAuthError, router, signOut]);

    // Add a display name for easier debugging in React DevTools
    WithUserComponent.displayName = `WithUser(${Component.displayName || Component.name || 'Component'})`;

    // Show loading state
    if (loading) {
      return LoadingSpinner;
    }

    // Show error state if there's an error
    if (error) {
      // Don't show error state if we're redirecting
      if (redirectOnAuthError && isAuthError(error)) {
        return null; // The redirect will happen in the effect
      }

      // Use custom error component if provided, otherwise use default
      return (
        <ErrorComponent
          error={error}
          const onRetry={() => window.location.reload()}
        />
      );
    }

    // Render the wrapped component with user data
    return <Component {...props} user={user} />;
  }) as React.FC<T>;

  // Set display name for the HOC
  WithUserComponent.displayName = `withUser(${Component.displayName || Component.name || 'Component'})`;

  return WithUserComponent;
}

/**
 * Helper function to check if an error is an authentication error
 */
function isAuthError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;

  const errorMessage = (error as Error).message || '';
  return (
    errorMessage.includes('auth') ||
    errorMessage.includes('token') ||
    errorMessage.includes('session') ||
    errorMessage.includes('unauthorized') ||
    errorMessage.includes('forbidden')
  );
}
