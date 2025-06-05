'use client';

import { useEffect, useRef, useState } from 'react';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site.config';
import { BookOpen, Zap, Download, Key, Database, Code, Cloud, Settings, HelpCircle, Github, Newspaper, Phone, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Type for the icon names to ensure type safety
type IconName = keyof typeof sectionIcons;

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
  newspaper: Newspaper,
  phone: Phone,
  github: Github,
  arrowRight: ArrowRight,
};

interface SectionItem {
  title: string;
  href: string;
  icon: string;
  description?: string;
}

interface Section {
  id: string;
  title: string;
  items: SectionItem[];
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

  const scrollToSection = (e: React.MouseEvent | null, id: string) => {
    if (e) {
      e.preventDefault();
    }
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState({}, '', `#${id}`);
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper function to render icon
  const renderIcon = (iconName: IconName) => {
    const Icon = sectionIcons[iconName];
    if (!Icon) return null;
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
                <div
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back to Top
                </div>
              </div>

              {docsSections.map((section) => (
                <div key={section.id} className="space-y-2">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h2>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              onClick={(e) => scrollToSection(e, item.href.split('#')[1] || item.href)}
                              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer hover:bg-muted/50 ${
                                activeSection === item.href.split('#')[1] || activeSection === item.href
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {renderIcon(item.icon)}
                              <span className="flex-1">{item.title}</span>
                              <ArrowRight className="ml-2 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                            </div>
                          </DialogTrigger>
                          {item.description && (
                            <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
                              <DialogHeader>
                                <DialogTitle>{item.title}</DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                <div className="prose max-w-none">
                                  <p>{item.description}</p>
                                </div>
                              </DialogDescription>
                            </DialogContent>
                          )}
                        </Dialog>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 xl:col-span-7">
            <div className="prose dark:prose-invert max-w-none">
              <h1 id="documentation" className="scroll-mt-24 text-3xl font-bold mb-6">Documentation</h1>
              <p className="text-muted-foreground mb-4 text-lg">
                Welcome to the {siteConfig.name} documentation. Here you&apos;ll find comprehensive
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
                      <p className="text-muted-foreground mb-4 text-md">
                        {item.description}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            onClick={() => scrollToSection(null, item.href.split('#')[1] || item.href)}
                            className="inline-flex items-center text-sm font-medium text-primary hover:underline cursor-pointer"
                          >
                            {item.title}
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </DialogTrigger>
                        {item.description && (
                          <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
                            <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              <div className="prose max-w-none">
                                <p>{item.description}</p>
                              </div>
                            </DialogDescription>
                          </DialogContent>
                        )}
                      </Dialog>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Concepts Section */}
              <section id="core-concepts" className="mt-16 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">Core Concepts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {docsSections[1].items.map((item) => (
                    <Dialog key={item.href}>
                      <DialogTrigger asChild>
                        <div className="rounded-lg border p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            {renderIcon(item.icon)}
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-4 text-md">
                            {item.description}
                          </p>
                          <div
                            onClick={(e) => scrollToSection(e, item.href.split('#')[1] || item.href)}
                            className="inline-flex items-center text-sm font-medium text-primary hover:underline cursor-pointer"
                          >
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </DialogTrigger>
                      {item.description && (
                        <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
                          <DialogHeader>
                            <DialogTitle>{item.title}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            <div className="prose max-w-none">
                              <p>{item.description}</p>
                            </div>
                          </DialogDescription>
                        </DialogContent>
                      )}
                    </Dialog>
                  ))}
                </div>
              </section>

              {/* Guides Section */}
              <section id="guides" className="mt-16 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">Guides</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {docsSections[2].items.map((item) => (
                    <Dialog key={item.href}>
                      <DialogTrigger asChild>
                        <div className="rounded-lg border p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            {renderIcon(item.icon)}
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {item.description}
                          </p>
                          <div
                            onClick={(e) => scrollToSection(e, item.href.split('#')[1] || item.href)}
                            className="inline-flex items-center text-sm font-medium text-primary hover:underline cursor-pointer"
                          >
                            View guide
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </DialogTrigger>
                      {item.description && (
                        <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
                          <DialogHeader>
                            <DialogTitle>{item.title}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            <div className="prose max-w-none">
                              <p>{item.description}</p>
                            </div>
                          </DialogDescription>
                        </DialogContent>
                      )}
                    </Dialog>
                  ))}
                </div>
              </section>

              {/* Need Help Section */}
              <section id="need-help" className="mt-16 border-t pt-8 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4">Need help?</h2>
                <p className="mb-4">
                  Can&apos;t find what you&apos;re looking for? Check out our{' '}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        onClick={(e) => scrollToSection(e, 'faq')}
                        className="text-primary hover:underline cursor-pointer"
                      >
                        FAQ
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
                      <DialogHeader>
                        <DialogTitle>FAQ</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <div className="prose max-w-none">
                          <p>Find answers to common questions about our platform.</p>
                        </div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>{' '}
                  or contact our support team for assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        onClick={(e) => scrollToSection(e, 'contact')}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                      >
                        Contact Support
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
                      <DialogHeader>
                        <DialogTitle>Contact Support</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <div className="prose max-w-none">
                          <p>Get in touch with our support team for help with any issues.</p>
                        </div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <a
                    href="https://github.com/your-org/your-repo/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Open an Issue
                  </a>
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
                          className={`block py-2 text-sm transition-colors ${
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
                    <div
                      onClick={() => scrollToSection(null, 'blog')}
                      className="flex items-center py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Icons.newspaper className="mr-2 h-4 w-4 flex-shrink-0" />
                      Blog
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => scrollToSection(null, 'changelog')}
                      className="flex items-center py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Icons.gitCommit className="mr-2 h-4 w-4 flex-shrink-0" />
                      Changelog
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => scrollToSection(null, 'community')}
                      className="flex items-center py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Icons.users className="mr-2 h-4 w-4 flex-shrink-0" />
                      Community
                    </div>
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
