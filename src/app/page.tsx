'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    // If we're still loading, don't do anything
    if (status === 'loading') return;
    
    // If authenticated, redirect to dashboard
    if (status === 'authenticated') {
      router.push('/dashboard');
    } else {
      // If not authenticated, go to marketing page
      router.push('/(marketing)');
    }
  }, [status, router]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
