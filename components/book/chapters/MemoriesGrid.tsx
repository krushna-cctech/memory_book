import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryCard } from "@/types/farewell";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PizzaSliceDoodle, TeaCupDoodle, LightbulbDoodle, CoffeeCupDoodle, TapeDoodle, SparklesDoodle, HeartDoodle } from "../../ui/Doodles";
import { X, Play } from "lucide-react";

interface MemoriesGridProps {
  memories: MemoryCard[];
  page?: number;
  part?: "left" | "right" | "all";
}

const pageMeta: Record<
  number,
  { title: string; subtitle: string; pageLabel: string }
> = {
  1: {
    title: "Milestones & Team Fun",
    subtitle: "“Celebrating project delivery wins and memorable Friday team vibes.”",
    pageLabel: "Page 01 of 05 • #01–#02",
  },
  2: {
    title: "Creativity & Adventure",
    subtitle: "“Bold team initiatives and thrilling adventures together.”",
    pageLabel: "Page 02 of 05 • #03–#04",
  },
  3: {
    title: "Smiles & Team Triumphs",
    subtitle: "“Cherished everyday smiles and the Unicorn Team Award victory.”",
    pageLabel: "Page 03 of 05 • #05–#06",
  },
  4: {
    title: "Recognition & Celebrations",
    subtitle: "“Women in Tech honors and joyful teammate birthday parties.”",
    pageLabel: "Page 04 of 05 • #07–#08",
  },
  5: {
    title: "Evenings to Remember",
    subtitle: "“Unforgettable team dinners, good conversations, and lasting bonds.”",
    pageLabel: "Page 05 of 05 • #09",
  },
};

export const MemoriesGrid = ({
  memories,
  page,
  part = "all",
}: MemoriesGridProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedMemory, setSelectedMemory] = useState<MemoryCard | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scrolling and page flipping while lightbox modal is active
  useEffect(() => {
    if (!selectedMemory) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setSelectedMemory(null);
      } else if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", " "].includes(e.key)
      ) {
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [selectedMemory]);

  // Determine which 2 memories to display based on page (or fallback to part)
  let displayMemories: MemoryCard[];
  let startIndex = 0;
  let currentPageNum = page || 1;

  if (page !== undefined) {
    const pageSize = 2;
    startIndex = (page - 1) * pageSize;
    displayMemories = memories.slice(startIndex, startIndex + pageSize);
  } else if (part === "left") {
    currentPageNum = 1;
    startIndex = 0;
    displayMemories = memories.slice(0, 2);
  } else if (part === "right") {
    currentPageNum = 2;
    startIndex = 2;
    displayMemories = memories.slice(2, 4);
  } else {
    displayMemories = memories;
  }

  const meta = pageMeta[currentPageNum] || {
    title: "Cherished Moments",
    subtitle: "“A snapshot of laughter, milestones, and memories together.”",
    pageLabel: `${displayMemories.length} Memories`,
  };

  return (
    <div className="relative w-full max-w-xl mx-auto py-1 flex flex-col justify-between h-full">
      <div>
        {/* Chapter Header */}
        <div className="text-left mb-3.5 border-b border-secondary/30 pb-2.5 select-none">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
              Chapter 03 &bull; The Memories
            </span>
            <span className="text-[10px] font-mono text-muted/50 font-bold uppercase tracking-wider">
              {meta.pageLabel}
            </span>
          </div>
          <h2 className="font-serif text-lg md:text-xl font-black text-primary tracking-wide mt-0.5">
            {meta.title}
          </h2>
          <p className="font-serif text-xs md:text-sm text-primary/70 italic mt-0.5">
            {meta.subtitle}
          </p>
        </div>

        {/* 2 Memories per page (Vertical Polaroid Cards) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={shouldReduceMotion ? {} : staggerContainer(0.08, 0.05)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full py-1"
        >
          {displayMemories.map((item, localIndex) => {
            const index = startIndex + localIndex;
            const rotations = ["rotate-[-1.5deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[1deg]"];
            const rotationClass = shouldReduceMotion ? "" : rotations[localIndex % rotations.length];
            const hasMedia = !!(item.image || item.video);

            return (
              <motion.div
                key={item.id}
                variants={shouldReduceMotion ? {} : fadeUp(0.4, 12)}
                className={`w-full flex relative pt-3 ${
                  displayMemories.length === 1 ? "sm:col-span-2 sm:max-w-md sm:mx-auto" : ""
                }`}
              >
                {/* Tape Doodle on top of Polaroid */}
                {hasMedia && !shouldReduceMotion && (
                  <TapeDoodle 
                    className="-top-1 left-1/2 -translate-x-1/2" 
                    rotation={localIndex % 2 === 0 ? -2 : 3} 
                  />
                )}

                <Card
                  variant="polaroid"
                  className={`w-full text-left flex flex-col justify-between ${rotationClass} border-2 border-secondary/50 bg-card/90 shadow-sm hover:rotate-0 hover:scale-[1.02] transform transition-all duration-300 relative p-3.5 pb-4 cursor-zoom-in`}
                  onClick={() => setSelectedMemory(item)}
                >
                  <div className="w-full flex flex-col h-full justify-between">
                    <div>
                      {/* Header: category & index */}
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="accent" className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 font-black">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-muted/40 font-serif font-black" aria-hidden="true">
                          #0{index + 1}
                        </span>
                      </div>

                      {/* Vertical Media Display on Top */}
                      {item.video && (
                        <div className="relative w-full aspect-[4/3] rounded-lg bg-secondary/15 overflow-hidden mb-2.5 border border-secondary/35 group select-none">
                          <video
                            src={item.video}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            autoPlay
                          />
                          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-card/95 text-primary text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded shadow-sm border border-secondary/40 font-bold">
                              Play Video
                            </span>
                          </div>
                          <div className="absolute bottom-1.5 right-1.5 bg-black/60 rounded-full p-1 text-white/95 backdrop-blur-sm pointer-events-none">
                            <Play size={10} className="fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      {item.image && !item.video && (
                        <div className="relative w-full aspect-[4/3] rounded-lg bg-secondary/15 overflow-hidden mb-2.5 border border-secondary/35 group select-none">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-card/95 text-primary text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded shadow-sm border border-secondary/40 font-bold">
                              Zoom Photo
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Text Below Media */}
                      <h3 className="font-serif text-sm sm:text-base font-bold text-primary mb-1 leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-serif text-xs md:text-[13px] text-primary/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2.5 text-[9px] font-mono text-accent font-bold uppercase tracking-wider select-none flex items-center space-x-1 border-t border-secondary/20 mt-2">
                      <span>✦ Click to preview</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* If page 5 has only 1 memory, render a lovely scrapbook memory polaroid card below */}
        {currentPageNum === 5 && displayMemories.length === 1 && (
          <div className="mt-3.5 p-4 bg-secondary/10 border border-secondary/30 rounded-xl text-center relative select-none">
            <div className="flex items-center justify-center space-x-2 text-accent mb-1">
              <HeartDoodle size={18} />
              <span className="font-serif text-[11px] uppercase tracking-widest font-black">
                Enduring Bonds
              </span>
              <HeartDoodle size={18} />
            </div>
            <p className="font-handwritten text-base text-primary font-bold leading-relaxed">
              &ldquo;From shared laughs to big wins, every moment spent together has been truly priceless.&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Page Footer Navigation Hint */}
      {currentPageNum < 5 ? (
        <div className="text-right pt-2.5 pr-2 text-[10px] md:text-xs font-serif text-accent/80 italic select-none">
          Next memories on next page &rarr;
        </div>
      ) : (
        <div className="mt-2.5 p-2.5 bg-card/90 border-2 border-dashed border-accent/40 rounded-xl text-center relative select-none">
          <p className="font-handwritten text-sm md:text-base text-accent font-bold leading-relaxed">
            &ldquo;Good times, great teammates, and memories that will last a lifetime.&rdquo;
          </p>
          <span className="block mt-0.5 font-serif text-[9px] uppercase tracking-widest text-muted/60">
            ✦ Unforgettable Memories ✦
          </span>
        </div>
      )}

      {/* Lightbox Modal rendered via Portal directly in document.body */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 select-none"
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative max-w-3xl w-full bg-[#FCFAF6] border-4 border-primary/40 p-5 sm:p-7 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar paper-grain text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Floating Close Button */}
                <button
                  type="button"
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-primary text-card hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent"
                  onClick={() => setSelectedMemory(null)}
                  aria-label="Close lightbox"
                >
                  <X size={20} className="stroke-[2.5]" />
                </button>

                {/* Lightbox Media */}
                <div className="w-full aspect-[16/10] max-h-[60vh] rounded-xl bg-black/5 border border-secondary/40 overflow-hidden flex items-center justify-center mb-4 relative">
                  {selectedMemory.video ? (
                    <video
                      src={selectedMemory.video}
                      className="w-full h-full max-h-[60vh] object-contain rounded-lg"
                      controls
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : selectedMemory.image ? (
                    <img
                      src={selectedMemory.image}
                      alt={selectedMemory.title}
                      className="w-full h-full max-h-[60vh] object-contain rounded-lg shadow-sm"
                    />
                  ) : null}
                </div>

                {/* Lightbox Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-secondary/30 pt-4">
                  <div className="text-left space-y-1 max-w-xl">
                    <div className="flex items-center space-x-2">
                      <Badge variant="accent" className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-black">
                        {selectedMemory.category}
                      </Badge>
                    </div>
                    <h3 className="font-serif text-base md:text-lg font-bold text-primary">
                      {selectedMemory.title}
                    </h3>
                    <p className="font-serif text-xs md:text-sm text-primary/80 leading-relaxed">
                      {selectedMemory.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMemory(null)}
                    className="self-start sm:self-center px-4 py-2 bg-secondary/20 hover:bg-accent hover:text-white text-primary rounded-lg font-serif text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer flex-shrink-0"
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

// Scrapbook summary / reflections card for Chapter 3 closing
export const MemoriesClosing = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto py-1 flex flex-col justify-between h-full select-none text-left">
      <div>
        {/* Header */}
        <div className="mb-4 border-b border-secondary/30 pb-2.5">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
            Chapter 03 &bull; The Scrapbook
          </span>
          <h2 className="font-serif text-lg md:text-xl font-black text-primary tracking-wide mt-0.5">
            Moments We’ll Always Cherish
          </h2>
          <p className="font-serif text-xs md:text-sm text-primary/70 italic mt-0.5">
            “Every snapshot a memory, every milestone a story we built together.”
          </p>
        </div>

        {/* Scrapbook Collage Card */}
        <div className="space-y-4 pt-2">
          <div className="p-6 bg-secondary/10 border-2 border-dashed border-secondary/40 rounded-2xl relative shadow-sm">
            <div className="flex items-center space-x-2 text-accent mb-2">
              <SparklesDoodle size={20} />
              <span className="font-serif text-xs uppercase tracking-widest font-black">
                A Journey of Smiles
              </span>
            </div>
            <p className="font-handwritten text-lg md:text-xl text-primary font-bold leading-relaxed mb-3">
              &ldquo;From team lunches, tech sessions, award stage wins, to late evening outings—thank you for filling our workplace with energy, laughter, and brilliance!&rdquo;
            </p>
            <div className="font-serif text-[10px] uppercase tracking-widest text-accent font-bold">
              ✦ 9 Unforgettable Chapter Memories ✦
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-4 bg-card border border-secondary/30 rounded-xl text-center shadow-xs">
              <span className="text-2xl block mb-1">🎉</span>
              <h4 className="font-serif text-xs font-bold text-primary uppercase">Big Milestones</h4>
              <p className="font-serif text-[11px] text-muted mt-0.5">ReCap Pro & Unicorn Award</p>
            </div>
            <div className="p-4 bg-card border border-secondary/30 rounded-xl text-center shadow-xs">
              <span className="text-2xl block mb-1">🌟</span>
              <h4 className="font-serif text-xs font-bold text-primary uppercase">Joyful Days</h4>
              <p className="font-serif text-[11px] text-muted mt-0.5">Imagica, Dinners & Tech Talks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer link to next chapter */}
      <div className="text-right pt-3 pr-2 text-[10px] md:text-xs font-serif text-accent/80 italic">
        Words from the Team on next page &rarr;
      </div>
    </div>
  );
};


