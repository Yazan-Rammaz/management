import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ScreenVariant = "centered" | "bleed";

type ScreenProps = {
  children: ReactNode;
  /**
   * "centered" — content sits in a max-width column. On screens wider than the
   *   content width, only left/right whitespace grows (elements never stretch).
   *   On narrower screens the whitespace is consumed first, then the whole
   *   layout scales down via the root font-size engine. (Text/form pages.)
   *
   * "bleed" — content spans the full canvas (dashboards, tables, hero layouts).
   */
  variant?: ScreenVariant;
  /**
   * Content column width in XD pixels (only used by "centered").
   * Read it straight from the XD frame — e.g. a 1100px content block -> 1100.
   * Above this width the page just gains side whitespace; below it, it scales.
   */
  maxW?: number;
  /** Horizontal gutter in XD pixels. */
  gutter?: number;
  className?: string;
};

/**
 * Screen — the ONE page wrapper. Every route renders its content inside exactly
 * one <Screen>. Do not hand-roll page containers; pick a variant instead.
 */
export function Screen({
  children,
  variant = "centered",
  maxW = 1100,
  gutter = 24,
  className,
}: ScreenProps) {
  return (
    <main
      className={cn(
        "w-full",
        variant === "centered" && "mx-auto",
        className,
      )}
      style={
        variant === "centered"
          ? {
              // XD px -> scaling rem. 0.0625rem == 1px at the 16px base.
              maxWidth: `${maxW * 0.0625}rem`,
              paddingInline: `${gutter * 0.0625}rem`,
            }
          : undefined
      }
    >
      {children}
    </main>
  );
}
