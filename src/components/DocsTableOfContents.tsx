'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/icons'; // Assuming Icons are needed, though not in the TOC itself

interface DocsSection {
  title: string;
  items: {
    title: string;
    href: string;
    icon: keyof typeof Icons;
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


  return (
    <div className="sticky top-24 space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        On this page
      </h3>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.title}>
            <Link
              href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`hover:underline ${
                activeId === section.title.toLowerCase().replace(/\s+/g, '-')
                  ? 'text-primary' // Active state class
                  : 'text-muted-foreground hover:text-foreground' // Default state classes
              }`}
              aria-label={`Jump to ${section.title} section`}
            >
              {section.title}
            </Link>
          </li>
        ))}
         {/* Add the "Need help?" link manually as it's not part of docsSections */}
         <li>
            <Link
              href="#need-help"
              className={`hover:underline ${
                activeId === 'need-help'
                  ? 'text-primary' // Active state class
                  : 'text-muted-foreground hover:text-foreground' // Default state classes
              }`}
              aria-label="Jump to Need help? section"
            >
              Need help?
            </Link>
          </li>
      </ul>
    </div>
  );
}