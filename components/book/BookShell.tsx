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
import { HeartDoodle, SparklesDoodle } from "../ui/Doodles";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Chapter page layouts
import { BeginningPage } from "./chapters/BeginningPage";
import { JourneyTimeline } from "./chapters/JourneyTimeline";
import { MemoriesGrid, MemoriesClosing } from "./chapters/MemoriesGrid";
import { PeopleMessages } from "./chapters/PeopleMessages";
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

  // Epilogue / Reflection component used when an extra balance page is needed
  const FinalReflectionPage = () => (
    <div className="flex flex-col h-full justify-between items-center text-center relative py-6 select-none">
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
  );

  // 1. Build all inside pages dynamically (from Dedication to Signatures)
  const baseInsidePages: { id: string; chapter: string; chapterNum: number; content: React.ReactNode }[] = [
    // Page: Dedication
    {
      id: "dedication",
      chapter: "dedication",
      chapterNum: 1,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 md:p-10 space-y-6 relative select-none bg-card">
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
        </div>
      )
    },
    // Page: Beginning
    ...(data.beginning ? [{
      id: "beginning",
      chapter: "beginning",
      chapterNum: 1,
      content: <BeginningPage data={data.beginning} name={data.teammate.name} />
    }] : []),
    // Pages: Journey Part 1 & 2
    ...(data.timeline ? [
      {
        id: "journey-1",
        chapter: "journey",
        chapterNum: 2,
        content: <JourneyTimeline milestones={data.timeline} part="left" />
      },
      {
        id: "journey-2",
        chapter: "journey",
        chapterNum: 2,
        content: <JourneyTimeline milestones={data.timeline} part="right" />
      }
    ] : []),
    // Pages: Chapter 3 Scrapbook Memories
    ...(data.memories ? [
      {
        id: "memories-1",
        chapter: "memories",
        chapterNum: 3,
        content: <MemoriesGrid page={1} memories={data.memories} />
      },
      {
        id: "memories-2",
        chapter: "memories",
        chapterNum: 3,
        content: <MemoriesGrid page={2} memories={data.memories} />
      },
      {
        id: "memories-3",
        chapter: "memories",
        chapterNum: 3,
        content: <MemoriesGrid page={3} memories={data.memories} />
      },
      {
        id: "memories-4",
        chapter: "memories",
        chapterNum: 3,
        content: <MemoriesGrid page={4} memories={data.memories} />
      },
      {
        id: "memories-5",
        chapter: "memories",
        chapterNum: 3,
        content: <MemoriesGrid page={5} memories={data.memories} />
      },
      {
        id: "memories-closing",
        chapter: "memories",
        chapterNum: 3,
        content: <MemoriesClosing />
      }
    ] : []),
    // Pages: Chapter 4 People Messages (Every single message gets 1 full page!)
    ...(data.messages || []).map((msg, idx) => ({
      id: `people-${idx + 1}`,
      chapter: "people",
      chapterNum: 4,
      content: (
        <PeopleMessages
          message={msg}
          index={idx}
          total={data.messages?.length || 1}
        />
      )
    })),
    // If messages count is odd, add Chapter 4 Closing Reflection so Chapter 4 ends cleanly on an even page, allowing Chapter 5 (Goodbye Envelope) to start on the LEFT page of a fresh spread!
    ...((data.messages?.length || 0) % 2 !== 0 ? [{
      id: "people-closing",
      chapter: "people",
      chapterNum: 4,
      content: (
        <div className="relative w-full max-w-xl mx-auto py-1 flex flex-col justify-between h-full select-none text-left">
          <div>
            <div className="mb-4 border-b border-secondary/30 pb-2.5">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
                Chapter 04 &bull; Reflections
              </span>
              <h2 className="font-serif text-lg md:text-xl font-black text-primary tracking-wide mt-0.5">
                To Our Dear Teammate &amp; Friend
              </h2>
              <p className="font-serif text-xs md:text-sm text-primary/70 italic mt-0.5">
                “Every message a testimony of how much you brought to our everyday work.”
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-5 sm:p-6 bg-[#FAF2DE] border-2 border-[#E8C96A]/60 rounded-2xl relative shadow-sm">
                <div className="flex items-center space-x-2 text-accent mb-3">
                  <SparklesDoodle size={20} />
                  <span className="font-serif text-xs uppercase tracking-widest font-black text-[#6B4E2E]">
                    A Team United in Warm Wishes
                  </span>
                </div>
                
                <div className="space-y-3 font-handwritten text-[15px] sm:text-base md:text-[16px] text-[#4A3728] font-bold leading-relaxed">
                  <p>
                    &ldquo;Two years may not sound like a very long time, but you’ve managed to leave behind a lot of great memories. From taking ownership of every responsibility to happily stepping up whenever there was an event to host, you’ve always been someone the team could count on. And then there were the Fun Fridays where somehow you managed to come up with something new and creative every month and gave us all a reason to forget about work for a while! 😄
                  </p>
                  <p>
                    You brought a lot of positivity, energy, and warmth to the team, and your presence will definitely be missed. Thank you for all the little moments, the laughs, the fun, and for simply being you. We’re really glad we got to share these two years with you. ❤️
                  </p>
                  <p>
                    Keep smiling, keep creating, and please don’t stop organizing Fun Fridays wherever you go! 😄✨&rdquo;
                  </p>
                </div>

                <div className="text-right font-serif text-[11px] uppercase tracking-wider text-[#6B4E2E] font-bold mt-4 pt-2 border-t border-[#E8C96A]/30">
                  ✦ Always Your Friends at AEC ✦
                </div>
              </div>
            </div>
          </div>

          <div className="text-right pt-2.5 pr-2 text-[10px] md:text-xs font-serif text-accent/80 italic select-none">
            Turn page for the Team Letter &rarr;
          </div>
        </div>
      )
    }] : []),
    // Page: Chapter 5 Goodbye Letter (Now on the LEFT page of Spread 12!)
    ...(data.letter ? [{
      id: "goodbye",
      chapter: "goodbye",
      chapterNum: 5,
      content: <GoodbyeLetter data={data.letter} hideSignatures={true} />
    }] : []),
    // Page: Signatures & Reflections (Now on the RIGHT page of Spread 12!)
    {
      id: "signatures",
      chapter: "signatures",
      chapterNum: 5,
      content: (
        <div className="flex flex-col h-full justify-between relative select-none">
          <div className="text-center pt-2">
            <h3 className="font-handwritten text-2xl md:text-3xl text-accent rotate-[-1deg] font-bold">
              With Love & Gratitude
            </h3>
            <p className="font-serif text-[10px] md:text-xs text-muted/50 uppercase tracking-widest mt-1">
              Your Teammates&apos; Signatures
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-y-4 gap-x-4 py-4 px-2 flex-grow items-center justify-center">
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
      )
    }
  ];

  // If insidePages count is even, append Final Reflection page so count is odd for perfect sheet balance
  const insidePages = baseInsidePages.length % 2 === 0
    ? [
        ...baseInsidePages.slice(0, baseInsidePages.length - 1),
        {
          id: "final-reflection",
          chapter: "signatures",
          chapterNum: 5,
          content: <FinalReflectionPage />
        },
        baseInsidePages[baseInsidePages.length - 1]
      ]
    : baseInsidePages;

  // Compute total physical sheets (Sheet 0 to Sheet N-1)
  // Sheet 0: Front = Cover, Back = insidePages[0]
  // Sheet k: Front = insidePages[2k-1], Back = insidePages[2k]
  // Sheet Last: Front = insidePages[last], Back = Back Leather Cover
  const totalSheetsCount = Math.floor((insidePages.length + 1) / 2);
  const totalSpreadsCount = totalSheetsCount + 1;
  const maxSpreadIndex = totalSpreadsCount - 1;
  const maxMobilePageIndex = insidePages.length + 1;

  // Chapter Navigation Page Map (Dynamic)
  const getChapterTarget = (chapterKey: string) => {
    const pageIndex = insidePages.findIndex((p) => p.chapter === chapterKey);
    if (pageIndex === -1) return { mobile: 1, spread: 1 };
    const mobile = pageIndex + 1; // mobile 0 is cover
    const spread = Math.floor((mobile + 1) / 2);
    return { mobile, spread };
  };

  // Synchronize tabs when user clicks a chapter link
  const handleChapterSelect = (id: string) => {
    setActiveChapterId(id);
    const target = getChapterTarget(id);
    if (isMobile) {
      setMobilePageDirection(target.mobile > activeMobilePageIndex ? 1 : -1);
      setActiveMobilePageIndex(target.mobile);
    } else {
      handleSpreadChange(target.spread);
    }
  };

  // Sync state for desktop spread flipping
  const handleSpreadChange = (newSpread: number) => {
    setActiveSpreadIndex(newSpread);
    playPageTurnSound();
    if (newSpread === 0) {
      setActiveChapterId("cover");
    } else if (newSpread === maxSpreadIndex) {
      setActiveChapterId("back-cover");
    } else {
      // Find chapter for this spread
      const rightPageIndex = newSpread * 2 - 1;
      const pageData = insidePages[rightPageIndex - 1] || insidePages[rightPageIndex - 2];
      if (pageData) {
        setActiveChapterId(pageData.chapter);
      }
    }
  };

  // Next and Prev handlers
  const handleNext = () => {
    if (activeSpreadIndex < maxSpreadIndex) {
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
    if (activeMobilePageIndex < maxMobilePageIndex) {
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
    else if (page === maxMobilePageIndex) setActiveChapterId("back-cover");
    else {
      const pageData = insidePages[page - 1];
      if (pageData) setActiveChapterId(pageData.chapter);
    }
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

    const zIndex = isFlipped ? index : 30 - index;
    return {
      transform: `rotateY(${rotation}deg)`,
      zIndex: zIndex,
    };
  };

  // Determine active chapter progress number
  let currentChapterNumber = 1;
  if (isMobile) {
    if (activeMobilePageIndex > 0 && activeMobilePageIndex <= insidePages.length) {
      currentChapterNumber = insidePages[activeMobilePageIndex - 1]?.chapterNum || 1;
    } else if (activeMobilePageIndex > insidePages.length) {
      currentChapterNumber = 5;
    }
  } else {
    if (activeSpreadIndex > 0 && activeSpreadIndex < maxSpreadIndex) {
      const rightPageIndex = activeSpreadIndex * 2 - 1;
      currentChapterNumber =
        insidePages[rightPageIndex - 1]?.chapterNum ||
        insidePages[rightPageIndex - 2]?.chapterNum ||
        1;
    } else if (activeSpreadIndex >= maxSpreadIndex) {
      currentChapterNumber = 5;
    }
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

  // Sheets data mapping (Desktop - Generated dynamically from insidePages)
  const sheets = Array.from({ length: totalSheetsCount }).map((_, sheetIdx) => {
    if (sheetIdx === 0) {
      // Sheet 0: Front Cover & Dedication
      return {
        front: <BookCover data={data} onOpen={() => handleSpreadChange(1)} isOpen={activeSpreadIndex > 0} />,
        back: (
          <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
            {/* Spine shadow overlay */}
            <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
            {insidePages[0].content}
          </div>
        )
      };
    } else if (sheetIdx === totalSheetsCount - 1) {
      // Sheet Last: Signatures (Front) & Back Leather Cover (Back)
      return {
        front: (
          <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
            {/* Spine shadow overlay */}
            <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
            {insidePages[insidePages.length - 1].content}
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
      };
    } else {
      // Middle sheets: Front = insidePages[2 * sheetIdx - 1], Back = insidePages[2 * sheetIdx]
      const frontPage = insidePages[2 * sheetIdx - 1];
      const backPage = insidePages[2 * sheetIdx];
      return {
        front: (
          <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-secondary/15">
            {/* Spine shadow overlay */}
            <div className="absolute top-0 left-0 bottom-0 w-8 page-shadow-right pointer-events-none z-10" />
            {frontPage?.content}
          </div>
        ),
        back: (
          <div className="w-full h-full relative select-none bg-card p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-secondary/15">
            {/* Spine shadow overlay */}
            <div className="absolute top-0 right-0 bottom-0 w-8 page-shadow-left pointer-events-none z-10" />
            {backPage?.content}
          </div>
        )
      };
    }
  });

  // Mobile Single-Pages Array (Generated dynamically)
  const mobilePages = [
    // Page 0: Cover
    <BookCover key="cover" data={data} onOpen={() => { setMobilePageDirection(1); setActiveMobilePageIndex(1); syncMobileTab(1); }} isOpen={activeMobilePageIndex > 0} />,
    // All inside pages
    ...insidePages.map((page, idx) => (
      <Card variant="scrapbook" key={page.id} className="w-full min-h-[580px] flex flex-col justify-between p-6 md:p-8 overflow-y-auto no-scrollbar">
        {page.content}
        <div className="text-center text-[9px] font-mono text-muted/30 mt-4">
          PAGE {String(idx + 1).padStart(2, "0")}
        </div>
      </Card>
    )),
    // Back Cover Closed
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
            activeMobilePageIndex > 0 && activeMobilePageIndex < maxMobilePageIndex ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden mb-0"
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
                disabled={activeMobilePageIndex === maxMobilePageIndex}
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
            activeSpreadIndex > 0 && activeSpreadIndex < maxSpreadIndex ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden mb-0"
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
                  : activeSpreadIndex === maxSpreadIndex 
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
                  activeSpreadIndex === maxSpreadIndex ? "opacity-0 scale-95" : "opacity-100 scale-100"
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
                  activeSpreadIndex >= maxSpreadIndex - 1 ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
                )}
                style={{
                  boxShadow: "inset 1px 0 3px rgba(0,0,0,0.05), 2px 2px 4px rgba(91,70,54,0.1), 3px 3px 0px #FAF8F5, 6px 6px 0px #E7DEC6"
                }}
              />

              {/* 3. Render 3D physical sheets */}
              {sheets.map((sheet, index) => {
                const isFlipped = index < activeSpreadIndex;
                return (
                  <div
                    key={index}
                    className="absolute top-0 left-1/2 w-1/2 h-full origin-left preserve-3d transition-transform duration-[850ms] ease-in-out"
                    style={getSheetStyle(index)}
                  >
                    {/* Front Face (Facing right initially) */}
                    <div 
                      className={cn(
                        "absolute inset-0 w-full h-full backface-hidden bg-card border-l border-secondary/20 shadow-inner p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar rounded-r-sm",
                        isFlipped ? "pointer-events-none" : "pointer-events-auto"
                      )}
                    >
                      {sheet.front}
                      {index > 0 && index < totalSheetsCount - 1 && (
                        <div className="absolute bottom-4 right-6 text-[10px] text-muted/30 font-mono select-none">
                          PAGE {String(index * 2).padStart(2, "0")}
                        </div>
                      )}
                    </div>

                    {/* Back Face (Facing left when sheet is flipped) */}
                    <div 
                      className={cn(
                        "absolute inset-0 w-full h-full backface-hidden bg-card border-r border-secondary/20 shadow-inner p-7 md:p-9 flex flex-col justify-between overflow-y-auto no-scrollbar rounded-l-sm",
                        isFlipped ? "pointer-events-auto" : "pointer-events-none"
                      )}
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      {sheet.back}
                      {index >= 0 && index < totalSheetsCount - 1 && (
                        <div className="absolute bottom-4 left-6 text-[10px] text-muted/30 font-mono select-none">
                          PAGE {String(index * 2 + 1).padStart(2, "0")}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* 4. Book spine and central shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-[#2A1E17] shadow-inner z-20 book-spine-shadow pointer-events-none" />

              {/* 5. Clickable margins overlays for quick 3D flipping */}
              {/* Left page margin click */}
              {activeSpreadIndex > 0 && (
                <div 
                  className="absolute top-0 left-0 w-[8%] h-full z-30 cursor-w-resize group preserve-3d pointer-events-auto"
                  style={{ transform: "translateZ(50px)" }}
                  onClick={() => {
                    handlePrev();
                    setIsLeftHovered(false);
                  }}
                  onMouseEnter={() => setIsLeftHovered(true)}
                  onMouseLeave={() => setIsLeftHovered(false)}
                  title="Previous Page"
                >
                  <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-card/90 border border-secondary p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ChevronLeft size={14} className="text-primary" />
                  </div>
                </div>
              )}
              {/* Right page margin click */}
              {activeSpreadIndex < maxSpreadIndex && (
                <div 
                  className="absolute top-0 right-0 w-[8%] h-full z-30 cursor-e-resize group preserve-3d pointer-events-auto"
                  style={{ transform: "translateZ(50px)" }}
                  onClick={() => {
                    handleNext();
                    setIsRightHovered(false);
                  }}
                  onMouseEnter={() => setIsRightHovered(true)}
                  onMouseLeave={() => setIsRightHovered(false)}
                  title="Next Page"
                >
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-card/90 border border-secondary p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ChevronRight size={14} className="text-primary" />
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
                disabled={activeSpreadIndex === maxSpreadIndex}
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

