import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { authClient } from "@/lib/auth-client";

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster position="top-right" />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}