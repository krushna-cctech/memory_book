import React from "react";
import { motion } from "framer-motion";
import { MemoryCard } from "@/types/farewell";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PizzaSliceDoodle, TeaCupDoodle, LightbulbDoodle, CoffeeCupDoodle } from "../../ui/Doodles";

interface MemoriesGridProps {
  memories: MemoryCard[];
}

export const MemoriesGrid = ({ memories }: MemoriesGridProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={shouldReduceMotion ? {} : staggerContainer(0.08, 0.05)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full py-1"
    >
      {memories.map((item, index) => {
        // Tilted rotations to make cards look like scrapbook entries pasted on a page
        const rotations = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[-0.5deg]", "rotate-[0.5deg]"];
        const rotationClass = shouldReduceMotion ? "" : rotations[index % rotations.length];

        return (
          <motion.div
            key={item.id}
            variants={shouldReduceMotion ? {} : fadeUp(0.4, 10)}
            className="w-full flex"
          >
            <Card
              variant="default"
              className={`w-full text-left flex flex-col justify-between ${rotationClass} border-secondary/60 bg-card/85 shadow-sm hover:rotate-0 hover:scale-[1.02] transform transition-all duration-300 p-4 min-h-[140px] relative`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="accent" className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 font-black">
                    {item.category}
                  </Badge>
                  <span className="text-[10px] text-muted/30 font-serif" aria-hidden="true">#0{index + 1}</span>
                </div>
                <h3 className="font-serif text-xs md:text-sm font-bold text-primary mb-1">
                  {item.title}
                </h3>
                <p className="font-serif text-[11px] md:text-xs text-primary/80 leading-relaxed pr-6">
                  {item.description}
                </p>
              </div>

              {/* Contextual doodles for memories */}
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
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
