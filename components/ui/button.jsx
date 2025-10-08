import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium select-none transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "rounded-lg bg-primary text-white hover:bg-primary-600 shadow-[0_10px_30px_-12px_rgba(34,178,184,.55)]",
        secondary:
          "rounded-lg bg-surface text-text border border-border hover:bg-muted/40",
        ghost:
          "rounded-lg bg-transparent text-text-dim hover:text-text hover:bg-muted/30",
        outline:
          "rounded-lg bg-transparent border border-border text-text hover:border-primary/40 hover:bg-muted/25",
        destructive: "rounded-lg bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);
const Button = React.forwardRef(
  ({ asChild = false, variant, size, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
