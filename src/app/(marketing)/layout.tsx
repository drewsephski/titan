import Link from "next/link";
import { UserMenu } from "@/components/user-menu";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="border-b">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between" role="navigation">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-lg font-bold" aria-label="Home">
              Titan
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-12" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Titan. All rights reserved.
              </p>
            </div>
            <nav className="mt-4 flex space-x-6 md:mt-0" aria-label="Footer navigation">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
