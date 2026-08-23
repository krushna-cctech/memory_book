import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "antique" | "polaroid" | "simple";
  children: React.ReactNode;
}

export const AvatarFrame = ({ className, variant = "antique", children, ...props }: AvatarFrameProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-all duration-300",
        variant === "antique" && "border-4 border-double border-primary bg-card/60 shadow-[4px_4px_16px_rgba(91,70,54,0.15)] rounded-full p-2",
        variant === "polaroid" && "flex-col bg-card border-2 border-secondary/70 p-3 pb-10 shadow-[6px_6px_18px_rgba(91,70,54,0.1)] rounded-sm rotate-[-1.5deg] hover:rotate-0 hover:scale-[1.03] transition-transform duration-300",
        variant === "simple" && "border-2 border-secondary/60 rounded-full p-1",
        className
      )}
      {...props}
    >
      {children}
      {/* Ornate corner flourishes for the antique frame */}
      {variant === "antique" && (
        <>
          <span className="absolute top-1 left-1 text-[12px] text-accent select-none" aria-hidden="true">✦</span>
          <span className="absolute bottom-1 right-1 text-[12px] text-accent select-none" aria-hidden="true">✦</span>
        </>
      )}
    </div>
  );
};
