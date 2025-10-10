import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-bold ring-offset-background transition-smooth focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0 uppercase tracking-wider shadow-pixel hover:shadow-pixel-hover active:translate-x-1 active:translate-y-1 active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary-foreground/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-2 border-destructive-foreground/20",
        outline: "border-4 border-primary bg-background text-primary hover:bg-primary/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-secondary-foreground/20",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground shadow-none hover:shadow-pixel",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
        pixel: "bg-card border-4 border-primary text-primary hover:bg-primary/10 pixel-border",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 px-4 text-[10px]",
        lg: "h-14 px-8 text-sm",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
