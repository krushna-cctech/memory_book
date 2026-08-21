import React from "react";
import { Code, Zap, Award, Flame, type LucideIcon } from "lucide-react";
import { TimelineMilestone } from "@/types/farewell";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { BugDoodle, RocketDoodle, TrophyDoodle, SparklesDoodle } from "../../ui/Doodles";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Zap,
  Award,
  Flame,
};

interface JourneyTimelineProps {
  milestones: TimelineMilestone[];
}

export const JourneyTimeline = ({ milestones }: JourneyTimelineProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-xl mx-auto py-2">
      {/* Dashed background timeline line */}
      <div className="absolute left-[20px] md:left-[24px] top-4 bottom-4 w-[2px] border-l-2 border-dashed border-secondary/60 pointer-events-none" aria-hidden="true" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={shouldReduceMotion ? {} : staggerContainer(0.1, 0.1)}
        className="space-y-6 text-left"
      >
        {milestones.map((item) => {
          const IconComponent = iconMap[item.icon] || Code;

          return (
            <motion.div
              key={item.id}
              variants={shouldReduceMotion ? {} : fadeUp(0.4, 12)}
              className="relative pl-12 md:pl-16 flex items-start flex-col"
            >
              {/* Timeline bubble node with icon */}
              <div className="absolute left-0 top-0.5 w-[40px] h-[40px] md:w-[48px] md:h-[48px] bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-[2px_2px_0px_rgba(91,70,54,1)] text-accent z-10 select-none">
                <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
              </div>

              {/* Milestone card contents */}
              <div className="bg-secondary/10 hover:bg-secondary/15 transition-all duration-300 border border-secondary/30 rounded-xl p-4 w-full relative">
                <span className="font-mono text-[9px] tracking-widest text-accent font-black uppercase">
                  {item.date}
                </span>
                <h3 className="font-serif text-xs md:text-sm text-primary font-bold mt-0.5">
                  {item.title}
                </h3>
                <p className="font-serif text-[11px] md:text-xs text-primary/80 mt-1 leading-relaxed pr-2">
                  {item.description}
                </p>

                {/* Contextual Doodle overlays */}
                {item.id === "m-1" && (
                  <BugDoodle
                    className="absolute -top-3 -right-3 text-accent/35 pointer-events-none hidden md:block"
                    size={36}
                    rotation={15}
                  />
                )}
                {item.id === "m-2" && (
                  <RocketDoodle
                    className="absolute -top-4 -right-4 text-accent/35 pointer-events-none hidden md:block"
                    size={42}
                    rotation={20}
                  />
                )}
                {item.id === "m-3" && (
                  <TrophyDoodle
                    className="absolute -top-4 -right-4 text-highlight/50 pointer-events-none hidden md:block"
                    size={42}
                    rotation={-10}
                  />
                )}
                {item.id === "m-4" && (
                  <SparklesDoodle
                    className="absolute -top-3 -right-3 text-highlight/35 pointer-events-none hidden md:block"
                    size={36}
                    rotation={5}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
