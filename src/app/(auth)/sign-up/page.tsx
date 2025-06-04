// src/app/(auth)/sign-up/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SignUpPage } from "@/components/ui/sign-up";
import { OnboardingDialog } from "@/components/onboarding/onboarding-dialog";
import { CanvasRevealEffect } from "@/components/ui/sign-in/dot-matrix";

export default function SignUpPageWrapper() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);

  useEffect(() => {
    if (isSignUpComplete) {
      setShowOnboarding(true);
    }
  }, [isSignUpComplete]);

  const handleSignUpSuccess = () => {
    setIsSignUpComplete(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    router.push("/dashboard");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <CanvasRevealEffect />
      </div>

      {/* Main Content - Centered in viewport */}
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-background/90 backdrop-blur-sm rounded-2xl border border-border-/50 shadow-2xl overflow-hidden transform -translate-y-8">
          <SignUpPage onSignUpSuccess={handleSignUpSuccess} />
        </div>
      </div>

      {/* Onboarding Dialog */}
      <OnboardingDialog
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}