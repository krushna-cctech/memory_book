import React from "react";
import { cn } from "@/lib/utils";

interface BookProgressProps {
  totalChaptersCount: number;
  currentChapterNumber: number;
}

export const BookProgress = ({
  totalChaptersCount,
  currentChapterNumber
}: BookProgressProps) => {
  return (
    <div className="w-full flex items-center justify-center py-2" aria-label="Reading progress">
      {/* Mobile progress layout */}
      <div className="md:hidden font-serif text-xs tracking-[0.2em] text-accent font-bold select-none">
        CHAPTER {String(currentChapterNumber).padStart(2, "0")} / {String(totalChaptersCount).padStart(2, "0")}
      </div>

      {/* Desktop progress nodes timeline */}
      <div className="hidden md:flex items-center space-x-3 select-none">
        {Array.from({ length: totalChaptersCount }).map((_, index) => {
          const chNumber = index + 1;
          const isPassedOrActive = chNumber <= currentChapterNumber;
          const isActive = chNumber === currentChapterNumber;

          return (
            <React.Fragment key={chNumber}>
              <div
                className={cn(
                  "font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full border transition-all duration-300",
                  isActive
                    ? "border-accent bg-accent text-card shadow-sm"
                    : isPassedOrActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-secondary/70 text-muted/40"
                )}
              >
                {String(chNumber).padStart(2, "0")}
              </div>
              
              {chNumber < totalChaptersCount && (
                <div
                  className={cn(
                    "w-12 h-[2px] rounded-full transition-all duration-300",
                    chNumber < currentChapterNumber ? "bg-accent" : "bg-secondary/60"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
