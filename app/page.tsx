"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar } from "@/components/avatar/Avatar";
import { AvatarFrame } from "@/components/avatar/AvatarFrame";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { farewell } from "@/data/farewell";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { CoffeeCupDoodle, GitBranchDoodle, SparklesDoodle, SlackHuddleDoodle, PizzaSliceDoodle, BugDoodle, LightbulbDoodle, TeaCupDoodle, PencilDoodle, LaptopDoodle, SpectaclesDoodle, CalendarDoodle, ClockDoodle, PaperAirplaneDoodle } from "@/components/ui/Doodles";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { teammate, title } = farewell;

  return (
    <PageTransition>
      <main className="relative flex-grow flex items-center justify-center min-h-screen py-16 overflow-hidden bg-background paper-grain">
        
        {/* Soft background radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,191,163,0.15),transparent_70%)] pointer-events-none" />

        {/* Floating Doodles (Medium Dense Arrangement) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          {/* Top Row Doodles */}
          <CoffeeCupDoodle
            className="absolute top-[8%] right-[12%] text-accent/25 sm:text-accent/35"
            size={68}
            rotation={14}
            delay={0.2}
          />
          <BugDoodle
            className="absolute top-[10%] left-[10%] text-primary/20 sm:text-primary/30"
            size={56}
            rotation={-18}
            delay={0.6}
          />
          <PencilDoodle
            className="absolute top-[6%] left-[45%] text-accent/15 sm:text-accent/25"
            size={60}
            rotation={35}
            delay={1.9}
          />
          <PaperAirplaneDoodle
            className="absolute top-[5%] right-[28%] text-highlight/25"
            size={48}
            rotation={25}
            delay={1.5}
          />

          {/* Middle Row Doodles */}
          <SlackHuddleDoodle
            className="absolute top-[40%] left-[6%] text-accent/20 sm:text-accent/30"
            size={64}
            rotation={10}
            delay={2.4}
          />
          <LightbulbDoodle
            className="absolute top-[38%] right-[6%] text-highlight/30"
            size={62}
            rotation={-12}
            delay={1.1}
          />
          <LaptopDoodle
            className="absolute top-[22%] left-[4%] text-primary/20 sm:text-primary/30"
            size={68}
            rotation={-5}
            delay={0.7}
          />
          <SpectaclesDoodle
            className="absolute bottom-[38%] right-[6%] text-accent/20 sm:text-accent/30"
            size={56}
            rotation={15}
            delay={1.3}
          />
          <CalendarDoodle
            className="absolute top-[20%] right-[16%] text-primary/15 sm:text-primary/25"
            size={60}
            rotation={8}
            delay={2.8}
          />
          <ClockDoodle
            className="absolute bottom-[24%] left-[12%] text-muted/25 sm:text-muted/35"
            size={52}
            rotation={-10}
            delay={3.2}
          />

          {/* Bottom Row Doodles */}
          <GitBranchDoodle
            className="absolute bottom-[10%] left-[8%] text-primary/25 sm:text-primary/35"
            size={80}
            rotation={-8}
            delay={0.8}
          />
          <PizzaSliceDoodle
            className="absolute bottom-[8%] right-[10%] text-accent/25 sm:text-accent/35"
            size={68}
            rotation={-25}
            delay={1.4}
          />
          <TeaCupDoodle
            className="absolute bottom-[6%] left-[42%] text-primary/15 sm:text-primary/25"
            size={56}
            rotation={8}
            delay={3.1}
          />

          {/* Sparkles Floating Around */}
          <SparklesDoodle
            className="absolute top-[26%] left-[22%] text-highlight/20"
            size={40}
            rotation={15}
            delay={1.5}
          />
          <SparklesDoodle
            className="absolute bottom-[28%] right-[24%] text-highlight/20"
            size={44}
            rotation={-10}
            delay={2.2}
          />
        </div>

        <Container className="z-10 max-w-xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={shouldReduceMotion ? {} : staggerContainer(0.12, 0.1)}
            className="flex flex-col items-center space-y-8"
          >
            {/* 1. Eyebrow Header */}
            <motion.div variants={shouldReduceMotion ? {} : fadeUp(0.5)}>
              <span className="font-serif text-xs md:text-sm tracking-[0.3em] text-accent uppercase font-extrabold select-none">
                ✦ {title} ✦
              </span>
            </motion.div>

            {/* 2. Artistic Dedication Tags */}
            <motion.div variants={shouldReduceMotion ? {} : fadeUp(0.55)} className="space-y-1 select-none">
              <h2 className="font-handwritten text-3xl text-primary rotate-[-1.5deg]">
                Four years.
              </h2>
              <p className="font-handwritten text-2xl text-accent rotate-[1.5deg] mt-0.5">
                Countless memories.
              </p>
            </motion.div>

            {/* 3. Avatar Portrait Framed */}
            <motion.div 
              variants={shouldReduceMotion ? {} : fadeUp(0.6)}
              className="py-2"
            >
              <AvatarFrame variant="polaroid">
                <Avatar 
                  src={teammate.avatar} 
                  name={teammate.name} 
                  size="xl" 
                  className="rounded-none border-none shadow-none w-28 h-28" 
                />
                <div className="mt-3 font-serif text-[10px] font-bold text-primary/70 tracking-widest uppercase select-none">
                  {teammate.name}
                </div>
              </AvatarFrame>
            </motion.div>

            {/* 4. Dedication Details */}
            <motion.div variants={shouldReduceMotion ? {} : fadeUp(0.65)} className="space-y-1.5">
              <h1 className="font-serif text-2xl md:text-3xl text-primary font-black uppercase tracking-wide">
                {teammate.name}
              </h1>
              {teammate.joiningYear && teammate.leavingYear && (
                <p className="font-serif text-xs tracking-[0.2em] text-muted font-bold select-none">
                  {teammate.joiningYear} &mdash; {teammate.leavingYear}
                </p>
              )}
            </motion.div>

            {/* 5. Narrative Text */}
            <motion.p 
              variants={shouldReduceMotion ? {} : fadeUp(0.7)}
              className="font-serif text-xs md:text-sm text-primary/80 max-w-sm leading-relaxed px-4"
            >
              A collection of moments, stories and memories from our journey together.
            </motion.p>

            {/* 6. Navigation Button */}
            <motion.div variants={shouldReduceMotion ? {} : fadeUp(0.75)} className="pt-2">
              <Link href="/farewell" passHref legacyBehavior>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="font-serif text-xs uppercase tracking-widest px-8 py-4 group"
                  aria-label="Open the memory book"
                >
                  Open the Book 
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 ml-2 font-sans" aria-hidden="true">&rarr;</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </main>
    </PageTransition>
  );
}
