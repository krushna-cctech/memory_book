"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoodbyeLetterData } from "@/types/farewell";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SparklesDoodle, HeartDoodle } from "../../ui/Doodles";

interface GoodbyeLetterProps {
  data: GoodbyeLetterData;
  hideSignatures?: boolean;
}

export const GoodbyeLetter = ({ data, hideSignatures = false }: GoodbyeLetterProps) => {
  const [opened, setOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-2 flex flex-col items-center justify-center min-h-[340px]">
      <AnimatePresence mode="wait">
        {!opened ? (
          // Sealed Envelope View
          <motion.div
            key="envelope"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <button
              onClick={handleOpen}
              className="w-full relative bg-[#F5E6D3] border-4 border-primary rounded-xl p-10 md:p-12 shadow-md flex flex-col items-center justify-center hover:scale-[1.03] transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent overflow-hidden"
              aria-label="Click to open the final letter"
            >
              {/* Back flap lines */}
              <div className="absolute inset-0 border-t-[90px] border-t-transparent border-r-[220px] border-r-[#FAF0D7]/20 border-b-[90px] border-b-transparent border-l-[220px] border-l-[#FAF0D7]/20 pointer-events-none" />
              
              {/* Sealed Envelope Sparkles */}
              <SparklesDoodle className="absolute top-3 right-3 text-highlight/30 pointer-events-none" size={32} />

              <div className="w-16 h-16 rounded-full bg-accent border-2 border-primary flex items-center justify-center text-card text-2xl shadow-md z-10 select-none">
                ✉️
              </div>
              
              <h3 className="font-serif text-sm md:text-base font-bold text-primary mt-4 z-10 select-none tracking-wide">
                Letter from the Team
              </h3>
              
              <span className="font-handwritten text-sm text-accent mt-2 z-10 select-none font-bold">
                (Click to break seal and read)
              </span>
            </button>
          </motion.div>
        ) : (
          // Opened Letter View
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-[#FAF6F0] border border-secondary p-6 md:p-10 rounded-xl shadow-inner text-left font-serif relative overflow-hidden"
          >
            {/* Sparkles Doodle */}
            <SparklesDoodle className="absolute top-3 right-3 text-highlight/25 pointer-events-none" size={36} />

            <h3 className="font-serif text-sm md:text-base font-bold text-primary mb-3.5 border-b border-secondary/30 pb-2 select-none">
              {data.salutation}
            </h3>

            <div className="space-y-4 text-xs md:text-sm leading-relaxed text-primary/95 text-justify">
              {data.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-3.5 border-t border-secondary/30 relative">
              <p className="font-serif text-sm italic text-primary/80 mb-3 select-none">
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

            {/* Close letter option */}
            <div className="text-center mt-6">
              <button
                onClick={() => setOpened(false)}
                className="text-[10px] md:text-xs uppercase tracking-widest text-muted hover:text-accent font-bold underline cursor-pointer focus:outline-none"
              >
                Put back in envelope
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
