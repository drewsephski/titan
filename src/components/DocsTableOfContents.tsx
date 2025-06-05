'use client';

import { useEffect, useRef, useState } from 'react';
import { DocsIcon } from './DocsIcon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from './icons';

interface DocsSection {
  title: string;
  items: {
    title: string;
    href: string;
    icon: keyof typeof Icons;
    content?: string; // Optional content for dialog
  }[];
}

interface DocsTableOfContentsProps {
  sections: DocsSection[];
}

export default function DocsTableOfContents({ sections }: DocsTableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    // Observe the main content sections based on their IDs
    const sectionElements = sections.flatMap(section =>
      section.items.map(item => document.getElementById(item.href.substring(1))) // Get elements by ID from href
    ).filter(el => el !== null) as Element[]; // Filter out nulls and cast

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -60% 0px', // Adjust this margin as needed
      threshold: 0,
    });

    sectionElements.forEach((el) => observer.current?.observe(el));

    // Clean up observer on component unmount
    return () => {
      observer.current?.disconnect();
    };
  }, [sections]); // Re-run effect if sections change

  // The table of contents links are based on the section titles, not the item hrefs
  // We need to observe the main content sections which are identified by the section title lowercased and hyphenated
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    // Observe the main content sections based on their IDs derived from section titles
    const mainContentSectionElements = sections.map(section =>
      document.getElementById(section.title.toLowerCase().replace(/\s+/g, '-'))
    ).filter(el => el !== null) as Element[]; // Filter out nulls and cast

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -60% 0px', // Adjust this margin as needed
      threshold: 0,
    });

    mainContentSectionElements.forEach((el) => observer.current?.observe(el));

    // Clean up observer on component unmount
    return () => {
      observer.current?.disconnect();
    };
  }, [sections]); // Re-run effect if sections change

  // Handle smooth scrolling
  const handleScroll = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-24 space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        On this page
      </h3>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.title}>
            <div
              onClick={() => handleScroll(`#${section.title.toLowerCase().replace(/\s+/g, '-')}`)}
              className={cn(
                'flex items-center gap-2 hover:bg-accent rounded-md p-2 transition-colors cursor-pointer',
                activeId === section.title.toLowerCase().replace(/\s+/g, '-')
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform hover:translate-x-1" />
              <span className="flex-1">{section.title}</span>
            </div>
          </li>
        ))}
        {sections.map((section) => (
          <li key={section.title} className="space-y-2">
            {section.items.map((item) => (
              <Dialog key={item.href}>
                <DialogTrigger asChild>
                  <div className="flex items-center gap-2 hover:bg-accent rounded-md p-2 transition-colors cursor-pointer">
                    <DocsIcon icon={item.icon} className="w-4 h-4 text-muted-foreground" />
                    <span
                      onClick={() => handleScroll(item.href)}
                      className={cn(
                        'flex-1',
                        activeId === item.href.substring(1)
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.title}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform hover:translate-x-1" />
                  </div>
                </DialogTrigger>
                {item.content && (
                  <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                    </DialogDescription>
                  </DialogContent>
                )}
              </Dialog>
            ))}
          </li>
        ))}
        {/* Add the "Need help?" link manually as it's not part of docsSections */}
        <li>
          <div
            onClick={() => handleScroll('#need-help')}
            className={cn(
              'flex items-center gap-2 hover:bg-accent rounded-md p-2 transition-colors cursor-pointer',
              activeId === 'need-help'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform hover:translate-x-1" />
            <span>Need help?</span>
          </div>
        </li>
      </ul>
    </div>
  );
}