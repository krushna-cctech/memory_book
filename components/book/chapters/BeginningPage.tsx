import React from "react";
import { motion } from "framer-motion";
import { AvatarFrame } from "../../avatar/AvatarFrame";
import { BeginningData } from "@/types/farewell";
import { fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CoffeeCupDoodle, GitBranchDoodle } from "../../ui/Doodles";

interface BeginningPageProps {
  data: BeginningData;
  name: string;
}

export const BeginningPage = ({ data, name }: BeginningPageProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center w-full space-y-6 relative py-1">
      {/* Polaroid photo container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={shouldReduceMotion ? {} : fadeUp(0.5, 20)}
        className="w-full flex justify-center"
      >
        <AvatarFrame variant="polaroid" className="max-w-[260px] w-full relative">
          {/* Overlapping Coffee Cup Doodle */}
          <CoffeeCupDoodle
            className="absolute -top-6 -right-6 text-accent/80 z-20"
            size={40}
            rotation={12}
            delay={0.4}
          />
          <div className="w-full h-36 md:h-44 bg-secondary/15 relative overflow-hidden border border-secondary/40">
            <img
              src={data.image}
              alt="First day representation"
              className="w-full h-full object-cover select-none"
            />
          </div>
          <p className="font-handwritten text-xs md:text-sm text-accent mt-2.5 text-center leading-snug select-none rotate-[-1deg] px-1 font-bold">
            {data.caption}
          </p>
        </AvatarFrame>
      </motion.div>

      {/* Diary narrative container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={shouldReduceMotion ? {} : fadeUp(0.6, 20)}
        className="w-full text-left space-y-3 font-serif relative"
      >
        <div className="flex items-center space-x-3 border-b border-secondary/40 pb-2 select-none">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
            Date Entry:
          </span>
          <span className="text-xs md:text-sm font-bold text-primary/80">
            {data.date}
          </span>
        </div>
        
        <div className="text-xs md:text-sm leading-relaxed text-primary/95 space-y-3 font-serif px-1 text-justify">
          <span className="font-serif text-3xl font-extrabold text-accent float-left mr-2 leading-none mt-0.5 select-none">
            I
          </span>
          <p className="leading-relaxed">
            {data.story}
          </p>
        </div>

        {/* Floating Git Branch Doodle */}
        <GitBranchDoodle
          className="absolute -bottom-2 right-2 text-primary/25 z-0 hidden md:block"
          size={54}
          rotation={-5}
          delay={0.8}
        />
      </motion.div>
    </div>
  );
};
