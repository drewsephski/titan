'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useSession as useAuthSession, signIn as authSignIn, signOut as authSignOut } from '@/lib/auth-client';

// Define the shape of the session data from better-auth
type BetterAuthSession = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
} | null;

// Define our app's user type
type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

// Define our app's session type
type Session = {
  id: string;
  userId: string;
  user: User;
};

type SignUpCredentials = {
  email: string;
  password: string;
  name: string; // Name will be used after successful sign-up if needed
};

type AuthContextType = {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  signIn: (provider?: string) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, isPending } = useAuthSession() as { data: BetterAuthSession; isPending: boolean };
  
  // Transform the session data to match our app's Session type
  const session = useMemo<Session | null>(() => {
    if (!sessionData) return null;
    
    return {
      id: sessionData.session.id,
      userId: sessionData.session.userId,
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        role: 'user' // Default role, adjust as needed
      }
    };
  }, [sessionData]);
  
  const status = isPending ? 'loading' : session ? 'authenticated' : 'unauthenticated';


  const signIn = async (provider?: string) => {
    try {
      if (provider) {
        // Handle OAuth providers
        await authSignIn.social({ provider: provider as 'github' | 'google' | 'discord' });
      } else {
        // Handle email/password sign-in
        // This will be handled by the sign-in form component
        // The actual email and password will be provided by the form
        return Promise.resolve();
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async ({ email, password }: SignUpCredentials) => {
    try {
      // First, sign up the user
      const { error: signUpError } = await authSignIn.email({
        email,
        password,
        callbackURL: '/dashboard'
      });

      if (signUpError) {
        throw new Error(signUpError.message || 'Failed to sign up');
      }

      // The user will be automatically signed in after successful sign-up
      // We'll update the user's name separately if needed
      return Promise.resolve();
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authSignOut();
      // Redirect after sign out is handled by the auth middleware
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, status, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export types for use in other components
export type { Session, User };
