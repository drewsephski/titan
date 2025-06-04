import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { env } from "@/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // Use "pg" for PostgreSQL
  }),
  
  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
  },
  
  // Configure social providers
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      scopes: ["user:email"],
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      scopes: ["email", "profile"],
    },
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      scopes: ["email", "identify"],
    }
  },
  
  // Session configuration
  session: {
    // Session expires after 30 days of inactivity
    maxAge: 30 * 24 * 60 * 60, 
    updateAge: 24 * 60 * 60, // Update session every 24 hours
    // Include user data in the session
    includeUser: true,
  },
  
  // Security settings
  security: {
    csrf: {
      enabled: process.env.NODE_ENV === "production",
    },
    rateLimit: {
      enabled: true,
      max: 10, // 10 requests per window
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
  },
  
  // Error handling
  onError: (error: Error) => {
    console.error("Authentication error:", error);
    return { message: error.message || "An authentication error occurred" };
  },
  
  // Plugins
  plugins: [
    nextCookies()
  ]
});
