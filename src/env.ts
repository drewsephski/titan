import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // BetterAuth
    BETTER_AUTH_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    // Database
    DATABASE_URL: z.string().min(1),
    // Github
    GITHUB_CLIENT_ID: z.string().default(""),
    GITHUB_CLIENT_SECRET: z.string().default(""),
    // Google
    GOOGLE_CLIENT_ID: z.string().default(""),
    GOOGLE_CLIENT_SECRET: z.string().default(""),
    // Discord
    DISCORD_CLIENT_ID: z.string().default(""),
    DISCORD_CLIENT_SECRET: z.string().default(""),
  },
  client: {},
  experimental__runtimeEnv: {},
  onValidationError: (error) => {
    console.error("❌ Invalid environment variables:", error);
    throw new Error(`Invalid environment variables: ${error}`);
  },
  skipValidation: process.env.NODE_ENV === "test" || process.env['SKIP_ENV_VALIDATION'] === "true",
});
