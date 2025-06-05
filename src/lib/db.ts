import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Get the database URL from environment variables
const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL is required in production');
  }
  console.warn('⚠️ DATABASE_URL is not set. Using empty connection string.');
}

// Create a connection to the database
const sql = neon(databaseUrl || '');

// Create a Drizzle ORM instance
export const db = drizzle(sql);

// Export the raw SQL client for cases where you need it
export { sql };
