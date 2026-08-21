import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "polaroid" | "scrapbook";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card text-foreground transition-all duration-300",
          // Standard card - elegant border and subtle paper shadow
          variant === "default" && "rounded-xl border border-secondary/50 p-6 shadow-sm hover:shadow-[4px_4px_12px_rgba(91,70,54,0.08)]",
          // Polaroid photograph style card
          variant === "polaroid" && "p-4 pb-12 border border-secondary bg-card shadow-[6px_6px_18px_rgba(91,70,54,0.12)] rounded-sm rotate-1 hover:rotate-0 hover:scale-[1.02] transform transition-all",
          // Vintage scrapbook page style card
          variant === "scrapbook" && "rounded-lg border-2 border-dashed border-secondary/80 p-8 shadow-inner relative overflow-hidden bg-card/90",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
