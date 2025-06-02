# Product Context

## Project Overview

Titan is a Next.js 15 fullstack template designed to provide a modern and secure foundation for web application development. It integrates key technologies for authentication, database management, and UI development.

## Main Goals

To offer a fast, secure, and robust starting point for developers building fullstack applications with a specific set of modern technologies.

## Target Audience

Developers seeking a pre-configured template utilizing Next.js 15, better-auth, Drizzle ORM, PostgreSQL, Tailwind CSS v4, and Shadcn UI.

## Key Features

- **Authentication:** Includes social login capabilities for Google, Github, and Discord via `better-auth`.
- **Database:** Utilizes PostgreSQL (specifically Neon for serverless) with `drizzle-orm` as the ORM.
- **Next.js Capabilities:** Leverages Next.js 15 features including API routes, server actions, and middleware (with node runtime support).
- **Interactive Particle Background:** Integrated an interactive particle background using WebGL (OGL) and GSAP for smooth animations. Features include:
  - Interactive particles that respond to mouse movement
  - Smooth animations and transitions
  - Dark mode support
  - Optimized performance
  - Customizable appearance via `particleCount`, `particleColors`, `speed`, `particleHoverFactor`, and `alphaParticles` props in the `ParticlesBackground` component.

## Technology Stack

- **Full-stack Framework:** Next.js 15-canary
- **UI Framework/Styling:** Tailwind CSS v4
- **Component Library:** Shadcn UI
- **Authentication:** better-auth
- **Database:** PostgreSQL (Neon)
- **ORM:** drizzle-orm
- **Language:** TypeScript
- **Package Manager:** Bun
