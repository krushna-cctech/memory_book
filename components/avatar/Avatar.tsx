"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AvatarPlaceholder } from "./AvatarPlaceholder";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  className?: string;
}

export const Avatar = ({
  src,
  name,
  size = "md",
  glow = false,
  className
}: AvatarProps) => {
  const [error, setError] = useState(false);

  const sizeClasses = {
    sm: "w-12 h-12 text-base",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-3xl",
    xl: "w-36 h-36 text-4xl",
  };

  if (!src || error) {
    return <AvatarPlaceholder name={name} className={cn(sizeClasses[size], className)} />;
  }

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden border-2 border-primary bg-card transition-all duration-300",
        sizeClasses[size],
        glow && "shadow-[0_0_20px_rgba(201,107,91,0.35)] ring-4 ring-accent/25",
        className
      )}
    >
      <img
        src={src}
        alt={`${name}'s avatar`}
        className="w-full h-full object-cover select-none"
        onError={() => setError(true)}
      />
    </div>
  );
};
