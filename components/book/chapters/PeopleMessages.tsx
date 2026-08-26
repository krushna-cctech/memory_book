import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TeammateMessage } from "@/types/farewell";
import { AvatarPlaceholder } from "../../avatar/AvatarPlaceholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TapeDoodle, HeartDoodle, SparklesDoodle } from "../../ui/Doodles";
import { X, ZoomIn } from "lucide-react";

interface PeopleMessagesProps {
  messages?: TeammateMessage[];
  message?: TeammateMessage;
  index?: number;
  total?: number;
}

export const PeopleMessages = ({
  messages,
  message,
  index = 0,
  total = 4,
}: PeopleMessagesProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scrolling and page flipping while dialog modal is active
  useEffect(() => {
    if (!selectedImage) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setSelectedImage(null);
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
  }, [selectedImage]);

  // If a single message is passed, use it; otherwise pick from messages array
  const currentMessage: TeammateMessage | undefined =
    message || (messages && messages[index]);

  if (!currentMessage) return null;

  const colorStyles: Record<
    string,
    {
      cardBg: string;
      borderColor: string;
      textColor: string;
      quoteColor: string;
      accentBg: string;
      tapeRotation: number;
    }
  > = {
    yellow: {
      cardBg: "bg-[#FAF2DE]",
      borderColor: "border-[#E8C96A]/60",
      textColor: "text-[#4A3728]",
      quoteColor: "text-[#C49B38]",
      accentBg: "bg-[#E8C96A]/25 text-[#6B4E2E]",
      tapeRotation: -3,
    },
    blue: {
      cardBg: "bg-[#EBF3F6]",
      borderColor: "border-[#A7C5D3]/60",
      textColor: "text-[#2B3E48]",
      quoteColor: "text-[#5B889E]",
      accentBg: "bg-[#A7C5D3]/25 text-[#2C4857]",
      tapeRotation: 2,
    },
    pink: {
      cardBg: "bg-[#F7ECE9]",
      borderColor: "border-[#D8A79E]/60",
      textColor: "text-[#542F2A]",
      quoteColor: "text-[#B86B60]",
      accentBg: "bg-[#D8A79E]/25 text-[#5F302A]",
      tapeRotation: -2,
    },
    green: {
      cardBg: "bg-[#EDF3EA]",
      borderColor: "border-[#BACBB0]/60",
      textColor: "text-[#35432E]",
      quoteColor: "text-[#638055]",
      accentBg: "bg-[#BACBB0]/25 text-[#374C2E]",
      tapeRotation: 3,
    },
  };

  const style =
    colorStyles[currentMessage.color || "yellow"] || colorStyles.yellow;

  const hasImage = !!currentMessage.image;
  const hasText = !!currentMessage.message && currentMessage.message.trim().length > 0;

  return (
    <div className="relative w-full max-w-xl mx-auto py-1 flex flex-col justify-between h-full">
      <div>
        {/* Chapter Header */}
        <div className="text-left mb-3.5 border-b border-secondary/30 pb-2.5 select-none">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
              Chapter 04 &bull; Words from the Team
            </span>
            <span className="text-[10px] font-mono text-muted/50 font-bold uppercase tracking-wider">
              Note {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
            </span>
          </div>
          <h2 className="font-serif text-lg md:text-xl font-black text-primary tracking-wide mt-0.5">
            Personal Note &bull; {currentMessage.sender}
          </h2>
          <p className="font-serif text-xs md:text-sm text-primary/70 italic mt-0.5">
            “Heartfelt messages, memories, and warm wishes from your teammates.”
          </p>
        </div>

        {/* Full-Page Single Note Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={shouldReduceMotion ? {} : staggerContainer(0.08, 0.05)}
          className="w-full pt-2.5"
        >
          <motion.div
            variants={shouldReduceMotion ? {} : fadeUp(0.4, 12)}
            className="relative"
          >
            {/* Antique Tape Doodle holding the top of the sticky note */}
            {!shouldReduceMotion && (
              <TapeDoodle
                className="-top-3 left-1/2 -translate-x-1/2 z-20"
                rotation={style.tapeRotation}
              />
            )}

            <div
              className={`w-full p-5 md:p-7 border-2 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-[3px_3px_0px_rgba(91,70,54,0.15)] relative ${style.cardBg} ${style.borderColor} ${style.textColor}`}
            >
              {/* Decorative background quote mark */}
              {hasText && (
                <span
                  className={`absolute top-4 right-6 font-serif text-7xl select-none pointer-events-none opacity-20 ${style.quoteColor}`}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
              )}

              {/* Message Content: Handles Text, Image, or Both */}
              <div className="relative z-10 space-y-3.5">
                {/* 1. Image Note Display (if message was given as an image) */}
                {hasImage && (
                  <div
                    className="relative group cursor-zoom-in rounded-xl overflow-hidden border-2 border-current/20 bg-card/80 shadow-md transition-transform hover:scale-[1.01]"
                    onClick={() => setSelectedImage(currentMessage.image!)}
                  >
                    <div className={`w-full ${!hasText ? "max-h-[440px]" : "max-h-[290px]"} overflow-hidden flex items-center justify-center bg-black/5 rounded-lg`}>
                      <img
                        src={currentMessage.image}
                        alt={`Message from ${currentMessage.sender}`}
                        className={`w-full h-auto ${!hasText ? "max-h-[440px]" : "max-h-[290px]"} object-contain transition-transform duration-300 group-hover:scale-102`}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Hover Zoom Overlay Badge */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-card/95 text-primary text-[11px] uppercase font-mono tracking-wider px-3.5 py-1.5 rounded-full shadow-lg border border-secondary/40 font-bold flex items-center space-x-1.5">
                        <ZoomIn size={14} className="text-accent" />
                        <span>Zoom Message</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Text Note Display */}
                {hasText && (
                  <p className="font-handwritten text-base sm:text-lg md:text-[18px] leading-relaxed font-bold whitespace-pre-line text-left">
                    &ldquo;{currentMessage.message}&rdquo;
                  </p>
                )}
              </div>

              {/* Author Signature & Role Badge */}
              <div className="flex items-center justify-between border-t border-current/15 pt-3.5 mt-3 relative z-10">
                <div className="flex items-center space-x-3 text-left">
                  <AvatarPlaceholder
                    name={currentMessage.sender}
                    className={`w-10 h-10 text-xs font-black border-2 border-current/20 shadow-sm ${style.accentBg}`}
                  />
                  <div>
                    <h4 className="font-serif text-sm md:text-base font-black uppercase tracking-wide leading-tight">
                      {currentMessage.sender}
                    </h4>
                    <span className="font-serif text-[11px] opacity-80 mt-0.5 block font-bold tracking-wider uppercase">
                      {currentMessage.role}
                    </span>
                  </div>
                </div>

                {/* Subtle Decorative Icon */}
                <div className="select-none pointer-events-none opacity-40">
                  {index % 2 === 0 ? (
                    <HeartDoodle size={24} className="text-current" />
                  ) : (
                    <SparklesDoodle size={24} className="text-current" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Page Footer Navigation Hint */}
      {index < total - 1 ? (
        <div className="text-right pt-2.5 pr-2 text-[10px] md:text-xs font-serif text-accent/80 italic select-none">
          Next message on next page &rarr;
        </div>
      ) : (
        <div className="mt-2.5 p-2.5 bg-card/90 border-2 border-dashed border-accent/40 rounded-xl text-center relative select-none">
          <p className="font-handwritten text-sm md:text-base text-accent font-bold leading-relaxed">
            &ldquo;We will always cherish the laughter, dedication, and memories you brought to our team.&rdquo;
          </p>
          <span className="block mt-0.5 font-serif text-[9px] uppercase tracking-widest text-muted/60">
            ✦ A Team That Inspires Together ✦
          </span>
        </div>
      )}

      {/* Lightbox Modal rendered via Portal directly in document.body (identical to Memory Dialog) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 select-none"
              onClick={() => setSelectedImage(null)}
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
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close dialog"
                >
                  <X size={20} className="stroke-[2.5]" />
                </button>

                {/* Lightbox Media */}
                <div className="w-full max-h-[65vh] rounded-xl bg-black/5 border border-secondary/40 overflow-hidden flex items-center justify-center mb-4 relative">
                  <img
                    src={selectedImage}
                    alt={`Message from ${currentMessage.sender}`}
                    className="w-full h-auto max-h-[65vh] object-contain rounded-lg shadow-sm"
                  />
                </div>

                {/* Lightbox Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-secondary/30 pt-4">
                  <div className="text-left space-y-1 max-w-xl">
                    <div className="flex items-center space-x-2">
                      <span className="bg-[#E8C96A]/25 text-[#6B4E2E] font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded font-black border border-[#E8C96A]/40">
                        Teammate Note
                      </span>
                    </div>
                    <h3 className="font-serif text-base md:text-lg font-bold text-primary">
                      Personal Message &bull; {currentMessage.sender}
                    </h3>
                    <p className="font-serif text-xs md:text-sm text-primary/80 leading-relaxed">
                      {currentMessage.role}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
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



