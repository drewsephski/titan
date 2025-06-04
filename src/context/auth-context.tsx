'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession as useAuthSession, signIn as authSignIn, signOut as authSignOut } from '@/lib/auth-client';

type AuthContextType = {
  session: any; // Replace 'any' with your session type
  status: 'loading' | 'authenticated' | 'unauthenticated';
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useAuthSession();
  const session = data?.session;
  const status = isPending ? 'loading' : session ? 'authenticated' : 'unauthenticated';


  const signIn = async (provider?: string) => {
    try {
      if (provider) {
        // Handle social sign-in
        await authSignIn.social({ provider: provider as "github" | "google" | "discord", callbackURL: '/dashboard' });
      } else {
        // Handle email/password sign-in
        await authSignIn.email({ email: "", password: "", callbackURL: '/dashboard' });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authSignOut();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, status, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
