"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { iosEase } from "@/components/motion/presets";

/**
 * Re-mounts on every navigation (layout.tsx persists; template.tsx remounts),
 * so it drives the iOS-style page transition: each new page slides in from the
 * right with the iOS navigation easing. Reduced-motion users get no slide.
 * (The splash overlay hides the very first load's slide.)
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className="h-full">{children}</div>;

  return (
    <motion.div
      className="h-full"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={iosEase}
    >
      {children}
    </motion.div>
  );
}
