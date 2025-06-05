"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

function OnboardingDialog({ open, onOpenChange, onComplete }: OnboardingDialogProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const stepContent = [
    {
      title: "Welcome to Titan",
      description:
        "Welcome to Titan! Let's get you started with our platform.",
    },
    {
      title: "Customizable Components",
      description:
        "Explore our customizable components and build amazing interfaces.",
    },
    {
      title: "Ready to Start?",
      description: "Let's dive into Titan's features and capabilities.",
    },
  ];

  useEffect(() => {
    if (!open) {
      setStep(1);
    }
  }, [open]);

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onOpenChange(false);
      onComplete();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1]?.title || 'Step'}</DialogTitle>
            <DialogDescription>{stepContent[step - 1]?.description || ''}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-primary",
                    index + 1 === step ? "bg-primary" : "opacity-20",
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Skip
                </Button>
              </DialogClose>
              {step < totalSteps ? (
                <Button className="group" type="button" onClick={handleContinue}>
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button type="button" onClick={() => { onOpenChange(false); onComplete(); }}>
                  Get Started
                </Button>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { OnboardingDialog };