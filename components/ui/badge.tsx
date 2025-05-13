import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        flat: "border-transparent bg-gray-900/20 text-gray-200/90",
      },
      color: {
        default: "",
        primary: "bg-blue-600/20 text-blue-300 border-blue-700/30",
        success: "bg-green-600/20 text-green-300 border-green-700/30",
        warning: "bg-yellow-600/20 text-yellow-300 border-yellow-700/30",
        danger: "bg-red-600/20 text-red-300 border-red-700/30",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, color, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, color }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
