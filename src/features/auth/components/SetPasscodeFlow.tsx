"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasscodeBoxes } from "./PasscodeBoxes";
import { establishFakeSession } from "../actions";
import { markUnlocked } from "@/lib/auth/lock-state";

// XD px -> scaling rem.
const rem = (px: number) => `${px * 0.0625}rem`;

/**
 * First-login passcode: enter, then re-enter to confirm.
 *  - enter (label "Set Passcode") → store, switch to re-enter.
 *  - re-enter (label "Reenter Passcode"):
 *      match   → boxes turn green, then navigate to `nextHref`.
 *      mismatch→ show an error message for 2s, then reset to the enter step.
 */
export function SetPasscodeFlow({ nextHref }: { nextHref: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"enter" | "reenter">("enter");
  const [first, setFirst] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // Bumping this remounts <PasscodeBoxes>, clearing it between steps.
  const [round, setRound] = useState(0);

  function handleComplete(value: string) {
    if (phase === "enter") {
      setFirst(value);
      setPhase("reenter");
      setRound((r) => r + 1);
      return;
    }
    if (value === first) {
      setSuccess(true);
      setTimeout(async () => {
        await establishFakeSession();
        markUnlocked();
        router.push(nextHref);
      }, 650);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setPhase("enter");
        setFirst("");
        setRound((r) => r + 1);
      }, 2000);
    }
  }

  return (
    <div className="flex flex-col items-center" style={{ marginTop: rem(40) }}>
      <PasscodeBoxes
        key={round}
        length={6}
        mask
        success={success}
        onComplete={handleComplete}
      />
      <span
        className={`fz-11 leading-none font-medium ${error ? "text-red-500" : "text-ink"}`}
        style={{ marginTop: rem(16) }}
      >
        {error
          ? "Passcode doesn’t match"
          : phase === "enter"
            ? "Set Passcode"
            : "Reenter Passcode"}
      </span>
    </div>
  );
}
