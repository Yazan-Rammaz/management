import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
};

/**
 * The one input. Uncontrolled + `name` based so it works directly with
 * Server Action FormData. Sizes in XD pixels.
 */
export function TextField({
  label,
  name,
  error,
  className,
  ...props
}: TextFieldProps) {
  const id = `field-${name}`;
  return (
    <div className="flex w-full flex-col gap-6">
      <label htmlFor={id} className="fz-14 font-medium opacity-80">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-48 w-full border px-16 rad-12 fz-16 outline-none",
          "border-foreground/15 focus:border-foreground/40",
          error && "border-red-500 focus:border-red-500",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="fz-12 text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
