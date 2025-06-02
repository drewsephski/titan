# Decision Log

## Important Technical/Architectural Decisions

- **Framework:** Next.js 15-canary was chosen specifically to enable node runtime support within middleware, as noted in the README. This allows for more flexibility in handling requests at the edge.
- **Authentication:** The `better-auth` library was selected for handling authentication, including social login providers like Google, Github, and Discord. This provides a pre-built solution for common authentication patterns.
- **Database and ORM:** PostgreSQL was chosen as the database, with `drizzle-orm` as the Object-Relational Mapper. This combination provides a type-safe and performant way to interact with the database. Neon is used for a serverless PostgreSQL option, with a local Docker setup also supported.
- **UI and Styling:** Tailwind CSS v4 was adopted for styling, paired with Shadcn UI for pre-built, customizable components. This provides a modern and efficient approach to building the user interface.
- **Package Manager:** Bun was chosen as the package manager, likely for its performance benefits during installation and script execution.
