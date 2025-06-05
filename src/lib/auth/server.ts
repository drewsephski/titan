import { auth } from '../auth';
import { redirect } from 'next/navigation';

// Define redirection paths as constants for easier management and consistency.
const SIGN_IN_REDIRECT_PATH = '/sign-in';
const UNAUTHORIZED_REDIRECT_PATH = '/unauthorized';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface RawSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  user?: {
    email: string;
    name: string | null;
    role: string;
  };
}

export interface Session extends RawSession {
  user: User;
}

/**
 * Get the current session on the server side.
 * This function is a low-level utility for session retrieval.
 * It does not handle redirection, allowing callers to decide how to handle
 * the absence of a session.
 */
export async function getServerSession(): Promise<Session | null> {
  try {
    const result = await auth.api.getSession({
      headers: new Headers(),
    });

    if (!result?.session) {
      return null;
    }

    // Ensure the user data is properly typed
    const rawSession = result.session as RawSession;

    if (!rawSession.user) {
      console.warn('Session missing user data:', rawSession);
      return null;
    }

    const session: Session = {
      ...rawSession,
      user: {
        id: rawSession.userId,
        email: rawSession.user.email,
        name: rawSession.user.name,
        role: rawSession.user.role
      }
    };

    return session;
  } catch (error) {
    // Log the error for debugging purposes without exposing sensitive info to the client.
    console.error('Failed to retrieve server session:', error);
    return null; // Return null on error to indicate no session.
  }
}

/**
 * Helper function to get the session or redirect to a specified path if no session is found.
 * This centralizes the common pattern of session checking and redirection.
 * @param redirectTo The path to redirect to if no session is found.
 * @returns The session if found.
 */
async function getSessionOrRedirect(redirectTo: string): Promise<Session> {
  const session = await getServerSession();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}

/**
 * Ensures the user is authenticated on the server side.
 * Redirects to the sign-in page if not authenticated.
 * @returns The authenticated session.
 */
export async function requireAuth(): Promise<Session> {
  return getSessionOrRedirect(SIGN_IN_REDIRECT_PATH);
}

/**
 * Ensures the user has a specific role on the server side.
 * Redirects to the sign-in page if not authenticated, or to an unauthorized page
 * if the user doesn't have the required role or if user/role data is missing.
 * @param requiredRole The role string that the user must possess.
 * @returns The authenticated session with the required role.
 */
export async function requireRole(requiredRole: string): Promise<Session> {
  const session = await getSessionOrRedirect(SIGN_IN_REDIRECT_PATH);

  // Enhanced type safety and error handling for user and role properties.
  if (!session.user || typeof session.user.role !== 'string') {
    console.warn('Session user or role is missing/invalid for session:', session.id);
    redirect(UNAUTHORIZED_REDIRECT_PATH);
  }

  if (session.user.role !== requiredRole) {
    console.warn(`User ${session.user.id} with role '${session.user.role}' attempted to access resource requiring role '${requiredRole}'.`);
    redirect(UNAUTHORIZED_REDIRECT_PATH);
  }

  return session;
}
