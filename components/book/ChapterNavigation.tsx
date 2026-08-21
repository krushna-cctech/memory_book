import React from "react";
import { cn } from "@/lib/utils";
import { Chapter } from "@/types/farewell";

interface ChapterNavigationProps {
  chapters: Chapter[];
  activeChapterId: string;
  onChapterSelect?: (id: string) => void;
}

export const ChapterNavigation = ({
  chapters,
  activeChapterId,
  onChapterSelect
}: ChapterNavigationProps) => {
  return (
    <nav className="w-full flex justify-center py-2 overflow-x-auto no-scrollbar" aria-label="Book chapters">
      <ul className="flex items-center space-x-3 md:space-x-6 px-4 py-1">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeChapterId;
          const isEnabled = true;

          return (
            <li key={chapter.id} className="flex items-center whitespace-nowrap">
              <button
                disabled={!isEnabled}
                onClick={() => isEnabled && onChapterSelect?.(chapter.id)}
                className={cn(
                  "flex items-center space-x-1.5 font-serif text-sm transition-all duration-300 relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-md px-2",
                  isActive
                    ? "text-accent font-bold"
                    : isEnabled
                    ? "text-primary/70 hover:text-primary cursor-pointer"
                    : "text-muted/40 cursor-not-allowed",
                )}
              >
                <span className={cn(
                  "text-[10px] font-mono px-1.5 py-0.2 rounded border",
                  isActive ? "border-accent bg-accent/15" : isEnabled ? "border-primary/20" : "border-muted/10"
                )}>
                  {String(chapter.number).padStart(2, "0")}
                </span>
                <span className="tracking-wide text-xs md:text-sm">
                  {chapter.shortTitle}
                </span>
              </button>
              
              {chapter.number < chapters.length && (
                <span className="ml-3 md:ml-6 text-secondary/60 font-light select-none text-xs" aria-hidden="true">
                  &bull;
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
