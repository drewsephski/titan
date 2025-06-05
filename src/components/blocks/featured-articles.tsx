import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { ArticleDialog } from "@/components/ui/article-dialog"

type Article = {
  title: string
  description: string
  href: string
  category: string
  readTime: string
  date: string
  content: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

const articles: Article[] = [
  {
    title: "Building Scalable Web Applications with Next.js 15",
    description: "Learn how to leverage the latest features of Next.js 15 to build highly scalable and performant web applications.",
    href: "/blog/nextjs-15-scalable-apps",
    category: "Development",
    readTime: "5 min read",
    date: "May 15, 2025",
    content: `Next.js 15 introduces several groundbreaking features that make it easier than ever to build scalable web applications. In this article, we'll explore how to leverage these features to create high-performance, SEO-friendly applications that can handle millions of users.

One of the most exciting additions is the new React Server Components architecture, which allows you to build applications that combine the best of server-side and client-side rendering. This approach can significantly reduce your bundle size and improve time-to-interactive metrics.

We'll also cover the new routing system, which makes it easier to create complex application structures while maintaining excellent performance. The improved image optimization and font loading strategies can help you achieve near-perfect Core Web Vitals scores.

Finally, we'll discuss best practices for deploying your Next.js 15 application to various hosting platforms, ensuring you can scale your application as your user base grows.`,
    author: {
      name: "Drew Sepeczi",
      role: "Frontend Developer",
      avatar: "/avatars/drew-sepeczi.jpg"
    }
  },
  {
    title: "Modern Authentication Patterns in 2025",
    description: "Explore the latest trends and best practices in web authentication and security.",
    href: "/blog/modern-auth-patterns",
    category: "Security",
    readTime: "7 min read",
    date: "April 28, 2025",
    content: `Authentication is a critical component of any web application, and the landscape is constantly evolving. In this comprehensive guide, we'll explore the most effective authentication patterns for modern web applications in 2025.

We'll start by examining the shift from traditional session-based authentication to token-based approaches like JWT and PASETO. You'll learn when to use each approach and how to implement them securely in your applications.

Next, we'll dive into the world of passwordless authentication, exploring magic links, WebAuthn, and biometric authentication. These methods not only improve security but also enhance the user experience by eliminating the need to remember complex passwords.

Finally, we'll discuss advanced topics like multi-factor authentication (MFA), rate limiting, and security headers to protect your application from common attacks. By the end of this article, you'll have a solid understanding of how to implement robust authentication in your applications.`,
    author: {
      name: "Drew Sepeczi",
      role: "Security Engineer",
      avatar: "/avatars/drew-sepeczi.jpg"
    }
  },
  {
    title: "Optimizing Database Performance with Drizzle ORM",
    description: "Tips and tricks to get the most out of Drizzle ORM in your TypeScript projects.",
    href: "/blog/drizzle-orm-optimization",
    category: "Database",
    readTime: "6 min read",
    date: "June 2, 2025",
    content: `Drizzle ORM has quickly become one of the most popular ORM choices for TypeScript developers, and for good reason. In this article, we'll explore advanced techniques for optimizing your database queries and improving overall application performance.

We'll start by examining Drizzle's query builder and how to write efficient queries that take full advantage of your database's capabilities. You'll learn how to use Drizzle's type-safe API to prevent common query-related bugs and improve developer productivity.

Next, we'll dive into performance optimization techniques, including query batching, connection pooling, and efficient data loading strategies. You'll learn how to use Drizzle's built-in tools to identify and fix performance bottlenecks in your application.

Finally, we'll explore advanced topics like transactions, migrations, and how to integrate Drizzle with popular backend frameworks. Whether you're building a small side project or a large-scale enterprise application, these techniques will help you get the most out of Drizzle ORM.`,
    author: {
      name: "Drew Sepeczi",
      role: "Backend Engineer",
      avatar: "/avatars/drew-sepeczi.jpg"
    }
  }
]

export function FeaturedArticles() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleCardClick = (article: Article) => {
    setSelectedArticle(article)
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) setSelectedArticle(null)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <TextGenerateEffect words="Featured Articles" className="text-4xl font-bold bg-clip-text bg-gradient-to-r from-primary to-primary/70" />
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the latest insights and tutorials from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="relative">
              <Card
                onClick={() => handleCardClick(article)}
                className="group relative overflow-hidden transition-all duration-300 cursor-pointer h-full flex flex-col
                hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1
                hover:bg-gradient-to-br hover:from-card/90 hover:to-card/80 dark:hover:from-card/95 dark:hover:to-card/90
                border border-transparent hover:border-primary/20
                transform-gpu"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">{article.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                      Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          <ArticleDialog
            article={selectedArticle}
            onOpenChange={handleDialogOpenChange}
          />
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            View all articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
