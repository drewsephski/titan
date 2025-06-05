"use client";

import { ThemeProvider } from "@/components/theme/provider";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/auth-context";
import { AuthStateProvider } from "@/components/auth/auth-state";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthStateProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </AuthStateProvider>
  );
};

export default RootProviders;
