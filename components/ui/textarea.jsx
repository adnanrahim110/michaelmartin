import { cn } from "@/lib/utils";
import * as React from "react";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[96px] resize-none rounded-lg border border-border bg-muted px-3 py-2 text-sm text-text placeholder:text-text-dim outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
export { Textarea };
