'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';

/**
 * Handles authentication callbacks like email verification, password reset, etc.
 * This component should be used on callback pages to handle the OAuth flow or email verification.
 */
export function AuthCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');
  const { signIn } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const error = searchParams.get('error');
        const provider = searchParams.get('provider') as 'github' | 'google' | 'discord' | null;
        const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

        // Handle OAuth errors
        if (error) {
          throw new Error(error);
        }

        // Handle OAuth callback
        if (provider) {
          try {
            await signIn(provider);
            // Use router.push instead of window.location.href for client-side navigation
            router.push(callbackUrl);
            return;
          } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Failed to sign in with provider');
          }
        }

        // Handle email verification
        if (token) {
          // Here you would typically verify the token with your backend
          // For now, we'll simulate a successful verification
          await new Promise(resolve => setTimeout(resolve, 1000));

          setStatus('success');
          setMessage('Your email has been verified successfully!');
          toast.success('Email verified successfully');

          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = callbackUrl;
          }, 2000);
          return;
        }

        // If we get here, the callback URL is missing required parameters
        throw new Error('Invalid callback URL');
      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'An unknown error occurred');
        toast.error('Authentication failed', {
          description: err instanceof Error ? err.message : 'An unknown error occurred',
        });
      }
    };

    handleCallback();
  }, [searchParams, signIn]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === 'loading' && (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Processing your request...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Success!</h2>
          <p className="text-muted-foreground">{message}</p>
          <p className="text-sm text-muted-foreground">Redirecting you now...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">{message}</p>
          <button
            onClick={() => window.location.href = '/sign-in'}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Back to Sign In
          </button>
        </div>
      )}
    </div>
  );
}
