"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoodbyeLetterData } from "@/types/farewell";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SparklesDoodle, HeartDoodle } from "../../ui/Doodles";

interface GoodbyeLetterProps {
  data: GoodbyeLetterData;
}

export const GoodbyeLetter = ({ data }: GoodbyeLetterProps) => {
  const [opened, setOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-2 flex flex-col items-center justify-center min-h-[300px]">
      <AnimatePresence mode="wait">
        {!opened ? (
          // Sealed Envelope View
          <motion.div
            key="envelope"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm"
          >
            <button
              onClick={handleOpen}
              className="w-full relative bg-[#F5E6D3] border-4 border-primary rounded-xl p-8 shadow-md flex flex-col items-center justify-center hover:scale-[1.03] transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent overflow-hidden"
              aria-label="Click to open the final letter"
            >
              {/* Back flap lines */}
              <div className="absolute inset-0 border-t-[80px] border-t-transparent border-r-[180px] border-r-[#FAF0D7]/20 border-b-[80px] border-b-transparent border-l-[180px] border-l-[#FAF0D7]/20 pointer-events-none" />
              
              {/* Sealed Envelope Sparkles */}
              <SparklesDoodle className="absolute top-2 right-2 text-highlight/30 pointer-events-none" size={28} />

              <div className="w-14 h-14 rounded-full bg-accent border-2 border-primary flex items-center justify-center text-card text-xl shadow-md z-10 select-none">
                ✉️
              </div>
              
              <h3 className="font-serif text-xs md:text-sm font-bold text-primary mt-4 z-10 select-none tracking-wide">
                Riyaelza&apos;s Letter from the Team
              </h3>
              
              <span className="font-handwritten text-xs text-accent mt-2 z-10 select-none font-bold">
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
            className="w-full bg-[#FAF6F0] border border-secondary p-5 md:p-8 rounded-xl shadow-inner text-left font-serif relative overflow-hidden"
          >
            {/* Sparkles Doodle */}
            <SparklesDoodle className="absolute top-2 right-2 text-highlight/25 pointer-events-none" size={32} />

            <h3 className="font-serif text-xs md:text-sm font-bold text-primary mb-3 border-b border-secondary/30 pb-2 select-none">
              {data.salutation}
            </h3>

            <div className="space-y-3.5 text-[11px] md:text-xs leading-relaxed text-primary/95 text-justify">
              {data.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t border-secondary/30 relative">
              <p className="font-serif text-xs italic text-primary/80 mb-3 select-none">
                {data.valediction}
              </p>
              
              {/* Signatures collage */}
              <div className="grid grid-cols-3 gap-y-1.5 gap-x-4 select-none pr-8">
                {data.signatures.map((sig, idx) => {
                  const tilts = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[4deg]"];
                  const tiltClass = tilts[idx % tilts.length];
                  return (
                    <span
                      key={idx}
                      className={`font-handwritten text-base md:text-lg text-accent font-extrabold ${tiltClass}`}
                    >
                      {sig}
                    </span>
                  );
                })}
              </div>

              {/* Heart Doodle near signatures */}
              <HeartDoodle className="absolute bottom-1 right-2 text-accent/40 pointer-events-none" size={28} rotation={8} />
            </div>

            {/* Close letter option */}
            <div className="text-center mt-6">
              <button
                onClick={() => setOpened(false)}
                className="text-[9px] uppercase tracking-widest text-muted hover:text-accent font-bold underline cursor-pointer focus:outline-none"
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
