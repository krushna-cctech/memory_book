import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarPlaceholderProps {
  name: string;
  className?: string;
}

export const AvatarPlaceholder = ({ name, className }: AvatarPlaceholderProps) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-secondary text-primary font-serif font-bold text-center rounded-full border-2 border-primary/20 select-none",
        className
      )}
      style={{ fontSize: "inherit" }}
      aria-label={`Avatar fallback for ${name}`}
    >
      <span>{initial}</span>
    </div>
  );
};
