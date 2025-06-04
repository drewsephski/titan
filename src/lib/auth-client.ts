import { createAuthClient } from "better-auth/react";

// Create the auth client with proper typing
type AuthClient = ReturnType<typeof createAuthClient> & {
  github: (options: { callbackURL: string }) => Promise<{ error?: { message: string } }>;
  google: (options: { callbackURL: string }) => Promise<{ error?: { message: string } }>;
  discord: (options: { callbackURL: string }) => Promise<{ error?: { message: string } }>;
};

export const authClient = createAuthClient({
  // Add any client-side configuration here
}) as AuthClient;

// Export the auth methods
export const {
  signIn,
  signOut,
  signUp,
  useSession,
  // Social providers
  github,
  google,
  discord
} = authClient;
