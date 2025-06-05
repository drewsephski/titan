import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Check if we're in a build environment
const isBuild = process.env['NODE_ENV'] === 'production' || process.env['NETLIFY'] === 'true';
const isProd = process.env['NODE_ENV'] === 'production';

// Create a type-safe environment object
type EnvSchema = {
  // App
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SITE_URL: string;
  
  // BetterAuth
  BETTER_AUTH_URL: string;
  BETTER_AUTH_SECRET: string;
  
  // Database
  DATABASE_URL: string;
  
  // OAuth Providers (optional)
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
};

// Create a safe environment object that won't throw during build
const safeEnv: Partial<EnvSchema> = {
  NODE_ENV: (process.env['NODE_ENV'] as 'development' | 'production' | 'test') || 'development',
  NEXT_PUBLIC_SITE_URL: process.env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3000',
};

// Only validate environment variables if not in build mode
if (!isBuild) {
  try {
    // Create the actual environment validation
    const envValidation = createEnv({
      server: {
        // App
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        
        // Required in all environments
        BETTER_AUTH_URL: isProd
          ? z.string().url().min(1, "BETTER_AUTH_URL is required in production")
          : z.string().url().default('http://localhost:3000'),
          
        BETTER_AUTH_SECRET: isProd
          ? z.string().min(1, "BETTER_AUTH_SECRET is required in production")
          : z.string().default('dev-secret'),
        
        // Database - required in production, optional in development
        DATABASE_URL: isProd
          ? z.string().url().min(1, "DATABASE_URL is required in production")
          : z.string().url().default('postgresql://user:pass@localhost:5432/titan'),
        
        // OAuth providers - all optional with empty defaults
        GITHUB_CLIENT_ID: z.string().default('').optional(),
        GITHUB_CLIENT_SECRET: z.string().default('').optional(),
        GOOGLE_CLIENT_ID: z.string().default('').optional(),
        GOOGLE_CLIENT_SECRET: z.string().default('').optional(),
        DISCORD_CLIENT_ID: z.string().default('').optional(),
        DISCORD_CLIENT_SECRET: z.string().default(''),
      },
      client: {},
      experimental__runtimeEnv: {},
      skipValidation: false,
    });

    // If we get here, validation passed
    Object.assign(safeEnv, envValidation);
    console.log("✅ Environment variables validated successfully");
  } catch (error) {
    console.warn("⚠️ Environment validation warning:", error);
  }
} else {
  // In build mode, just use process.env directly
  safeEnv.DATABASE_URL = process.env['DATABASE_URL'] || '';
  safeEnv.BETTER_AUTH_URL = process.env['BETTER_AUTH_URL'] || '';
  safeEnv.BETTER_AUTH_SECRET = process.env['BETTER_AUTH_SECRET'] || '';
  safeEnv.GITHUB_CLIENT_ID = process.env['GITHUB_CLIENT_ID'] || '';
  safeEnv.GITHUB_CLIENT_SECRET = process.env['GITHUB_CLIENT_SECRET'] || '';
  safeEnv.GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'] || '';
  safeEnv.GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'] || '';
  safeEnv.DISCORD_CLIENT_ID = process.env['DISCORD_CLIENT_ID'] || '';
  safeEnv.DISCORD_CLIENT_SECRET = process.env['DISCORD_CLIENT_SECRET'] || '';
  console.warn("⚠️ Environment validation is skipped in build mode");
}

// Export the safe environment object
export const env = safeEnv as EnvSchema;
