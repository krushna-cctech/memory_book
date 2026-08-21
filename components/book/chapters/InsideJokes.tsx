import React from "react";
import { InsideJoke } from "@/types/farewell";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { GitBranchDoodle, BugDoodle, TeaCupDoodle, SlackHuddleDoodle } from "../../ui/Doodles";

interface InsideJokesProps {
  jokes: InsideJoke[];
}

export const InsideJokes = ({ jokes }: InsideJokesProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={shouldReduceMotion ? {} : staggerContainer(0.1, 0.05)}
      className="w-full space-y-6 max-w-xl mx-auto py-1 text-left relative"
    >
      {jokes.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={item.id}
            variants={shouldReduceMotion ? {} : fadeUp(0.4, 10)}
            className={`flex flex-col ${isEven ? "items-start" : "items-end"} relative w-full`}
          >
            <div
              className={`max-w-[85%] p-3.5 border-2 border-primary/95 shadow-[2px_2px_0px_rgba(91,70,54,0.15)] rounded-xl relative ${
                isEven ? "rounded-tl-none bg-card" : "rounded-tr-none bg-secondary/15"
              }`}
            >
              {/* Contextual doodles next to card bubbles */}
              {item.id === "j-1" && (
                <GitBranchDoodle
                  className={`absolute -top-4 text-primary/30 pointer-events-none hidden sm:block ${isEven ? "-right-12" : "-left-12"}`}
                  size={36}
                  rotation={-10}
                  delay={0.2}
                />
              )}
              {item.id === "j-2" && (
                <BugDoodle
                  className={`absolute -top-4 text-accent/35 pointer-events-none hidden sm:block ${isEven ? "-right-12" : "-left-12"}`}
                  size={36}
                  rotation={15}
                  delay={0.7}
                />
              )}
              {item.id === "j-3" && (
                <TeaCupDoodle
                  className={`absolute -top-4 text-accent/30 pointer-events-none hidden sm:block ${isEven ? "-right-12" : "-left-12"}`}
                  size={36}
                  rotation={-5}
                  delay={1.2}
                />
              )}
              {item.id === "j-4" && (
                <SlackHuddleDoodle
                  className={`absolute -top-4 text-accent/30 pointer-events-none hidden sm:block ${isEven ? "-right-12" : "-left-12"}`}
                  size={36}
                  rotation={8}
                  delay={1.7}
                />
              )}

              <p className="font-serif text-[11px] md:text-xs font-bold text-primary leading-relaxed">
                {item.joke}
              </p>
            </div>
            
            <span className="font-handwritten text-xs text-accent mt-1 select-none px-2 rotate-[-0.5deg] font-bold">
              &mdash; Context: {item.context}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
