import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryCard } from "@/types/farewell";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PizzaSliceDoodle, TeaCupDoodle, LightbulbDoodle, CoffeeCupDoodle, TapeDoodle } from "../../ui/Doodles";
import { X, Play } from "lucide-react";

interface MemoriesGridProps {
  memories: MemoryCard[];
}

export const MemoriesGrid = ({ memories }: MemoriesGridProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedMemory, setSelectedMemory] = useState<MemoryCard | null>(null);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={shouldReduceMotion ? {} : staggerContainer(0.08, 0.05)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full py-2"
      >
        {memories.map((item, index) => {
          // Tilted rotations to make cards look like scrapbook entries pasted on a page
          const rotations = ["rotate-[-1.5deg]", "rotate-[1.5deg]", "rotate-[-0.8deg]", "rotate-[0.8deg]"];
          const rotationClass = shouldReduceMotion ? "" : rotations[index % rotations.length];
          const hasMedia = !!(item.image || item.video);

          return (
            <motion.div
              key={item.id}
              variants={shouldReduceMotion ? {} : fadeUp(0.4, 12)}
              className="w-full flex relative pt-3" // padding-top to give space for the tape doodle
            >
              {/* If card has media, we draw a TapeDoodle at the top to secure it to the "page" */}
              {hasMedia && !shouldReduceMotion && (
                <TapeDoodle 
                  className="top-0.5 left-1/2 -translate-x-1/2" 
                  rotation={index % 2 === 0 ? -2 : 3} 
                />
              )}

              <Card
                variant={hasMedia ? "polaroid" : "default"}
                className={`w-full text-left flex flex-col justify-between ${rotationClass} border-secondary/60 bg-card/85 shadow-sm hover:rotate-0 hover:scale-[1.02] transform transition-all duration-300 relative ${
                  hasMedia ? "p-3 pb-8 cursor-zoom-in" : "p-4 min-h-[140px]"
                }`}
                onClick={() => {
                  if (hasMedia) {
                    setSelectedMemory(item);
                  }
                }}
              >
                <div className="w-full flex flex-col h-full justify-between">
                  <div>
                    {/* Header: category & index */}
                    <div className="flex justify-between items-start mb-2.5">
                      <Badge variant="accent" className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 font-black">
                        {item.category}
                      </Badge>
                      <span className="text-[10px] text-muted/30 font-serif" aria-hidden="true">#0{index + 1}</span>
                    </div>

                    {/* Media Display inside the card */}
                    {item.video && (
                      <div className="relative w-full aspect-[4/3] rounded bg-secondary/15 overflow-hidden mb-3 border border-secondary/35 group select-none">
                        <video
                          src={item.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-card/95 text-primary text-[9px] uppercase font-mono tracking-wider px-2 py-1 rounded shadow-sm border border-secondary/40 font-bold">Zoom Video</span>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/60 rounded-full p-1 text-white/95 backdrop-blur-sm pointer-events-none group-hover:scale-90 transition-transform duration-300">
                          <Play size={10} className="fill-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    
                    {item.image && !item.video && (
                      <div className="relative w-full aspect-[4/3] rounded bg-secondary/15 overflow-hidden mb-3 border border-secondary/35 group select-none">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-card/95 text-primary text-[9px] uppercase font-mono tracking-wider px-2 py-1 rounded shadow-sm border border-secondary/40 font-bold">Zoom Photo</span>
                        </div>
                      </div>
                    )}

                    <h3 className="font-serif text-xs md:text-sm font-bold text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="font-serif text-[11px] md:text-xs text-primary/80 leading-relaxed pr-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Contextual doodles for memories (only if there is no media to avoid cluttering) */}
                  {!hasMedia && (
                    <>
                      {item.id === "mem-1" && (
                        <PizzaSliceDoodle
                          className="absolute bottom-2.5 right-2.5 text-accent/35 pointer-events-none"
                          size={36}
                          rotation={-15}
                          delay={0.1}
                        />
                      )}
                      {item.id === "mem-2" && (
                        <TeaCupDoodle
                          className="absolute bottom-2.5 right-2.5 text-accent/35 pointer-events-none"
                          size={36}
                          rotation={10}
                          delay={0.6}
                        />
                      )}
                      {item.id === "mem-3" && (
                        <LightbulbDoodle
                          className="absolute bottom-2.5 right-2.5 text-highlight/50 pointer-events-none"
                          size={36}
                          rotation={5}
                          delay={1.1}
                        />
                      )}
                      {item.id === "mem-4" && (
                        <CoffeeCupDoodle
                          className="absolute bottom-2.5 right-2.5 text-accent/35 pointer-events-none"
                          size={36}
                          rotation={-8}
                          delay={1.6}
                        />
                      )}
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-2xl w-full bg-card border border-secondary/50 p-5 md:p-6 rounded-lg shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close Button */}
              <button
                className="absolute -top-3 -right-3 text-white bg-primary hover:bg-accent hover:rotate-90 transition-all duration-300 p-2 rounded-full border border-secondary shadow-md cursor-pointer z-10"
                onClick={() => setSelectedMemory(null)}
                aria-label="Close lightbox"
              >
                <X size={16} />
              </button>

              {/* Lightbox Media Container */}
              <div className="w-full aspect-[4/3] max-h-[60vh] rounded bg-secondary/10 overflow-hidden border border-secondary/30 relative flex items-center justify-center">
                {selectedMemory.video ? (
                  <video
                    src={selectedMemory.video}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                    loop
                  />
                ) : selectedMemory.image ? (
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </div>

              {/* Lightbox Metadata */}
              <div className="mt-4 text-left border-t border-secondary/20 pt-3">
                <div className="flex items-center space-x-2 mb-1.5">
                  <Badge variant="accent" className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 font-black">
                    {selectedMemory.category}
                  </Badge>
                </div>
                <h3 className="font-serif text-sm md:text-base font-bold text-primary mb-1">
                  {selectedMemory.title}
                </h3>
                <p className="font-serif text-xs text-primary/80 leading-relaxed">
                  {selectedMemory.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
