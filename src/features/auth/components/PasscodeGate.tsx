"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUnlocked } from "@/lib/auth/lock-state";

/**
 * Protected-area passcode gate. The session (authenticated) persists in a
 * cookie, but the app must be "unlocked" with the passcode on every fresh load.
 * Rendered in the dashboard layout: if this page load isn't unlocked, it sends
 * the user to the passcode screen. (The splash overlay hides the brief redirect.)
 */
export function PasscodeGate() {
  const router = useRouter();

  useEffect(() => {
    if (!isUnlocked()) router.replace("/login/passcode");
  }, [router]);

  return null;
}
