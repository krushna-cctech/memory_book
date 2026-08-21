import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container = ({ className, clean = false, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        "w-full px-4 mx-auto",
        !clean && "max-w-5xl sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  );
};
