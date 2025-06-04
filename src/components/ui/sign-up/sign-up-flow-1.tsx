// src/components/ui/sign-up/sign-up-flow-1.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Icons } from "@/components/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignUpPageProps {
  className?: string;
  onSignUpSuccess?: () => void;
}

export const SignUpPage = ({ className, onSignUpSuccess }: SignUpPageProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/dashboard"
      });

      if (error) {
        setError(error.message || "Failed to create account. Please try again.");
        return;
      }


      toast.success("Account created successfully! Please check your email to verify your account.");
      
      if (onSignUpSuccess) {
        onSignUpSuccess();
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "github" | "google" | "discord") => {
    try {
      setIsLoading(true);
      
      // Use the social sign-in method from authClient
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard"
      });
      
      if (error) {
        setError(error.message || `Failed to sign in with ${provider}`);
      }
    } catch (err) {
      console.error(`Social sign in error (${provider}):`, err);
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 sm:p-8", className)}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>

      {error && (
        <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="grid gap-6 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading}
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center"
          >
            <Icons.gitHub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading}
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center"
          >
            <Icons.Google className="h-4 w-4" />
            <span className="sr-only">Google</span>
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading}
            onClick={() => handleSocialSignIn("discord")}
            className="flex items-center justify-center"
          >
            <Icons.Discord className="h-4 w-4" />
            <span className="sr-only">Discord</span>
          </Button>
        </div>
      </div>

      <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};