import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", iconOnly = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-serif font-semibold transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
          // Variant mappings
          variant === "primary" && "bg-primary text-card border-2 border-primary hover:bg-transparent hover:text-primary shadow-[2px_2px_0px_rgba(91,70,54,1)] hover:shadow-none translate-y-0 active:translate-y-[2px] active:shadow-none",
          variant === "secondary" && "bg-secondary text-primary border-2 border-secondary hover:bg-transparent hover:text-primary shadow-[2px_2px_0px_rgba(91,70,54,0.3)] hover:shadow-none translate-y-0 active:translate-y-[2px]",
          variant === "outline" && "border-2 border-primary text-primary hover:bg-primary hover:text-card translate-y-0 active:translate-y-[2px]",
          variant === "ghost" && "text-primary hover:bg-secondary/30",
          variant === "accent" && "bg-accent text-card border-2 border-accent hover:bg-transparent hover:text-accent shadow-[2px_2px_0px_rgba(201,107,91,0.5)] hover:shadow-none translate-y-0 active:translate-y-[2px]",
          // Size mappings
          size === "sm" && (iconOnly ? "p-1.5 text-xs" : "px-3.5 py-1.5 text-xs tracking-wide"),
          size === "md" && (iconOnly ? "p-2.5 text-sm" : "px-5 py-2.5 text-sm tracking-wide"),
          size === "lg" && (iconOnly ? "p-3.5 text-base" : "px-8 py-3.5 text-base tracking-wider"),
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
