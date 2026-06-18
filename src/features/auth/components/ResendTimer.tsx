"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Resend countdown for the verification screen. Counts down from `startSeconds`;
 * while running it shows "Resend After - MM:SS". At 00:00 the counter is hidden
 * and an active "Resend" appears, which re-requests the code and restarts.
 *
 * NOTE: the trailing icon is `info_gray` as a placeholder — swap for the proper
 * resend/refresh asset when available.
 */
export function ResendTimer({ startSeconds = 120 }: { startSeconds?: number }) {
  const [remaining, setRemaining] = useState(startSeconds);

  useEffect(() => {
    // One persistent ticker: counts down while > 0, idles at 0. `resend` simply
    // sets the value back up and this same interval resumes the countdown.
    const id = setInterval(() => {
      setRemaining((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function resend() {
    // TODO: re-request the WhatsApp code via a Server Action once auth is wired.
    setRemaining(startSeconds);
  }

  if (remaining <= 0) {
    return (
      <button
        type="button"
        onClick={resend}
        className="flex items-center gap-6 font-medium text-[#388CFF]"
      >
        Resend
        <Icon name="auth/info_gray" width={15} height={15} />
      </button>
    );
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <span className="flex items-center gap-6">
      <span className="text-muted font-normal">Resend After -</span>
      <span className="font-medium text-[#388CFF]">
        {mm}:{ss}
      </span>
      <Icon name="auth/info_gray" width={15} height={15} />
    </span>
  );
}
