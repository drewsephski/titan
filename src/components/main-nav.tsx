'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Documentation', href: '/docs' },
  ];

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between" role="navigation">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2" aria-label="Home">
            <Image
              src="/drewdev.png"
              alt="DrewDev Logo"
              width={32}
              height={32}
              className="rounded-full object-cover"
              priority
            />
            <span className="text-lg font-bold hidden sm:inline-block">Titan</span>
          </Link>
          <div className="hidden md:flex space-x-6 ml-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground',
                  pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
        </div>
      </nav>
    </header>
  );
}