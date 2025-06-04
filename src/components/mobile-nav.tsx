"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { PanelsTopLeft, Code, BookOpen, Shield, User, X, Sparkle } from "lucide-react";

export function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  // Add a data attribute to the body when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.setAttribute('data-mobile-nav-open', 'true');
    } else {
      document.body.removeAttribute('data-mobile-nav-open');
    }
  }, [isMobileMenuOpen]);

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <X className="size-4 rotate-45" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/" legacyBehavior passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <PanelsTopLeft className="size-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/blog" legacyBehavior passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Code className="size-4" />
                <span>Blog</span>
              </Button>
            </Link>
            <Link href="/docs" legacyBehavior passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BookOpen className="size-4" />
                <span>Docs</span>
              </Button>
            </Link>
            {!isPending && (session ? (
              <>
                <Link href="/dashboard" legacyBehavior passHref>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Shield className="size-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Link href="/profile" legacyBehavior passHref>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <UserProfile className="size-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/sign-in" legacyBehavior passHref>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="size-4" />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link href="/sign-up" legacyBehavior passHref>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Sparkle className="size-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
