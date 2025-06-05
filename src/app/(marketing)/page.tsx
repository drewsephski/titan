"use client";

import { useState } from "react";
import ThemeToggler from "@/components/theme/toggler";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import {
  PanelsTopLeft,
  Shield,
  Database,
  Server,
  Component,
  Code,
  ArrowRight,
  Sparkle,
  Copy,
  Check,
  ArrowUpRight,
  Github,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Features } from "@/components/blocks/features-8";
import { FeaturedArticles } from "@/components/blocks/featured-articles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Goku from "@/components/ui/goku";
import { OnboardingDialog } from "@/components/onboarding/onboarding-dialog";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const { session, status } = useAuth();
  const router = useRouter();

  const handleOnboardingComplete = () => {
    setIsOnboardingOpen(false);
    if (status === 'authenticated' && session) {
      router.push("/dashboard");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`git clone ${siteConfig.socials.github}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto border border-dashed flex flex-col my-2 md:my-4 p-2 md:p-0">
        <div className="w-full flex justify-between divide-x">
          <div className="relative hidden md:flex w-1/3 aspect-square bg-black items-center justify-center group/titan border-dashed">
            <Goku />
            <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
            <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
            <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
            <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
          </div>
          <div className="flex-1 flex flex-col">
            <div
              id="nav"
              className="w-full flex items-center justify-between border-b border-dashed divide-x desktop-nav"
            >
              <div
                id="brand"
                className="font-mono text-sm flex-1 flex items-center h-full px-2 md:px-3 border-dashed"
              >
                <Link href="/" className="hover:underline">
                  {siteConfig.origin.replace("https://", "")}
                </Link>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {status === 'loading' ? (
                  <Button disabled>Loading...</Button>
                ) : status === 'authenticated' ? (
                  <Button
                    className="h-full border-dashed"
                    size="lg"
                    variant="ghost"
                    asChild
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 group/nav"
                    >
                      <span>Dashboard</span>
                      <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                        <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                        <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                      </div>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="h-full border-dashed relative overflow-hidden group/nav"
                    size="lg"
                    variant="ghost"
                    asChild
                  >
                    <Link
                      href="/sign-in"
                      className="flex items-center gap-2 relative z-10"
                    >
                      <span>Sign In</span>
                      <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                        <ArrowUpRight className="absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                        <ArrowUpRight className="absolute -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                      </div>
                      {/* Enhanced animated background with larger height */}
                      <span
                        className="absolute inset-0 -top-2 -bottom-2 bg-primary/20 -z-10 opacity-0
                          group-hover/nav:opacity-100 transition-all duration-300
                          transform origin-left scale-x-0 group-hover/nav:scale-x-100"
                      />
                    </Link>
                  </Button>
                )}
                <UserProfile className="border-dashed size-10 md:size-14" />
              </div>
              <ThemeToggler className="border-dashed size-10 md:size-14" />
            </div>
            <div id="hero" className="flex flex-col p-2 md:p-6">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                <TextGenerateEffect
                  words="Titan Blog"
                  className="text-5xl md:text-5xl font-bold bg-clip-text bg-gradient-to-r from-primary to-primary/70"
                />
              </h1>
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                <TextGenerateEffect
                  words="Building Modern Web Applications"
                  className="text-xl font-semibold"
                />
              </h2>
              <p className="text-muted-foreground max-w-xl mt-2 text-sm md:text-base leading-relaxed">
                {siteConfig.description}
              </p>
            </div>

            <div id="code" className="flex flex-col p-4 md:p-6">
              <div className="p-2 border border-dashed hover:border-primary/50 bg-card rounded-lg text-xs md:text-sm flex items-center justify-between transition-all duration-200 delay-75">
                <pre className="font-mono bg-linear-to-r from-muted-foreground to-foreground bg-clip-text text-transparent whitespace-pre-wrap">
                  git clone {siteConfig.socials.github}
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 md:size-5 cursor-pointer group/copy"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="size-5 md:size-4" />
                  ) : (
                    <Copy className="size-5 md:size-4 group-hover/copy:text-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <div
              id="cta"
              className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6 border-b border-dashed"
            >
              <div className="flex-1">
                <Button
                  variant="outline"
                  asChild
                  className="relative border-dashed w-full md:w-auto"
                >
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    className="gap-3 md:gap-2 group"
                  >
                    <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <Github className="size-4" />
                    <span>GitHub</span>
                  </a>
                </Button>
              </div>
              <div className="flex-6">
                <Button
                  variant="default"
                  className="border-dashed w-full md:w-auto flex items-center justify-center gap-3 md:gap-2 group"
                  onClick={() => setIsOnboardingOpen(true)}
                >
                  <span>Get started</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-all duration-150" />
                </Button>
              </div>
            </div>

            {/* Onboarding Dialog */}
            <OnboardingDialog
              open={isOnboardingOpen}
              onOpenChange={setIsOnboardingOpen}
              onComplete={handleOnboardingComplete}
            />
          </div>
        </div>
        <div
          id="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-dashed"
        >
          {techConfig.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              className={cn(
                "relative w-full p-6 hover:bg-muted/50 transition-all duration-150 group/item border-dashed",
                {
                  "border-b": index < techConfig.length - 1,
                  "md:border-b-0": index >= techConfig.length - 2,
                  "md:border-b": index < techConfig.length - 2,
                  "lg:border-b-0": index >= techConfig.length - 3,
                  "lg:border-b": index < techConfig.length - 3,
                },
                {
                  "md:border-r":
                    index % 2 === 0 && index !== techConfig.length - 1,
                  "lg:border-r":
                    index % 3 !== 2 && index !== techConfig.length - 1,
                }
              )}
            >
              {(index === 0 || index === techConfig.length - 1) && (
                <Sparkle
                  className={cn(
                    "absolute w-4 h-4 z-10 fill-current hidden md:block",
                    {
                      "-bottom-2 -right-2": index === 0,
                      "-top-2 -left-2": index === techConfig.length - 1,
                    }
                  )}
                />
              )}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="group-hover/item:animate-pulse">
                    {tech.icon}
                  </span>
                  <h3 className="text-zinc-500 dark:text-zinc-400 text-base font-semibold">
                    {tech.category}
                  </h3>
                </div>
                <ArrowRight className="size-4 opacity-0 scale-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:-translate-x-0 group-hover/item:scale-100 transition-all duration-150" />
              </div>
              <h1 className="text-xl font-semibold font-heading tracking-tight mb-2">
                {tech.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {tech.description}
              </p>
            </a>
          ))}
        </div>

        {/* Features Section */}
        <div className="w-full">
          <Features />
        </div>

        {/* Featured Articles */}
        <div className="w-full">
          <FeaturedArticles />
        </div>
      </div>
    </div>
  );
}

const techConfig = [
  {
    icon: <PanelsTopLeft className="size-4" />,
    category: "Full-stack Framework",
    name: "Next.js 15",
    description:
      "Modern, full-stack React framework for building web applications.",
    link: "https://nextjs.org",
  },
  {
    icon: <Shield className="size-4" />,
    category: "Authentication",
    name: "Better-Auth",
    description:
      "Secure authentication solution with OAuth, email/password, magic links, and more",
    link: "https://better-auth.com",
  },
  {
    icon: <Database className="size-4" />,
    category: "ORM",
    name: "Drizzle ORM",
    description:
      "TypeScript ORM with a focus on type safety and developer experience.",
    link: "https://orm.drizzle.team/",
  },
  {
    icon: <Server className="size-4" />,
    category: "Database",
    name: "Postgres",
    description: "It's a Postgres database, what else do you need?",
    link: "https://neon.tech",
  },
  {
    icon: <Component className="size-4" />,
    category: "UI Components",
    name: "ShadCN/UI",
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS.",
    link: "https://ui.shadcn.com",
  },
  {
    icon: <Code className="size-4" />,
    category: "CSS Framework",
    name: "Tailwindcss v4",
    description:
      "Utility-first CSS framework for rapidly building custom user interfaces.",
    link: "https://tailwindcss.com",
  },
];