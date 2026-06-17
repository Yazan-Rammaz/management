"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { iosEase, pagePush } from "./presets";

/**
 * Wraps page content with the iOS push-in transition. Driven by App Router's
 * `template.tsx`, which remounts on every navigation. Honors reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <motion.div
      variants={pagePush}
      initial="initial"
      animate="animate"
      transition={iosEase}
      className="flex min-h-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
