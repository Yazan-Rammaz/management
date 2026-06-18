"use client";

import { useRouter } from "next/navigation";
import { PasscodeBoxes } from "./PasscodeBoxes";
import { establishFakeSession } from "../actions";
import { markUnlocked } from "@/lib/auth/lock-state";

/**
 * Returning-user passcode entry. On completion it establishes the (fake)
 * session, then navigates. TEMP: no real passcode check yet — any 6 digits
 * unlock until NestJS auth is wired.
 */
export function PasscodeUnlock({ nextHref }: { nextHref: string }) {
  const router = useRouter();

  return (
    <PasscodeBoxes
      length={6}
      variant="passcode"
      mask
      onComplete={async () => {
        await establishFakeSession();
        markUnlocked();
        router.push(nextHref);
      }}
    />
  );
}
