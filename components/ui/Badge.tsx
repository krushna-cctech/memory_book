import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "highlight" | "outline";
}

export const Badge = ({ className, variant = "secondary", ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-serif font-medium tracking-wider border border-transparent select-none",
        variant === "primary" && "bg-primary text-card",
        variant === "secondary" && "bg-secondary/50 text-primary border-secondary/30",
        variant === "accent" && "bg-accent/10 text-accent border-accent/20",
        variant === "highlight" && "bg-highlight/30 text-primary border-highlight/30",
        variant === "outline" && "border-primary/30 text-primary",
        className
      )}
      {...props}
    />
  );
};
