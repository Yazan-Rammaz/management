import type { ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";

/**
 * Re-rendered on every navigation, so this is where the iOS page transition
 * lives. (layout.tsx persists; template.tsx remounts.)
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
