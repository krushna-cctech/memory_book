"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BookCover } from "./BookCover";
import { ChapterNavigation } from "./ChapterNavigation";
import { BookProgress } from "./BookProgress";
import { Card } from "../ui/Card";
import { Container } from "../layout/Container";
import { Farewell } from "@/types/farewell";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Avatar } from "../avatar/Avatar";
import { AvatarFrame } from "../avatar/AvatarFrame";
import { HeartDoodle } from "../ui/Doodles";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Chapter page layouts
import { BeginningPage } from "./chapters/BeginningPage";
import { JourneyTimeline } from "./chapters/JourneyTimeline";
import { MemoriesGrid, MemoriesClosing } from "./chapters/MemoriesGrid";
import { PeopleMessages } from "./chapters/PeopleMessages";
import { InsideJokes } from "./chapters/InsideJokes";
import { GoodbyeLetter } from "./chapters/GoodbyeLetter";

interface BookShellProps {
  data: Farewell;
}

export const BookShell = ({ data }: BookShellProps) => {
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const [activeMobilePageIndex, setActiveMobilePageIndex] = useState(0);
  const [mobilePageDirection, setMobilePageDirection] = useState(1);
  const [activeChapterId, setActiveChapterId] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  // Audio trigger for realistic physical page-flip sound
  const playPageTurnSound = () => {
    try {
      const audio = new Audio("https://www.soundjay.com/misc/sounds/page-turn-3.mp3");
      audio.volume = 0.35;
      audio.play().catch((err) => {
        console.log("Audio play blocked by browser autoplay policy.");
      });
    } catch (err) {
      console.warn("Audio creation failed:", err);
    }
  };

  // Detect screen size and compute responsive scaling factor for desktop flipbook
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        // Target dimensions for full desktop spread including nav and margins
        const padWidth = 1240;
        const padHeight = 920;
        const scaleX = (window.innerWidth - 32) / padWidth;
        const scaleY = (window.innerHeight - 32) / padHeight;
        setScale(Math.min(scaleX, scaleY, 1.0));
      } else {
        setScale(1.0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation for page flipping (Arrow keys / PageUp / PageDown / Escape)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore keypresses inside inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        if (isMobile) {
          handleMobileNext();
        } else {
          handleNext();
        }
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        if (isMobile) {
          handleMobilePrev();
        } else {
          handlePrev();
        }
      } else if (event.key === "Escape") {
        if (isMobile) {
          setMobilePageDirection(-1);
          setActiveMobilePageIndex(0);
          syncMobileTab(0);
        } else {
          handleSpreadChange(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, activeSpreadIndex, activeMobilePageIndex]);

  // Synchronize tabs when user clicks a chapter link
  const handleChapterSelect = (id: string) => {
    setActiveChapterId(id);
    if (isMobile) {
      const pageMap: Record<string, number> = {
        beginning: 2,
        journey: 3,
        memories: 5,
        people: 10,
        "inside-jokes": 14,
        goodbye: 15,
      };
      if (pageMap[id] !== undefined) {
        setMobilePageDirection(pageMap[id] > activeMobilePageIndex ? 1 : -1);
        setActiveMobilePageIndex(pageMap[id]);
      }
    } else {
      const spreadMap: Record<string, number> = {
        beginning: 1,
        journey: 2,
        memories: 3,
        people: 6,
        "inside-jokes": 8,
        goodbye: 8,
      };
      if (spreadMap[id] !== undefined) {
        handleSpreadChange(spreadMap[id]);
      }
    }
  };

  // Sync state for desktop spread flipping
  const handleSpreadChange = (newSpread: number) => {
    setActiveSpreadIndex(newSpread);
    playPageTurnSound();
    if (newSpread === 0) {
      setActiveChapterId("cover");
    } else if (newSpread === 1) {
      setActiveChapterId("beginning");
    } else if (newSpread === 2) {
      setActiveChapterId("journey");
    } else if (newSpread >= 3 && newSpread <= 5) {
      setActiveChapterId("memories");
    } else if (newSpread === 6 || newSpread === 7) {
      setActiveChapterId("people");
    } else if (newSpread === 8) {
      setActiveChapterId((prev) => (prev === "goodbye" ? "goodbye" : "inside-jokes"));
    } else if (newSpread === 9) {
      setActiveChapterId("signatures");
    } else if (newSpread === 10) {
      setActiveChapterId("back-cover");
    }
  };

  // Next and Prev handlers
  const handleNext = () => {
    if (activeSpreadIndex < 10) {
      handleSpreadChange(activeSpreadIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeSpreadIndex > 0) {
      handleSpreadChange(activeSpreadIndex - 1);
    }
  };

  // Mobile page flipping
  const handleMobileNext = () => {
    if (activeMobilePageIndex < 17) {
      setMobilePageDirection(1);
      playPageTurnSound();
      setActiveMobilePageIndex((prev) => {
        const next = prev + 1;
        syncMobileTab(next);
        return next;
      });
    }
  };

  const handleMobilePrev = () => {
    if (activeMobilePageIndex > 0) {
      setMobilePageDirection(-1);
      playPageTurnSound();
      setActiveMobilePageIndex((prev) => {
        const next = prev - 1;
        syncMobileTab(next);
        return next;
      });
    }
  };

  const syncMobileTab = (page: number) => {
    if (page === 0) setActiveChapterId("cover");
    else if (page === 1) setActiveChapterId("dedication");
    else if (page === 2) setActiveChapterId("beginning");
    else if (page === 3 || page === 4) setActiveChapterId("journey");
    else if (page >= 5 && page <= 9) setActiveChapterId("memories");
    else if (page >= 10 && page <= 13) setActiveChapterId("people");
    else if (page === 14) setActiveChapterId("inside-jokes");
    else if (page === 15) setActiveChapterId("goodbye");
    else if (page === 16) setActiveChapterId("signatures");
    else if (page === 17) setActiveChapterId("back-cover");
  };

  // Z-indexing and rotation calculations for sheets (Desktop)
  const getSheetStyle = (index: number) => {
    const isFlipped = index < activeSpreadIndex;
    let rotation = isFlipped ? -180 : 0;

    // Subtle 3D page corner lift on margin hover
    if (!shouldReduceMotion) {
      if (index === activeSpreadIndex - 1 && isLeftHovered) {
        rotation = -172;
      } else if (index === activeSpreadIndex && isRightHovered) {
        rotation = -8;
      }
    }

    const zIndex = isFlipped ? index : 20 - index;
    return {
      transform: `rotateY(${rotation}deg)`,
      zIndex: zIndex,
    };
  };

  // Determine active chapter progress number
  let currentChapterNumber = 1;
  if (isMobile) {
    if (activeMobilePageIndex === 2) currentChapterNumber = 1;
    else if (activeMobilePageIndex === 3 || activeMobilePageIndex === 4) currentChapterNumber = 2;
    else if (activeMobilePageIndex >= 5 && activeMobilePageIndex <= 9) currentChapterNumber = 3;
    else if (activeMobilePageIndex >= 10 && activeMobilePageIndex <= 13) currentChapterNumber = 4;
    else if (activeMobilePageIndex === 14) currentChapterNumber = 5;
    else if (activeMobilePageIndex >= 15) currentChapterNumber = 6;
  } else {
    if (activeSpreadIndex === 1) currentChapterNumber = 1;
    else if (activeSpreadIndex === 2) currentChapterNumber = 2;
    else if (activeSpreadIndex >= 3 && activeSpreadIndex <= 5) currentChapterNumber = 3;
    else if (activeSpreadIndex === 6 || activeSpreadIndex === 7) currentChapterNumber = 4;
    else if (activeSpreadIndex === 8) currentChapterNumber = activeChapterId === "goodbye" ? 6 : 5;
    else if (activeSpreadIndex >= 9) currentChapterNumber = 6;
  }

  // Mobile Page Transition Variants (Folding page-curl look)
  const mobilePageVariants = {
    initial: (dir: number) => ({
      rotateY: dir > 0 ? 70 : -70,
      opacity: 0,
      transformOrigin: "left center"
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: "left center",
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -70 : 70,
      opacity: 0,
      transformOrigin: "left center",
      transition: { duration: 0.45, ease: "easeIn" }
    })
  };

  // Sheets data mapping (Desktop - 10 sheets total)
  const sheets = [
    // Sheet 0: Front Cover & Dedication
    {
      front: <BookCover data={data} onOpen={() => handleSpreadChange(1)} isOpen={activeSpreadIndex > 0} />,
      back: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 md:p-10 space-y-6 relative border-r border-secondary/15 select-none bg-card">
          <div className="font-serif text-xs tracking-[0.25em] text-accent uppercase font-black">
            Dedication Page
          </div>
          <AvatarFrame variant="antique" className="w-28 h-28 md:w-32 md:h-32">
            <Avatar src={data.teammate.avatar} name={data.teammate.name} size="xl" />
          </AvatarFrame>
          <div className="space-y-1.5">
            <h2 className="font-serif text-xl md:text-2xl font-black text-primary uppercase tracking-wide">
              {data.teammate.name}
            </h2>
            <p className="font-serif text-xs text-accent font-bold tracking-wider uppercase">
              {data.teammate.role}
            </p>
            {data.teammate.department && (
              <p className="font-mono text-[9px] text-muted/60 uppercase">
                {data.teammate.department} Department
              </p>
            )}
          </div>
          <div className="w-16 h-[1px] bg-secondary/50" />
          <p className="font-serif text-xs md:text-sm text-primary/80 max-w-sm leading-relaxed italic px-6">
            &ldquo;{data.teammate.shortIntro}&rdquo;
          </p>
          <HeartDoodle className="absolute bottom-8 right-8 text-accent/35" size={28} />
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
        </div>
      )
    },
    // Sheet 1: Chapter 1 (Beginning) & Chapter 2 (Journey Part 1 - Left Page)
    {
      front: data.beginning ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <BeginningPage data={data.beginning} name={data.teammate.name} />
        </div>
      ) : null,
      back: data.timeline ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <JourneyTimeline milestones={data.timeline} part="left" />
        </div>
      ) : null
    },
    // Sheet 2: Chapter 2 (Journey Part 2 - Right Page) & Chapter 3 (Memories Page 1 - Left Page)
    {
      front: data.timeline ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <JourneyTimeline milestones={data.timeline} part="right" />
        </div>
      ) : null,
      back: data.memories ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <MemoriesGrid page={1} memories={data.memories} />
        </div>
      ) : null
    },
    // Sheet 3: Chapter 3 (Memories Page 2 - Right Page) & Chapter 3 (Memories Page 3 - Left Page)
    {
      front: data.memories ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <MemoriesGrid page={2} memories={data.memories} />
        </div>
      ) : null,
      back: data.memories ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <MemoriesGrid page={3} memories={data.memories} />
        </div>
      ) : null
    },
    // Sheet 4: Chapter 3 (Memories Page 4 - Right Page) & Chapter 3 (Memories Page 5 - Left Page)
    {
      front: data.memories ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <MemoriesGrid page={4} memories={data.memories} />
        </div>
      ) : null,
      back: data.memories ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <MemoriesGrid page={5} memories={data.memories} />
        </div>
      ) : null
    },
    // Sheet 5: Chapter 3 Scrapbook Closing (Right Page) & Chapter 4 (People Message 1 - Left Page)
    {
      front: (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <MemoriesClosing />
        </div>
      ),
      back: data.messages && data.messages[0] ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <PeopleMessages message={data.messages[0]} index={0} total={data.messages.length} />
        </div>
      ) : null
    },
    // Sheet 6: Chapter 4 (People Message 2 - Right Page) & Chapter 4 (People Message 3 - Left Page)
    {
      front: data.messages && data.messages[1] ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <PeopleMessages message={data.messages[1]} index={1} total={data.messages.length} />
        </div>
      ) : null,
      back: data.messages && data.messages[2] ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <PeopleMessages message={data.messages[2]} index={2} total={data.messages.length} />
        </div>
      ) : null
    },
    // Sheet 7: Chapter 4 (People Message 4 - Right Page) & Chapter 5 (Inside Jokes - Left Page)
    {
      front: data.messages && data.messages[3] ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <PeopleMessages message={data.messages[3]} index={3} total={data.messages.length} />
        </div>
      ) : null,
      back: data.jokes ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <InsideJokes jokes={data.jokes} />
        </div>
      ) : null
    },
    // Sheet 8: Chapter 6 (Goodbye Letter - Right Page) & Guestbook Signatures (Left Page)
    {
      front: data.letter ? (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <GoodbyeLetter data={data.letter} hideSignatures={true} />
        </div>
      ) : null,
      back: (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <div className="flex flex-col h-full justify-between relative">
            <div className="text-center pt-2">
              <h3 className="font-handwritten text-2xl md:text-3xl text-accent rotate-[-1deg] font-bold">
                With Love & Gratitude
              </h3>
              <p className="font-serif text-[10px] md:text-xs text-muted/50 uppercase tracking-widest mt-1">
                Your Teammates&apos; Signatures
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-y-4 gap-x-4 py-4 px-2 flex-grow items-center justify-center select-none">
              {data.letter?.signatures.map((sig, idx) => {
                const tilts = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[4deg]", "rotate-[-2deg]", "rotate-[1deg]"];
                const colors = ["text-accent", "text-primary", "text-[#4A6B53]", "text-[#C98A5B]"];
                return (
                  <span
                    key={idx}
                    className={`font-handwritten text-base md:text-lg font-black text-center ${tilts[idx % tilts.length]} ${colors[idx % colors.length]} hover:scale-110 transition-transform duration-200 cursor-default`}
                  >
                    {sig}
                  </span>
                );
              })}
            </div>

            <div className="text-center pb-1 text-[9px] text-muted/40 font-mono">
              ✦ MAY YOUR NEXT CHAPTER BE EXTRAORDINARY ✦
            </div>
          </div>
        </div>
      )
    },
    // Sheet 9: Album Epilogue & Back Leather Cover
    {
      front: (
        <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
          <div className="flex flex-col h-full justify-between items-center text-center relative py-6">
            <div className="space-y-2">
              <div className="font-serif text-xs tracking-[0.25em] text-accent uppercase font-black">
                ✦ Final Reflection ✦
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-black text-primary uppercase tracking-wide">
                To New Beginnings
              </h3>
              <p className="font-serif text-xs text-muted/60 uppercase tracking-widest">
                The Next Great Adventure
              </p>
            </div>

            <div className="my-4 max-w-sm p-6 bg-secondary/10 border border-secondary/30 rounded-2xl relative shadow-sm">
              <p className="font-handwritten text-lg md:text-xl text-primary font-bold leading-relaxed">
                &ldquo;Thank you for being such an unforgettable part of our team story. Wishing you joy, immense success, and boundless inspiration wherever your path leads next!&rdquo;
              </p>
              <div className="mt-3 font-serif text-[10px] uppercase tracking-widest text-accent font-black">
                ✦ Forever Part of the CCTech Family ✦
              </div>
            </div>

            <div className="text-[10px] text-muted/40 font-mono">
              ✦ CCTECH AEC &bull; 2024 – 2026 ✦
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#3E2B20] text-card select-none rounded-l-md border-r border-secondary/15 relative">
          {/* Spine shadow overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
          <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 text-3xl">
            📖
          </div>
          <h2 className="font-serif text-xl font-black uppercase tracking-widest text-[#FAF0D7]">
            Memory Book
          </h2>
          <p className="font-serif text-xs text-muted/40 uppercase tracking-[0.2em] mt-1.5">
            End of Album
          </p>
        </div>
      )
    }
  ];

  // Mobile Single-Pages Array (18 pages: 0 to 17)
  const mobilePages = [
    // Page 0: Cover
    <BookCover key="cover" data={data} onOpen={() => { setMobilePageDirection(1); setActiveMobilePageIndex(1); syncMobileTab(1); }} isOpen={activeMobilePageIndex > 0} />,
    // Page 1: Dedication
    <Card variant="scrapbook" key="dedication" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8">
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-4">
        <div className="font-serif text-[11px] tracking-[0.25em] text-accent uppercase font-black">
          Dedication
        </div>
        <AvatarFrame variant="antique" className="w-28 h-28">
          <Avatar src={data.teammate.avatar} name={data.teammate.name} size="lg" />
        </AvatarFrame>
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-black text-primary uppercase tracking-wide">
            {data.teammate.name}
          </h2>
          <p className="font-serif text-xs text-accent font-bold tracking-wider uppercase">
            {data.teammate.role}
          </p>
        </div>
        <div className="w-14 h-[1px] bg-secondary/50" />
        <p className="font-serif text-xs md:text-sm text-primary/80 max-w-xs leading-relaxed italic px-4">
          &ldquo;{data.teammate.shortIntro}&rdquo;
        </p>
      </div>
      <div className="text-center text-[9px] font-mono text-muted/30">PAGE 01</div>
    </Card>,
    // Page 2: Beginning
    <Card variant="scrapbook" key="beginning" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.beginning && <BeginningPage data={data.beginning} name={data.teammate.name} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 02</div>
    </Card>,
    // Page 3: Journey Part 1
    <Card variant="scrapbook" key="journey-1" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.timeline && <JourneyTimeline milestones={data.timeline} part="left" />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 03</div>
    </Card>,
    // Page 4: Journey Part 2
    <Card variant="scrapbook" key="journey-2" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.timeline && <JourneyTimeline milestones={data.timeline} part="right" />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 04</div>
    </Card>,
    // Page 5: Memories Page 1 (#01, #02)
    <Card variant="scrapbook" key="memories-1" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.memories && <MemoriesGrid page={1} memories={data.memories} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 05</div>
    </Card>,
    // Page 6: Memories Page 2 (#03, #04)
    <Card variant="scrapbook" key="memories-2" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.memories && <MemoriesGrid page={2} memories={data.memories} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 06</div>
    </Card>,
    // Page 7: Memories Page 3 (#05, #06)
    <Card variant="scrapbook" key="memories-3" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.memories && <MemoriesGrid page={3} memories={data.memories} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 07</div>
    </Card>,
    // Page 8: Memories Page 4 (#07, #08)
    <Card variant="scrapbook" key="memories-4" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.memories && <MemoriesGrid page={4} memories={data.memories} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 08</div>
    </Card>,
    // Page 9: Memories Page 5 (#09)
    <Card variant="scrapbook" key="memories-5" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.memories && <MemoriesGrid page={5} memories={data.memories} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 09</div>
    </Card>,
    // Page 10: People Message 1 (Pratik Patil)
    <Card variant="scrapbook" key="people-1" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.messages && data.messages[0] && (
        <PeopleMessages message={data.messages[0]} index={0} total={data.messages.length} />
      )}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 10</div>
    </Card>,
    // Page 11: People Message 2 (Pradnya Jawale)
    <Card variant="scrapbook" key="people-2" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.messages && data.messages[1] && (
        <PeopleMessages message={data.messages[1]} index={1} total={data.messages.length} />
      )}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 11</div>
    </Card>,
    // Page 12: People Message 3 (Sagar Ladawa)
    <Card variant="scrapbook" key="people-3" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.messages && data.messages[2] && (
        <PeopleMessages message={data.messages[2]} index={2} total={data.messages.length} />
      )}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 12</div>
    </Card>,
    // Page 13: People Message 4 (Alex Rivers)
    <Card variant="scrapbook" key="people-4" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.messages && data.messages[3] && (
        <PeopleMessages message={data.messages[3]} index={3} total={data.messages.length} />
      )}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 13</div>
    </Card>,
    // Page 14: Inside Jokes
    <Card variant="scrapbook" key="jokes" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.jokes && <InsideJokes jokes={data.jokes} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 14</div>
    </Card>,
    // Page 15: Goodbye Letter
    <Card variant="scrapbook" key="goodbye" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
      {data.letter && <GoodbyeLetter data={data.letter} hideSignatures={true} />}
      <div className="text-center text-[9px] font-mono text-muted/30 mt-4">PAGE 15</div>
    </Card>,
    // Page 16: Signatures
    <Card variant="scrapbook" key="signatures" className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8">
      <div className="flex flex-col h-full justify-between relative">
        <div className="text-center pt-2">
          <h3 className="font-handwritten text-2xl text-accent rotate-[-1deg] font-bold">
            With Love & Gratitude
          </h3>
          <p className="font-serif text-[10px] text-muted/50 uppercase tracking-widest mt-1">
            Signatures
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-4 flex-grow items-center justify-center select-none">
          {data.letter?.signatures.map((sig, idx) => {
            const tilts = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[4deg]"];
            const colors = ["text-accent", "text-primary", "text-[#4A6B53]", "text-[#C98A5B]"];
            return (
              <span
                key={idx}
                className={`font-handwritten text-base font-black text-center ${tilts[idx % tilts.length]} ${colors[idx % colors.length]}`}
              >
                {sig}
              </span>
            );
          })}
        </div>
        <div className="text-center text-[9px] font-mono text-muted/30">PAGE 16</div>
      </div>
    </Card>,
    // Page 17: Back Cover Closed
    <div key="back-cover" className="w-full min-h-[580px] flex flex-col items-center justify-center text-center p-8 bg-[#3E2B20] text-card select-none rounded-lg shadow-xl border-4 border-double border-primary/40">
      <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 text-3xl">
        📖
      </div>
      <h2 className="font-serif text-lg font-black uppercase tracking-widest text-[#FAF0D7]">
        Memory Book
      </h2>
      <p className="font-serif text-[10px] text-muted/40 uppercase tracking-[0.2em] mt-1">
        End of Album
      </p>
      <button 
        onClick={() => { setMobilePageDirection(-1); setActiveMobilePageIndex(0); syncMobileTab(0); }}
        className="mt-8 font-serif text-[11px] uppercase tracking-wider text-accent border border-accent/30 rounded px-5 py-2 hover:bg-accent/10 transition-colors cursor-pointer"
      >
        Go to Cover
      </button>
    </div>
  ];

  return (
    <div className="relative w-full min-h-screen py-4 flex flex-col justify-center items-center overflow-hidden bg-[#FAF6EE] paper-grain">
      {isMobile ? (
        /* --- MOBILE VIEW (renders direct, non-scaled layout) --- */
        <Container className="flex-grow flex flex-col justify-between max-w-lg z-10 px-4 py-4 min-h-[100svh] relative">
          
          {/* Mobile Top Header Navigation */}
          <div className={cn(
            "w-full flex flex-col items-center space-y-3 mb-4 transition-all duration-500",
            activeMobilePageIndex > 0 && activeMobilePageIndex < 17 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden mb-0"
          )}>
            <ChapterNavigation
              chapters={data.chapters}
              activeChapterId={activeChapterId}
              onChapterSelect={handleChapterSelect}
            />
            <BookProgress
              totalChaptersCount={data.chapters.length}
              currentChapterNumber={currentChapterNumber}
            />
          </div>

          {/* Mobile main viewport */}
          <div className="flex-grow w-full flex items-center justify-center py-2 relative">
            <div className="w-full max-w-lg mx-auto overflow-hidden relative min-h-[600px] flex items-center justify-center">
              <AnimatePresence initial={false} custom={mobilePageDirection} mode="wait">
                <motion.div
                  key={activeMobilePageIndex}
                  custom={mobilePageDirection}
                  variants={mobilePageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full preserve-3d"
                >
                  {mobilePages[activeMobilePageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Bottom controls */}
          {activeMobilePageIndex > 0 && (
            <div className="mt-4 flex items-center justify-between w-full max-w-sm mx-auto px-2 z-20 select-none">
              <button
                onClick={handleMobilePrev}
                className="font-serif text-xs uppercase tracking-wider text-primary/60 hover:text-accent font-black transition-colors cursor-pointer"
              >
                &larr; Prev
              </button>
              
              <button
                onClick={() => { setMobilePageDirection(-1); setActiveMobilePageIndex(0); syncMobileTab(0); }}
                className="font-serif text-[11px] uppercase tracking-wider text-primary/40 hover:text-accent font-bold transition-all duration-300 underline cursor-pointer"
              >
                Close Cover
              </button>

              <button
                onClick={handleMobileNext}
                className="font-serif text-xs uppercase tracking-wider text-primary/60 hover:text-accent font-black transition-colors cursor-pointer"
                disabled={activeMobilePageIndex === 17}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </Container>
      ) : (
        /* --- DESKTOP VIEW (wrapped in a scaled container) --- */
        <div 
          className="flex flex-col justify-between items-center w-[1240px] h-[920px] transition-transform duration-300 origin-center select-none py-2"
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            marginTop: `${((scale - 1) * 920) / 2}px`,
            marginBottom: `${((scale - 1) * 920) / 2}px`,
            marginLeft: `${((scale - 1) * 1240) / 2}px`,
            marginRight: `${((scale - 1) * 1240) / 2}px`,
          }}
        >
          {/* Top Header Navigation Section (Only shown when book is open) */}
          <div className={cn(
            "w-full flex flex-col items-center space-y-3 mb-2 transition-all duration-500",
            activeSpreadIndex > 0 && activeSpreadIndex < 10 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden mb-0"
          )}>
            <ChapterNavigation
              chapters={data.chapters}
              activeChapterId={activeChapterId}
              onChapterSelect={handleChapterSelect}
            />
            <BookProgress
              totalChaptersCount={data.chapters.length}
              currentChapterNumber={currentChapterNumber}
            />
          </div>

          {/* Main interactive 3D Book Viewport */}
          <div className="flex-grow w-full flex items-center justify-center relative">
            <div 
              className={cn(
                "relative w-[1160px] h-[740px] transition-transform duration-[850ms] ease-in-out preserve-3d",
                activeSpreadIndex === 0 
                  ? "translate-x-[-25%]" 
                  : activeSpreadIndex === 10 
                  ? "translate-x-[25%]" 
                  : "translate-x-0"
              )}
            >
              {/* 1. Physical leather back cover boards lying flat */}
              <div 
                className={cn(
                  "absolute top-[-7px] left-[-7px] w-[50.6%] h-[754px] bg-[#422F24] border-2 border-[#2E2018] rounded-l-xl shadow-2xl transition-all duration-[850ms] ease-in-out -z-30 origin-right overflow-hidden",
                  activeSpreadIndex === 0 ? "opacity-0 scale-95" : "opacity-100 scale-100"
                )}
              >
                {/* Vintage Gold Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-[#D4AF37]/60 rounded-tl-md pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-[#D4AF37]/60 rounded-bl-md pointer-events-none" />
              </div>
              <div 
                className={cn(
                  "absolute top-[-7px] right-[-7px] w-[50.6%] h-[754px] bg-[#422F24] border-2 border-[#2E2018] rounded-r-xl shadow-2xl transition-all duration-[850ms] ease-in-out -z-30 origin-left overflow-hidden",
                  activeSpreadIndex === 10 ? "opacity-0 scale-95" : "opacity-100 scale-100"
                )}
              >
                {/* Vintage Gold Corners */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-[#D4AF37]/60 rounded-tr-md pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-[#D4AF37]/60 rounded-br-md pointer-events-none" />
              </div>

              {/* 2. Paper stacked edge thickness templates */}
              {/* Left side thickness */}
              <div 
                className={cn(
                  "absolute top-0 left-0 w-1/2 h-full bg-card border-l-4 border-y border-secondary/40 rounded-l transition-all duration-[850ms] -z-10",
                  activeSpreadIndex <= 1 ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                )}
                style={{
                  boxShadow: "inset -1px 0 3px rgba(0,0,0,0.05), -2px 2px 4px rgba(91,70,54,0.1), -3px 3px 0px #FAF8F5, -6px 6px 0px #E7DEC6"
                }}
              />
              {/* Right side thickness */}
              <div 
                className={cn(
                  "absolute top-0 right-0 w-1/2 h-full bg-card border-r-4 border-y border-secondary/40 rounded-r transition-all duration-[850ms] -z-10",
                  activeSpreadIndex >= 9 ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
                )}
                style={{
                  boxShadow: "inset 1px 0 3px rgba(0,0,0,0.05), 2px 2px 4px rgba(91,70,54,0.1), 3px 3px 0px #FAF8F5, 6px 6px 0px #E7DEC6"
                }}
              />

              {/* 3. Render 3D physical sheets */}
              {sheets.map((sheet, index) => (
                <div
                  key={index}
                  className="absolute top-0 left-1/2 w-1/2 h-full origin-left preserve-3d transition-transform duration-[850ms] ease-in-out"
                  style={getSheetStyle(index)}
                >
                  {/* Front Face (Facing right initially) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-card border-l border-secondary/20 shadow-inner p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar rounded-r-sm">
                    {sheet.front}
                    {index > 0 && index < 9 && (
                      <div className="absolute bottom-4 right-6 text-[10px] text-muted/30 font-mono select-none">
                        PAGE {String(index * 2).padStart(2, "0")}
                      </div>
                    )}
                  </div>

                  {/* Back Face (Facing left when sheet is flipped) */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden bg-card border-r border-secondary/20 shadow-inner p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar rounded-l-sm"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    {sheet.back}
                    {index >= 0 && index < 9 && (
                      <div className="absolute bottom-4 left-6 text-[10px] text-muted/30 font-mono select-none">
                        PAGE {String(index * 2 + 1).padStart(2, "0")}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* 4. Book spine and central shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-[#2A1E17] shadow-inner z-20 book-spine-shadow pointer-events-none" />

              {/* 5. Clickable margins overlays for quick 3D flipping */}
              {/* Left page margin click */}
              {activeSpreadIndex > 0 && (
                <div 
                  className="absolute top-0 left-0 w-[14%] h-full z-30 cursor-w-resize group preserve-3d"
                  style={{ transform: "translateZ(50px)" }}
                  onClick={() => {
                    handlePrev();
                    setIsLeftHovered(false);
                  }}
                  onMouseEnter={() => setIsLeftHovered(true)}
                  onMouseLeave={() => setIsLeftHovered(false)}
                  title="Previous Page"
                >
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-card/90 border border-secondary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ChevronLeft size={16} className="text-primary" />
                  </div>
                </div>
              )}
              {/* Right page margin click */}
              {activeSpreadIndex < 10 && (
                <div 
                  className="absolute top-0 right-0 w-[14%] h-full z-30 cursor-e-resize group preserve-3d"
                  style={{ transform: "translateZ(50px)" }}
                  onClick={() => {
                    handleNext();
                    setIsRightHovered(false);
                  }}
                  onMouseEnter={() => setIsRightHovered(true)}
                  onMouseLeave={() => setIsRightHovered(false)}
                  title="Next Page"
                >
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-card/90 border border-secondary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ChevronRight size={16} className="text-primary" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Pagination Control Section */}
          {activeSpreadIndex > 0 && (
            <div className="mt-2 flex items-center justify-between w-full max-w-lg px-4 z-20 select-none">
              <button
                onClick={handlePrev}
                className="font-serif text-xs uppercase tracking-wider text-primary/60 hover:text-accent font-black transition-all duration-300 cursor-pointer flex items-center space-x-1"
              >
                &larr; Prev Spread
              </button>
              
              <button
                onClick={() => handleSpreadChange(0)}
                className="font-serif text-[11px] uppercase tracking-wider text-primary/40 hover:text-accent font-bold transition-all duration-300 underline cursor-pointer"
              >
                Close Cover
              </button>

              <button
                onClick={handleNext}
                className="font-serif text-xs uppercase tracking-wider text-primary/60 hover:text-accent font-black transition-all duration-300 cursor-pointer flex items-center space-x-1"
                disabled={activeSpreadIndex === 10}
              >
                Next Spread &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

