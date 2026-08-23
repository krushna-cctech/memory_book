"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar } from "../avatar/Avatar";
import { AvatarFrame } from "../avatar/AvatarFrame";
import { Button } from "../ui/Button";
import { Farewell } from "@/types/farewell";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PaperclipDoodle, PencilDoodle, SparklesDoodle } from "../ui/Doodles";

interface BookCoverProps {
  data: Farewell;
  onOpen: () => void;
  isOpen: boolean;
}

export const BookCover = ({ data, onOpen, isOpen }: BookCoverProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { teammate, title, subtitle } = data;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? {} : staggerContainer(0.12, 0.1)}
      className={`relative w-full h-full bg-card border-8 border-double border-primary/95 rounded-r-md p-4 md:p-6 md:pb-5 text-center overflow-hidden flex flex-col justify-between select-none ${!isOpen ? "cursor-pointer hover:bg-card/95 transition-colors" : ""}`}
      onClick={!isOpen ? onOpen : undefined}
    >
      {/* Decorative background paper details */}
      <div className="absolute inset-0 paper-grain pointer-events-none" />
      
      {/* Gold corner ornaments */}
      <div className="absolute top-4 left-4 text-highlight text-lg z-10" aria-hidden="true">✦</div>
      <div className="absolute top-4 right-4 text-highlight text-lg z-10" aria-hidden="true">✦</div>
      <div className="absolute bottom-4 left-4 text-highlight text-lg z-10" aria-hidden="true">✦</div>
      <div className="absolute bottom-4 right-4 text-highlight text-lg z-10" aria-hidden="true">✦</div>
 
      {/* Cover Doodles */}
      <PaperclipDoodle
        className="absolute top-2 left-8 text-primary/45 z-20"
        size={32}
        rotation={-15}
        delay={0.3}
      />
      <PencilDoodle
        className="absolute bottom-4 right-10 text-accent/45 z-20"
        size={40}
        rotation={45}
        delay={1.1}
      />
      <SparklesDoodle
        className="absolute top-[35%] right-6 text-highlight/30 z-0"
        size={32}
        rotation={10}
        delay={2.5}
      />
      <SparklesDoodle
        className="absolute bottom-[35%] left-6 text-highlight/30 z-0"
        size={36}
        rotation={-5}
        delay={1.8}
      />
 
      {/* Header */}
      <motion.div variants={shouldReduceMotion ? {} : fadeUp(0.5)} className="z-10 mt-1">
        <span className="font-serif text-[10px] md:text-xs tracking-[0.25em] text-accent uppercase font-bold">
          ✦ {title} ✦
        </span>
      </motion.div>
 
      {/* Portrait block */}
      <motion.div 
        variants={shouldReduceMotion ? {} : fadeUp(0.6)} 
        className="z-10 my-1 flex flex-col items-center justify-center"
      >
        <AvatarFrame variant="antique">
          <Avatar src={teammate.avatar} name={teammate.name} size="lg" glow />
        </AvatarFrame>
      </motion.div>
 
      {/* Content */}
      <motion.div variants={shouldReduceMotion ? {} : fadeUp(0.7)} className="z-10 flex-grow flex flex-col justify-center my-1">
        <h1 className="font-serif text-xl md:text-2xl text-primary font-extrabold uppercase tracking-wide leading-tight">
          For {teammate.name}
        </h1>
        
        {teammate.joiningYear && teammate.leavingYear && (
          <p className="font-serif text-[9px] md:text-[10px] tracking-[0.2em] text-muted mt-0.5 font-bold select-none">
            {teammate.joiningYear} &mdash; {teammate.leavingYear}
          </p>
        )}
        
        <p className="font-handwritten text-lg md:text-xl text-accent rotate-[-1deg] mt-2 select-none leading-relaxed px-4">
          &ldquo;{subtitle}&rdquo;
        </p>
      </motion.div>
 
      {/* Footer / Open trigger */}
      <motion.div variants={shouldReduceMotion ? {} : fadeUp(0.8)} className="z-10 mt-4 mb-1">
        <Button 
          variant="accent" 
          size="sm" 
          onClick={onOpen}
          className="font-serif text-[10px] uppercase tracking-widest px-6 py-2"
          aria-label={`Open memory book for ${teammate.name}`}
        >
          Open the Book
        </Button>
      </motion.div>
    </motion.div>
  );
};
