import React from "react";
import { 
  Code, 
  Zap, 
  Award, 
  Flame, 
  Layers, 
  Handshake, 
  Bot, 
  Video, 
  Newspaper, 
  Sparkles, 
  Users, 
  Compass, 
  FileText,
  type LucideIcon 
} from "lucide-react";
import { TimelineMilestone } from "@/types/farewell";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { BugDoodle, RocketDoodle, TrophyDoodle, SparklesDoodle, PencilDoodle, CoffeeCupDoodle } from "../../ui/Doodles";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Zap,
  Award,
  Flame,
  Layers,
  Handshake,
  Bot,
  Video,
  Newspaper,
  Sparkles,
  Users,
  Compass,
  FileText,
};

interface JourneyTimelineProps {
  milestones: TimelineMilestone[];
  part?: "left" | "right" | "all";
}

export const JourneyTimeline = ({ milestones, part = "all" }: JourneyTimelineProps) => {
  const shouldReduceMotion = useReducedMotion();

  // Slice milestones based on page part
  const displayMilestones = 
    part === "left" 
      ? milestones.slice(0, 3) 
      : part === "right" 
      ? milestones.slice(3) 
      : milestones;

  const startIndex = part === "right" ? 3 : 0;

  return (
    <div className="relative w-full max-w-xl mx-auto py-1 flex flex-col justify-between h-full">
      <div>
        {/* Chapter Header */}
        <div className="text-left mb-5 border-b border-secondary/30 pb-2.5 select-none">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
            Chapter 02 &bull; {part === "left" ? "Journey (Part I)" : part === "right" ? "Journey (Part II)" : "Milestones"}
          </span>
          <h2 className="font-serif text-lg md:text-xl font-black text-primary tracking-wide">
            {part === "right" ? "Webinars & Newsletter Wave" : "Journey in CCTech"}
          </h2>
          <p className="font-serif text-xs md:text-sm text-primary/70 italic mt-0.5">
            {part === "left"
              ? "“Trusting in God, starting out not knowing what the days ahead held...”"
              : part === "right"
              ? "“Every turn and diversion painting a beautiful story together...”"
              : "“Trusting in God, embracing every diversion and turn to paint a beautiful story.”"}
          </p>
        </div>

        {/* Dashed background timeline line */}
        <div className="absolute left-[20px] md:left-[24px] top-24 bottom-4 w-[2px] border-l-2 border-dashed border-secondary/60 pointer-events-none" aria-hidden="true" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={shouldReduceMotion ? {} : staggerContainer(0.1, 0.1)}
          className="space-y-4 md:space-y-5 text-left"
        >
          {displayMilestones.map((item, localIndex) => {
            const index = startIndex + localIndex;
            const IconComponent = iconMap[item.icon] || Code;

            return (
              <motion.div
                key={item.id}
                variants={shouldReduceMotion ? {} : fadeUp(0.4, 12)}
                className="relative pl-14 md:pl-16 flex items-start flex-col"
              >
                {/* Timeline bubble node with icon */}
                <div className="absolute left-0 top-0.5 w-[44px] h-[44px] md:w-[50px] md:h-[50px] bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-[2px_2px_0px_rgba(91,70,54,1)] text-accent z-10 select-none">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                {/* Milestone card contents */}
                <div className="bg-secondary/10 hover:bg-secondary/15 transition-all duration-300 border border-secondary/30 rounded-xl p-4 md:p-4.5 w-full relative">
                  <span className="font-mono text-[10px] md:text-xs tracking-widest text-accent font-black uppercase">
                    {item.date}
                  </span>
                  <h3 className="font-serif text-sm md:text-base text-primary font-bold mt-0.5">
                    {item.title}
                  </h3>
                  <p className="font-serif text-xs md:text-sm text-primary/80 mt-1.5 leading-relaxed pr-2">
                    {item.description}
                  </p>

                  {/* Contextual Doodle overlays */}
                  {index === 0 && (
                    <CoffeeCupDoodle
                      className="absolute -top-3 -right-3 text-accent/35 pointer-events-none hidden md:block"
                      size={34}
                      rotation={15}
                    />
                  )}
                  {index === 1 && (
                    <RocketDoodle
                      className="absolute -top-4 -right-4 text-accent/35 pointer-events-none hidden md:block"
                      size={40}
                      rotation={20}
                    />
                  )}
                  {index === 2 && (
                    <SparklesDoodle
                      className="absolute -top-3 -right-3 text-highlight/40 pointer-events-none hidden md:block"
                      size={36}
                      rotation={5}
                    />
                  )}
                  {index === 3 && (
                    <TrophyDoodle
                      className="absolute -top-4 -right-4 text-highlight/50 pointer-events-none hidden md:block"
                      size={40}
                      rotation={-10}
                    />
                  )}
                  {index === 4 && (
                    <PencilDoodle
                      className="absolute -top-3 -right-3 text-accent/35 pointer-events-none hidden md:block"
                      size={36}
                      rotation={35}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Part-specific footer decoration */}
      {part === "left" && (
        <div className="text-right pt-3 pr-2 text-[10px] md:text-xs font-serif text-accent/80 italic select-none">
          Continued on next page &rarr;
        </div>
      )}

      {part === "right" && (
        <div className="mt-4 p-3.5 bg-card/90 border-2 border-dashed border-accent/40 rounded-xl text-center relative select-none">
          <p className="font-handwritten text-sm md:text-base text-accent font-bold leading-relaxed">
            &ldquo;This way the journey took many diversions & turns to paint this beautiful journey God gave me in CCTech.&rdquo;
          </p>
          <span className="block mt-1 font-serif text-[9px] uppercase tracking-widest text-muted/60">
            ✦ A Cherished Chapter ✦
          </span>
        </div>
      )}
    </div>
  );
};
