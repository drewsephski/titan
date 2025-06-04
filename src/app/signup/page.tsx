"use client"

import { useRouter } from "next/navigation";

export default function SignUpRedirectPage() {
  const router = useRouter();

  // Redirect to the actual sign-up page
  router.replace("/sign-up");

  return null;
}
