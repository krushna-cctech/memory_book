"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookCover } from "./BookCover";
import { ChapterNavigation } from "./ChapterNavigation";
import { BookProgress } from "./BookProgress";
import { Card } from "../ui/Card";
import { Container } from "../layout/Container";
import { Farewell } from "@/types/farewell";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { coverOpen } from "@/lib/animations";

// Chapter page layouts
import { BeginningPage } from "./chapters/BeginningPage";
import { JourneyTimeline } from "./chapters/JourneyTimeline";
import { MemoriesGrid } from "./chapters/MemoriesGrid";
import { PeopleMessages } from "./chapters/PeopleMessages";
import { InsideJokes } from "./chapters/InsideJokes";
import { GoodbyeLetter } from "./chapters/GoodbyeLetter";

interface BookShellProps {
  data: Farewell;
}

export const BookShell = ({ data }: BookShellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(data.chapters[0]?.id || "");
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const shouldReduceMotion = useReducedMotion();

  const activeChapter = data.chapters.find((c) => c.id === activeChapterId);
  const activeChapterNumber = activeChapter?.number || 1;

  const handleChapterSelect = (id: string) => {
    const nextIndex = data.chapters.findIndex((c) => c.id === id);
    const currentIndex = data.chapters.findIndex((c) => c.id === activeChapterId);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveChapterId(id);
  };

  const handleOpenBook = () => {
    setIsOpen(true);
  };

  // Directional slide transition variants for flipping pages
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full min-h-screen py-8 md:py-12 flex flex-col justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Render Cover Screen
          <motion.div
            key="cover"
            initial="closed"
            animate="closed"
            exit="open"
            variants={coverOpen(shouldReduceMotion)}
            className="w-full flex items-center justify-center px-4"
          >
            <BookCover data={data} onOpen={handleOpenBook} isOpen={isOpen} />
          </motion.div>
        ) : (
          // Render Book Interior Screen
          <motion.div
            key="interior"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center flex-grow z-10 px-4"
          >
            <Container className="flex-grow flex flex-col justify-between max-w-4xl">
              {/* Header Navigation Section */}
              <div className="w-full flex flex-col items-center space-y-3 mb-6">
                <ChapterNavigation
                  chapters={data.chapters}
                  activeChapterId={activeChapterId}
                  onChapterSelect={handleChapterSelect}
                />
                <BookProgress
                  totalChaptersCount={data.chapters.length}
                  currentChapterNumber={activeChapterNumber}
                />
              </div>

              {/* Main Chapter Pages Content */}
              <div className="flex-grow w-full flex items-center justify-center py-2">
                <Card variant="scrapbook" className="w-full max-w-2xl min-h-[480px] h-auto flex flex-col justify-between relative p-6 md:p-10 pb-16">
                  {/* Decorative binder rings for a physical book vibe */}
                  <div className="absolute -top-3 left-[15%] right-[15%] flex justify-between px-6 pointer-events-none select-none z-20" aria-hidden="true">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="w-3 h-7 bg-primary rounded-full border border-secondary shadow-sm" />
                    ))}
                  </div>

                  {/* Page number indicators */}
                  <div className="absolute top-6 left-6 font-mono text-[10px] text-muted/60 font-black select-none">
                    PAGE {String(activeChapterNumber).padStart(2, "0")}
                  </div>
                  <div className="absolute top-6 right-6 text-highlight font-bold text-sm select-none" aria-hidden="true">✦</div>

                  {/* Dynamic Page Content Slot with Horizontal Flip Motion */}
                  <div className="w-full flex flex-col flex-grow items-center justify-center mt-4">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      <motion.div
                        key={activeChapterId}
                        custom={direction}
                        variants={shouldReduceMotion ? {} : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 220, damping: 26 },
                          opacity: { duration: 0.25 },
                        }}
                        className="w-full flex flex-col flex-grow items-center justify-center"
                      >
                        {activeChapterId === "beginning" && data.beginning && (
                          <BeginningPage data={data.beginning} name={data.teammate.name} />
                        )}
                        
                        {activeChapterId === "journey" && data.timeline && (
                          <JourneyTimeline milestones={data.timeline} />
                        )}
                        
                        {activeChapterId === "memories" && data.memories && (
                          <MemoriesGrid memories={data.memories} />
                        )}
                        
                        {activeChapterId === "people" && data.messages && (
                          <PeopleMessages messages={data.messages} />
                        )}
                        
                        {activeChapterId === "inside-jokes" && data.jokes && (
                          <InsideJokes jokes={data.jokes} />
                        )}
                        
                        {activeChapterId === "goodbye" && data.letter && (
                          <GoodbyeLetter data={data.letter} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Bottom watermark */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center text-[9px] text-muted/50 font-serif tracking-widest uppercase select-none">
                    {data.teammate.name}&apos;s Memory Book
                  </div>
                </Card>
              </div>

              {/* Back to cover trigger */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-xs uppercase tracking-widest text-primary/60 hover:text-accent font-bold transition-all duration-300 underline cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-1.5 py-0.5"
                  aria-label="Back to cover page"
                >
                  &larr; Close & View Cover
                </button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
