'use client'

import { Suspense, ReactNode } from 'react';
import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: ReactNode;
}

export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 mb-2"></div>
              <span className="text-sm text-muted-foreground">Loading 3D scene...</span>
            </div>
          </div>
        )
      }
    >
      <Spline
        scene={scene}
        className={cn("w-full h-full", className)}
      />
    </Suspense>
  )
}
