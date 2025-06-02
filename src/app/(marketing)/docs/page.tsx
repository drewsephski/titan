'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site.config';
import { ArrowRight, BookOpen, Zap, Download, Key, Database, Code, Cloud, Settings, HelpCircle, Github } from 'lucide-react';

// Type for the icon names to ensure type safety
type IconName = keyof typeof Icons;

// Icon mapping for documentation sections
const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  bookOpen: BookOpen,
  zap: Zap,
  download: Download,
  key: Key,
  database: Database,
  code: Code,
  cloud: Cloud,
  settings: Settings,
  helpCircle: HelpCircle,
  github: Github,
  arrowRight: ArrowRight,
};

interface Section {
  id: string;
  title: string;
  items: {
    title: string;
    href: string;
    icon: string;
    description?: string;
  }[];
}

const docsSections: Section[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs/getting-started/introduction',
        icon: 'bookOpen',
        description: 'Learn the basics and get familiar with our platform'
      },
      {
        title: 'Quick Start',
        href: '/docs/getting-started/quick-start',
        icon: 'zap',
        description: 'Get up and running in just a few minutes'
      },
      {
        title: 'Installation',
        href: '/docs/getting-started/installation',
        icon: 'download',
        description: 'Step-by-step installation guide'
      },
    ],
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    items: [
      {
        title: 'Authentication',
        href: '/docs/concepts/authentication',
        icon: 'key',
        description: 'Learn about our authentication flow and security'
      },
      {
        title: 'Data Models',
        href: '/docs/concepts/data-models',
        icon: 'database',
        description: 'Understand our data structure and relationships'
      },
      {
        title: 'API Reference',
        href: '/docs/concepts/api',
        icon: 'code',
        description: 'Comprehensive API documentation'
      },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    items: [
      {
        title: 'Deployment',
        href: '/docs/guides/deployment',
        icon: 'cloud',
        description: 'Deploy your application with best practices'
      },
      {
        title: 'Customization',
        href: '/docs/guides/customization',
        icon: 'settings',
        description: 'Customize the platform to fit your needs'
      },
      {
        title: 'Troubleshooting',
        href: '/docs/guides/troubleshooting',
        icon: 'helpCircle',
        description: 'Solutions to common issues'
      },
    ],
  },
];

interface SectionRef {
  id: string;
  title: string;
  level: number;
}

export default function DocsPage() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const sectionsRef = useRef<SectionRef[]>([]);

  useEffect(() => {
    // Initialize sections for table of contents
    sectionsRef.current = [
      { id: 'getting-started', title: 'Getting Started', level: 2 },
      { id: 'core-concepts', title: 'Core Concepts', level: 2 },
      { id: 'guides', title: 'Guides', level: 2 },
      { id: 'need-help', title: 'Need help?', level: 2 },
    ];

    // Set active section from URL hash
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState({}, '', `#${id}`);
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper function to render icon
  const renderIcon = (iconName: string) => {
    const Icon = sectionIcons[iconName] || Icons.file;
    return (
      <div className="mr-3 p-2 rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav className="sticky top-24 space-y-8 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2 -mr-2">
              <div className="space-y-2 mb-6">
                <Link
                  href="/"
                  className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </div>

              {docsSections.map((section) => (
                <div key={section.id} className="space-y-2">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h2>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            {renderIcon(item.icon)}
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 xl:col-span-7">
            <div className="prose dark:prose-invert max-w-none">
              <h1 id="documentation" className="scroll-mt-24">Documentation</h1>
              <p className="lead">
                Welcome to the {siteConfig.name} documentation. Here you'll find comprehensive
                guides and documentation to help you get started and make the most of our platform.
              </p>

              {/* Getting Started Section */}
              <section id="getting-started" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {docsSections[0].items.map((item) => (
                    <div key={item.href} className="rounded-lg border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        {renderIcon(item.icon)}
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Concepts Section */}
              <section id="core-concepts" className="mt-16 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">Core Concepts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {docsSections[1].items.map((item) => (
                    <div key={item.href} className="rounded-lg border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        {renderIcon(item.icon)}
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Guides Section */}
              <section id="guides" className="mt-16 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">Guides</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {docsSections[2].items.map((item) => (
                    <div key={item.href} className="rounded-lg border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        {renderIcon(item.icon)}
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        View guide
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Need Help Section */}
              <section id="need-help" className="mt-16 border-t pt-8 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4">Need help?</h2>
                <p className="mb-4">
                  Can't find what you're looking for? Check out our{' '}
                  <Link href="/faq" className="text-primary hover:underline">
                    FAQ
                  </Link>{' '}
                  or contact our support team for assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="https://github.com/your-org/your-repo/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Open an Issue
                  </Link>
                </div>
              </section>
            </div>
          </main>

          {/* Table of Contents */}
          <aside className="hidden xl:block xl:col-span-3">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                On this page
              </h3>
              <nav>
                <ul className="space-y-2">
                  {sectionsRef.current.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => scrollToSection(e, section.id)}
                          className={`block py-1 text-sm transition-colors ${
                            isActive
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          style={{
                            paddingLeft: `${(section.level - 2) * 12}px`,
                          }}
                        >
                          {section.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="pt-6 mt-6 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/blog"
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icons.newspaper className="mr-2 h-4 w-4 flex-shrink-0" />
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/changelog"
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icons.gitCommit className="mr-2 h-4 w-4 flex-shrink-0" />
                      Changelog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icons.users className="mr-2 h-4 w-4 flex-shrink-0" />
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
