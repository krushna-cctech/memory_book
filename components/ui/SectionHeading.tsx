import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  eyebrow?: string;
}

export const SectionHeading = ({
  className,
  title,
  subtitle,
  align = "center",
  eyebrow,
  ...props
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 mb-8 md:mb-12",
        align === "left" && "items-start text-left",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="font-serif text-xs md:text-sm text-accent uppercase tracking-widest font-semibold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-handwritten text-2xl md:text-3xl text-accent rotate-[-1deg] mt-1 select-none">
          {subtitle}
        </p>
      )}
    </div>
  );
};
