import { createAuthClient } from "better-auth/react";

// Create auth client with environment-specific configuration
export const authClient = createAuthClient({
  baseURL: process.env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3000',
  cookieOptions: {
    name: 'titan-auth',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;

// Export auth types for better type safety
export type { User, Session } from 'better-auth/types';