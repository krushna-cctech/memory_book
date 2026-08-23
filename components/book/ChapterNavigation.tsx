import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Chapter } from "@/types/farewell";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const navRef = useRef<HTMLDivElement>(null);

  const currentIndex = chapters.findIndex((c) => c.id === activeChapterId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < chapters.length - 1;

  // Center active tab in scroll view
  const scrollActiveIntoView = (id: string) => {
    setTimeout(() => {
      const activeEl = document.getElementById(`nav-tab-${id}`);
      if (activeEl && navRef.current) {
        const navContainer = navRef.current;
        const scrollLeft = 
          activeEl.offsetLeft - 
          navContainer.offsetWidth / 2 + 
          activeEl.offsetWidth / 2;
        
        navContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  // Scroll active tab on mount or external changes
  useEffect(() => {
    if (activeChapterId) {
      scrollActiveIntoView(activeChapterId);
    }
  }, [activeChapterId]);

  const handlePrev = () => {
    if (hasPrev) {
      const prevChapter = chapters[currentIndex - 1];
      onChapterSelect?.(prevChapter.id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextChapter = chapters[currentIndex + 1];
      onChapterSelect?.(nextChapter.id);
    }
  };

  return (
    <div className="w-full max-w-full flex items-center justify-between px-1 relative select-none">
      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        disabled={!hasPrev}
        className={cn(
          "flex-shrink-0 p-1.5 rounded-full border border-secondary/50 bg-card/90 text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent shadow-sm",
          hasPrev 
            ? "hover:bg-secondary/20 hover:text-accent cursor-pointer active:scale-90" 
            : "opacity-25 cursor-not-allowed"
        )}
        aria-label="Previous chapter"
      >
        <ChevronLeft size={14} />
      </button>

      {/* Chapters list container */}
      <nav 
        ref={navRef}
        className="flex-grow max-w-[calc(100%-64px)] overflow-x-auto no-scrollbar scroll-smooth py-1.5 mx-2" 
        aria-label="Book chapters"
      >
        <ul className="flex items-center space-x-2 md:space-x-3 px-2 py-0.5 justify-start md:justify-center min-w-max">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeChapterId;
            const isEnabled = true;

            return (
              <li key={chapter.id} id={`nav-tab-${chapter.id}`} className="flex items-center whitespace-nowrap flex-shrink-0">
                <button
                  disabled={!isEnabled}
                  onClick={() => {
                    if (isEnabled) {
                      onChapterSelect?.(chapter.id);
                    }
                  }}
                  className={cn(
                    "flex items-center space-x-1.5 font-serif text-xs transition-all duration-300 relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-md px-2 border",
                    isActive
                      ? "text-accent font-bold bg-accent/5 border-accent/25 shadow-[1px_1px_2px_rgba(201,107,91,0.05)]"
                      : isEnabled
                      ? "text-primary/70 hover:text-primary cursor-pointer border-transparent"
                      : "text-muted/40 cursor-not-allowed border-transparent",
                  )}
                >
                  <span className={cn(
                    "text-[8px] font-mono px-1 rounded border",
                    isActive ? "border-accent bg-accent/15 text-accent" : isEnabled ? "border-primary/20 text-primary/60" : "border-muted/10"
                  )}>
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <span className="tracking-wide">
                    {chapter.shortTitle}
                  </span>
                </button>
                
                {chapter.number < chapters.length && (
                  <span className="ml-2 md:ml-3 text-secondary/35 font-light select-none text-[10px]" aria-hidden="true">
                    &bull;
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        disabled={!hasNext}
        className={cn(
          "flex-shrink-0 p-1.5 rounded-full border border-secondary/50 bg-card/90 text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent shadow-sm",
          hasNext 
            ? "hover:bg-secondary/20 hover:text-accent cursor-pointer active:scale-90" 
            : "opacity-25 cursor-not-allowed"
        )}
        aria-label="Next chapter"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
