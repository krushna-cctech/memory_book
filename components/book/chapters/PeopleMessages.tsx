import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TeammateMessage } from "@/types/farewell";
import { AvatarPlaceholder } from "../../avatar/AvatarPlaceholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TapeDoodle, HeartDoodle, SparklesDoodle } from "../../ui/Doodles";
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

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
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom scale whenever modal is opened/closed
  const openModal = (img: string) => {
    setZoomScale(1);
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoomScale(1);
  };

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
        closeModal();
      } else if (e.key === "+" || e.key === "=") {
        setZoomScale((prev) => Math.min(prev + 0.5, 3.5));
      } else if (e.key === "-") {
        setZoomScale((prev) => Math.max(prev - 0.5, 1));
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
    red: {
      cardBg: "bg-[#FDF2F0]",
      borderColor: "border-[#E5A8A0]/60",
      textColor: "text-[#542B28]",
      quoteColor: "text-[#C26257]",
      accentBg: "bg-[#E5A8A0]/25 text-[#632924]",
      tapeRotation: -2,
    },
    purple: {
      cardBg: "bg-[#F5F0F8]",
      borderColor: "border-[#CBB4D9]/60",
      textColor: "text-[#3D284C]",
      quoteColor: "text-[#8857A1]",
      accentBg: "bg-[#CBB4D9]/25 text-[#4D2866]",
      tapeRotation: 2,
    },
    orange: {
      cardBg: "bg-[#FDF4EB]",
      borderColor: "border-[#E8C2A0]/60",
      textColor: "text-[#543820]",
      quoteColor: "text-[#C97B3C]",
      accentBg: "bg-[#E8C2A0]/25 text-[#693E1A]",
      tapeRotation: -3,
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
                    className="relative group cursor-zoom-in rounded-xl overflow-hidden border-2 border-current/20 bg-card/90 shadow-md transition-all duration-300 hover:shadow-lg hover:border-accent"
                    onClick={() => openModal(currentMessage.image!)}
                    title="Click to Zoom / View in Fullscreen"
                  >
                    <div className={`w-full ${!hasText ? "max-h-[440px]" : "max-h-[290px]"} overflow-hidden flex items-center justify-center bg-black/5 rounded-lg`}>
                      <img
                        src={currentMessage.image}
                        alt={`Message from ${currentMessage.sender}`}
                        className={`w-full h-auto ${!hasText ? "max-h-[440px]" : "max-h-[290px]"} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Always-visible top-right Quick Zoom Badge */}
                    <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
                      <span className="bg-primary/90 text-card text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm border border-accent/40 font-black flex items-center space-x-1 group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                        <ZoomIn size={12} className="stroke-[2.5]" />
                        <span>Zoom</span>
                      </span>
                    </div>

                    {/* Hover Zoom Overlay Banner */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="bg-card text-primary text-xs uppercase font-mono tracking-wider px-4 py-2 rounded-full shadow-xl border-2 border-accent font-black flex items-center space-x-2 transform scale-95 group-hover:scale-100 transition-transform duration-200">
                        <Maximize2 size={14} className="text-accent stroke-[2.5]" />
                        <span>Click to Enlarge &amp; Read</span>
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

                {/* If card has image, show clear click hint button */}
                {hasImage ? (
                  <button
                    type="button"
                    onClick={() => openModal(currentMessage.image!)}
                    className="font-mono text-[10px] text-accent hover:text-primary font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer bg-card/80 px-2.5 py-1 rounded-md border border-accent/30 shadow-sm hover:border-accent transition-colors"
                  >
                    <ZoomIn size={12} />
                    <span>Zoom Note ↗</span>
                  </button>
                ) : (
                  <div className="select-none pointer-events-none opacity-40">
                    {index % 2 === 0 ? (
                      <HeartDoodle size={24} className="text-current" />
                    ) : (
                      <SparklesDoodle size={24} className="text-current" />
                    )}
                  </div>
                )}
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

      {/* Lightbox Modal rendered via Portal directly in document.body with Interactive Zoom Controls */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 select-none"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative max-w-4xl w-full bg-[#FCFAF6] border-4 border-primary/40 p-4 sm:p-7 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] paper-grain text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Floating Modal Header Controls */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-secondary/30">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#E8C96A]/25 text-[#6B4E2E] font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded font-black border border-[#E8C96A]/40">
                      Teammate Note Preview
                    </span>
                    <span className="text-xs font-serif text-primary/70 font-bold hidden sm:inline">
                      &bull; {currentMessage.sender}
                    </span>
                  </div>

                  {/* Interactive Zoom Toolbar */}
                  <div className="flex items-center space-x-1.5 bg-secondary/15 p-1 rounded-lg border border-secondary/30">
                    <button
                      type="button"
                      onClick={() => setZoomScale((prev) => Math.max(prev - 0.5, 1))}
                      disabled={zoomScale <= 1}
                      className="p-1.5 rounded bg-card text-primary hover:bg-accent hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                      title="Zoom Out (-)"
                    >
                      <ZoomOut size={15} />
                    </button>
                    
                    <span className="font-mono text-xs font-bold text-primary px-2 min-w-[48px] text-center select-none">
                      {Math.round(zoomScale * 100)}%
                    </span>

                    <button
                      type="button"
                      onClick={() => setZoomScale((prev) => Math.min(prev + 0.5, 3.5))}
                      disabled={zoomScale >= 3.5}
                      className="p-1.5 rounded bg-card text-primary hover:bg-accent hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                      title="Zoom In (+)"
                    >
                      <ZoomIn size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setZoomScale(1)}
                      className="p-1.5 rounded bg-card text-primary hover:bg-accent hover:text-white transition-colors cursor-pointer ml-1"
                      title="Reset Zoom (100%)"
                    >
                      <RotateCcw size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-1.5 rounded bg-primary text-card hover:bg-accent transition-colors cursor-pointer ml-2"
                      title="Close (Esc)"
                    >
                      <X size={15} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Lightbox Media Viewport with Pan & Scroll Support */}
                <div 
                  className={`w-full max-h-[68vh] rounded-xl bg-black/5 border border-secondary/40 overflow-auto flex items-center justify-center p-2 sm:p-4 relative ${
                    zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                  }`}
                  onDoubleClick={() => setZoomScale((prev) => (prev === 1 ? 2 : 1))}
                  title={zoomScale === 1 ? "Double click to zoom 2x" : "Double click to reset zoom"}
                >
                  <motion.div
                    animate={{ scale: zoomScale }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="origin-center flex items-center justify-center w-full"
                  >
                    <img
                      src={selectedImage}
                      alt={`Message from ${currentMessage.sender}`}
                      className="w-auto h-auto max-h-[64vh] object-contain rounded-lg shadow-sm select-none"
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* Lightbox Footer Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-secondary/30 pt-3 mt-2">
                  <div className="text-left space-y-0.5">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-primary">
                      {currentMessage.sender} &bull; <span className="text-xs text-primary/70 font-normal">{currentMessage.role}</span>
                    </h3>
                    <p className="font-serif text-[11px] text-muted/60">
                      Tip: Use the toolbar buttons or double-click to zoom in and out.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
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



