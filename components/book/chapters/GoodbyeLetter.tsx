"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GoodbyeLetterData } from "@/types/farewell";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SparklesDoodle, HeartDoodle } from "../../ui/Doodles";
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

interface GoodbyeLetterProps {
  data: GoodbyeLetterData;
  hideSignatures?: boolean;
}

export const GoodbyeLetter = ({ data, hideSignatures = false }: GoodbyeLetterProps) => {
  const [opened, setOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    setOpened(true);
  };

  const openModal = (img: string) => {
    setZoomScale(1);
    setSelectedImage(img);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoomScale(1);
  };

  const handleZoomChange = (newScale: number) => {
    setZoomScale(newScale);
    if (newScale === 1 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1 || !scrollContainerRef.current) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollContainerRef.current.scrollLeft,
      scrollTop: scrollContainerRef.current.scrollTop,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - dx;
    scrollContainerRef.current.scrollTop = dragStart.scrollTop - dy;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Lock scrolling when modal is active
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
        handleZoomChange(Math.min(Number((zoomScale + 0.1).toFixed(2)), 2.2));
      } else if (e.key === "-") {
        handleZoomChange(Math.max(Number((zoomScale - 0.1).toFixed(2)), 1));
      } else if (e.key === "0") {
        handleZoomChange(1);
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
  }, [selectedImage, zoomScale]);

  return (
    <div className="relative w-full max-w-xl mx-auto py-1 flex flex-col justify-between h-full text-left">
      <div>
        {/* Chapter Header */}
        <div className="mb-3 border-b border-secondary/30 pb-2.5 select-none">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
              Chapter 05 &bull; The Farewell Letter
            </span>
            <span className="text-[10px] font-mono text-muted/50 font-bold uppercase tracking-wider">
              Final Chapter
            </span>
          </div>
          <h2 className="font-serif text-lg md:text-xl font-black text-primary tracking-wide mt-0.5">
            A Letter from the Entire Team
          </h2>
          <p className="font-serif text-xs md:text-sm text-primary/70 italic mt-0.5">
            “Words, memories, and warm wishes sealed together for you.”
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!opened ? (
            // Realistic Vintage Wax-Sealed Envelope View
            <motion.div
              key="envelope"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full pt-2 flex flex-col items-center justify-center"
            >
              <button
                type="button"
                onClick={handleOpen}
                className="w-full max-w-md relative bg-[#EAD8C2] border-4 border-[#7A5A43] rounded-2xl p-6 sm:p-8 shadow-[0_12px_28px_rgba(74,55,40,0.22)] flex flex-col items-center justify-between hover:scale-[1.02] hover:shadow-[0_16px_36px_rgba(74,55,40,0.3)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent/40 overflow-hidden text-center group"
                aria-label="Click to break the wax seal and open the letter"
              >
                {/* Envelope Flap Triangles Simulation */}
                <div className="absolute top-0 left-0 right-0 h-28 bg-[#DFCAAF] border-b-2 border-[#8C6D53]/60 clip-path-envelope pointer-events-none shadow-sm" />
                
                {/* Vintage Air Mail Strip in top corner */}
                <div className="absolute top-3 right-3 bg-[#FAF4EA] border border-[#8C6D53]/40 rounded px-2 py-1 shadow-sm select-none z-10 transform rotate-[3deg]">
                  <span className="font-mono text-[9px] text-[#A63429] uppercase tracking-widest font-black block">
                    ✦ SPECIAL DELIVERY ✦
                  </span>
                  <span className="font-serif text-[8px] text-muted/60 block">
                    AEC Team &bull; 2024–2026
                  </span>
                </div>

                {/* Postage Stamp Doodle on top left */}
                <div className="absolute top-3 left-3 select-none pointer-events-none opacity-40">
                  <SparklesDoodle size={28} className="text-primary" />
                </div>

                {/* Center Wax Seal Button */}
                <div className="relative my-6 z-20 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#9E2A2B] border-4 border-[#E2B755] shadow-[0_6px_16px_rgba(158,42,43,0.45)] flex items-center justify-center text-white text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative">
                    <span className="select-none filter drop-shadow">💌</span>
                    {/* Glowing golden ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse pointer-events-none" />
                  </div>

                  <span className="mt-3 bg-[#FAF6F0] text-[#7A5A43] font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#7A5A43]/30 font-black shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                    ✦ BREAK WAX SEAL ✦
                  </span>
                </div>

                {/* Envelope Front Details */}
                <div className="relative z-10 mt-2 space-y-1 select-none">
                  <p className="font-serif text-[11px] uppercase tracking-widest text-[#7A5A43]/70 font-bold">
                    Addressed to
                  </p>
                  <h3 className="font-handwritten text-2xl sm:text-3xl text-primary font-black tracking-wide rotate-[-1deg]">
                    {data.salutation || "Dearest Riyaelza,"}
                  </h3>
                  <p className="font-handwritten text-sm text-accent font-bold pt-1">
                    (Click anywhere to open &amp; read the team letter)
                  </p>
                </div>
              </button>
            </motion.div>
          ) : (
            // Opened Letter View
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-[#FAF6F0] border-2 border-secondary/60 p-5 md:p-7 rounded-2xl shadow-md text-left font-serif relative overflow-hidden space-y-3.5"
            >
              {/* Sparkles Doodle */}
              <SparklesDoodle className="absolute top-3 right-3 text-highlight/25 pointer-events-none" size={36} />

              <div className="flex items-center justify-between border-b border-secondary/30 pb-2">
                <h3 className="font-serif text-sm md:text-base font-bold text-primary select-none">
                  {data.salutation}
                </h3>
                <span className="bg-[#E8C96A]/20 text-[#6B4E2E] font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold border border-[#E8C96A]/40">
                  Farewell Note
                </span>
              </div>

              {/* Team Message Image Poster with Zoom */}
              {data.image && (
                <div
                  className="relative group cursor-zoom-in rounded-xl overflow-hidden border-2 border-primary/20 bg-card/90 shadow-md transition-all duration-300 hover:shadow-lg hover:border-accent my-2"
                  onClick={() => openModal(data.image!)}
                  title="Click to Zoom / View in Fullscreen"
                >
                  <div className={`w-full ${data.paragraphs?.length ? "max-h-[260px]" : "max-h-[380px]"} overflow-hidden flex items-center justify-center bg-black/5 rounded-lg`}>
                    <img
                      src={data.image}
                      alt="Team Message Note"
                      className={`w-full h-auto ${data.paragraphs?.length ? "max-h-[260px]" : "max-h-[380px]"} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
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
                      <span>Click to Enlarge &amp; Read Team Note</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Paragraphs (rendered only if present) */}
              {data.paragraphs && data.paragraphs.length > 0 && (
                <div className="space-y-2.5 text-xs md:text-sm leading-relaxed text-primary/95 text-justify">
                  {data.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-secondary/30 relative">
                <p className="font-serif text-sm italic text-primary/80 mb-2 select-none">
                  {data.valediction}
                </p>
                
                {/* Signatures collage */}
                {!hideSignatures && (
                  <div className="grid grid-cols-3 gap-y-2 gap-x-4 select-none pr-8">
                    {data.signatures.map((sig, idx) => {
                      const tilts = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[4deg]"];
                      const tiltClass = tilts[idx % tilts.length];
                      return (
                        <span
                          key={idx}
                          className={`font-handwritten text-lg md:text-xl text-accent font-extrabold ${tiltClass}`}
                        >
                          {sig}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Heart Doodle near signatures */}
                {!hideSignatures && (
                  <HeartDoodle className="absolute bottom-1 right-2 text-accent/40 pointer-events-none" size={32} rotation={8} />
                )}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-secondary/20">
                {data.image && (
                  <button
                    type="button"
                    onClick={() => openModal(data.image!)}
                    className="font-mono text-[10px] text-accent hover:text-primary font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer bg-card/80 px-2.5 py-1 rounded-md border border-accent/30 shadow-sm hover:border-accent transition-colors"
                  >
                    <ZoomIn size={12} />
                    <span>Zoom Team Note ↗</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setOpened(false)}
                  className="text-[10px] md:text-xs uppercase tracking-widest text-muted hover:text-accent font-bold underline cursor-pointer focus:outline-none ml-auto"
                >
                  &larr; Put back in envelope
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal rendered via Portal directly in document.body with Interactive Zoom & Unrestricted Scrolling */}
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
                className="relative max-w-4xl w-full bg-[#FCFAF6] border-4 border-primary/40 p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] paper-grain text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Floating Modal Header Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-secondary/30">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#E8C96A]/25 text-[#6B4E2E] font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded font-black border border-[#E8C96A]/40">
                      Team Farewell Note
                    </span>
                    <span className="text-xs font-serif text-primary/70 font-bold hidden sm:inline">
                      &bull; From The Entire Team
                    </span>
                  </div>

                  {/* Interactive Zoom Toolbar with Slider and Fine Controls */}
                  <div className="flex items-center space-x-1.5 bg-secondary/15 p-1 rounded-lg border border-secondary/30">
                    <button
                      type="button"
                      onClick={() => handleZoomChange(Math.max(Number((zoomScale - 0.1).toFixed(2)), 1))}
                      disabled={zoomScale <= 1}
                      className="p-1.5 rounded bg-card text-primary hover:bg-accent hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                      title="Zoom Out (-10%)"
                    >
                      <ZoomOut size={15} />
                    </button>
                    
                    {/* Interactive Zoom Slider */}
                    <div className="flex items-center space-x-1.5 px-1.5">
                      <input
                        type="range"
                        min="100"
                        max="220"
                        step="5"
                        value={Math.round(zoomScale * 100)}
                        onChange={(e) => handleZoomChange(Number(e.target.value) / 100)}
                        className="w-16 sm:w-24 accent-accent h-1.5 bg-secondary/30 rounded-lg cursor-pointer"
                        title={`Zoom: ${Math.round(zoomScale * 100)}% (Drag to adjust)`}
                      />
                      <span className="font-mono text-xs font-bold text-primary min-w-[42px] text-center select-none">
                        {Math.round(zoomScale * 100)}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleZoomChange(Math.min(Number((zoomScale + 0.1).toFixed(2)), 2.2))}
                      disabled={zoomScale >= 2.2}
                      className="p-1.5 rounded bg-card text-primary hover:bg-accent hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                      title="Zoom In (+10%)"
                    >
                      <ZoomIn size={15} />
                    </button>

                    {/* Quick Preset Zoom Chips */}
                    <div className="hidden sm:flex items-center space-x-1 pl-1 border-l border-secondary/30">
                      {[
                        { label: "Fit", value: 1.0 },
                        { label: "125%", value: 1.25 },
                        { label: "150%", value: 1.5 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleZoomChange(preset.value)}
                          className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded transition-colors cursor-pointer ${
                            Math.abs(zoomScale - preset.value) < 0.05
                              ? "bg-accent text-white"
                              : "bg-card/70 text-primary hover:bg-card"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleZoomChange(1)}
                      className="p-1.5 rounded bg-card text-primary hover:bg-accent hover:text-white transition-colors cursor-pointer ml-0.5"
                      title="Reset Zoom to Fit (100%)"
                    >
                      <RotateCcw size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-1.5 rounded bg-primary text-card hover:bg-accent transition-colors cursor-pointer ml-1"
                      title="Close (Esc)"
                    >
                      <X size={15} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Lightbox Media Viewport with Pan, Drag, and Full Unrestricted 4-Way Scroll */}
                <div 
                  ref={scrollContainerRef}
                  className={`w-full h-[70vh] rounded-xl bg-black/5 border border-secondary/40 overflow-auto relative ${
                    zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                  }`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onDoubleClick={() => handleZoomChange(zoomScale === 1 ? 1.3 : 1)}
                  title={zoomScale === 1 ? "Double click to zoom 130%" : "Double click to reset zoom"}
                >
                  <div
                    className="min-w-full min-h-full flex items-start justify-center p-3 sm:p-6"
                    style={{
                      width: zoomScale > 1 ? `${zoomScale * 100}%` : "100%",
                      minHeight: zoomScale > 1 ? `${zoomScale * 100}%` : "100%",
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt="Team Message Note Preview"
                      className="object-contain rounded-lg shadow-sm select-none transition-[width] duration-200 m-auto"
                      style={
                        zoomScale > 1
                          ? {
                              width: "100%",
                              height: "auto",
                              maxHeight: "none",
                            }
                          : {
                              width: "auto",
                              height: "auto",
                              maxHeight: "64vh",
                              maxWidth: "100%",
                            }
                      }
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Lightbox Footer Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-secondary/30 pt-3 mt-2">
                  <div className="text-left space-y-0.5">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-primary">
                      Team Farewell Message &bull; <span className="text-xs text-primary/70 font-normal">Illustrated Team Card</span>
                    </h3>
                    <p className="font-serif text-[11px] text-muted/60">
                      Tip: Scroll or drag to move anywhere. Use the slider or double-click to zoom.
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
