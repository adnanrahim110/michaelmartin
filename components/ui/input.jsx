import { cn } from "@/lib/utils";
import * as React from "react";
const sizes = {
  sm: "h-9 text-sm rounded-md",
  md: "h-10 text-sm rounded-lg",
  lg: "h-12 text-base rounded-xl",
};
const paddings = {
  none: "px-3",
  left: "pl-9 pr-3",
  right: "pl-3 pr-9",
  both: "pl-9 pr-9",
};
const base =
  "w-full border bg-muted text-text placeholder:text-text-dim border-border outline-none " +
  "transition-shadow disabled:cursor-not-allowed disabled:opacity-50 " +
  "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0";
const errorRing = "focus-visible:ring-red-500/40 border-red-500/60";
const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      size = "md",
      error = false,
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const pad =
      startAdornment && endAdornment
        ? paddings.both
        : startAdornment
        ? paddings.left
        : endAdornment
        ? paddings.right
        : paddings.none;
    return (
      <div className="relative">
        <input
          type={type}
          aria-invalid={error || undefined}
          ref={ref}
          className={cn(
            base,
            sizes[size] ?? sizes.md,
            pad,
            error && errorRing,
            className
          )}
          {...props}
        />
        {startAdornment ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-dim">
            {startAdornment}
          </span>
        ) : null}
        {endAdornment ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-dim">
            {endAdornment}
          </span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };
