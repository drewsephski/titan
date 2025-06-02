import { MainNav } from "@/components/main-nav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden lg:block lg:w-1/2 bg-black relative">
          {/* Your Goku component or other content */}
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
