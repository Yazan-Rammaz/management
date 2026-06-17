"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cardOpen, iosSpring } from "./presets";
import { cn } from "@/lib/utils/cn";

/**
 * iOS-style card that can morph into a detail view. Give the list card and the
 * detail container the SAME `layoutId` to get the shared-element open animation.
 */
export function AnimatedCard({
  children,
  layoutId,
  className,
}: {
  children: ReactNode;
  layoutId?: string;
  className?: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      variants={cardOpen}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={iosSpring}
      className={cn("rad-16 border border-foreground/10 p-20", className)}
    >
      {children}
    </motion.div>
  );
}
