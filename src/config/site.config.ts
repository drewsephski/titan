import { SiteConfig } from "@/types";

// Get the base URL from environment variables or use a default for development
const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3000';

export const siteConfig: SiteConfig = {
  name: "Titan",
  title: "Titan - Powerful Next.js 15 Template with Better-Auth, Drizzle ORM, PostgreSQL, and Shadcn UI",
  description: "Modern Next.js 15 Template Boilerplate with Better-Auth, Drizzle ORM, PostgreSQL, Shadcn UI, and Tailwind v4 for fast, secure web app development.",
  origin: siteUrl,
  links: [
    "/about",
    "/blog",
    "/pricing",
    "/contact"
  ],
  keywords: [
    "Next.js 15",
    "Authentication",
    "Drizzle ORM",
    "PostgreSQL",
    "Tailwind CSS",
    "Tailwind CSS V4",
    "Better-Auth",
    "Shadcn UI",
    "TypeScript",
    "Full-Stack Boilerplate"
  ],
  og: "https://titan.dev/og.png",
  creator: {
    name: "drewsephski",
    url: "https://drewsephski.dev",
  },
  socials: {
    github: "https://github.com/drewsephski/titan",
    x: "https://x.com/drewsephski",
  }
}
