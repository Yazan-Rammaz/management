import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-foreground/15 bg-transparent hover:bg-foreground/5",
  ghost: "bg-transparent hover:bg-foreground/5",
};

/**
 * The one button. Sizes are XD pixels (h-48, radius 12, fz-16) and scale with
 * the canvas. Compose, don't fork — add a variant here rather than a new button.
 */
export function Button({
  variant = "primary",
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-48 items-center justify-center px-24 rad-12 fz-16 font-medium",
        "transition-[opacity,background-color,transform] duration-150 active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50",
        fullWidth && "w-full",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
