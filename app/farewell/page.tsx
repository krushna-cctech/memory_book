"use client";

import React from "react";
import { BookShell } from "@/components/book/BookShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { farewell } from "@/data/farewell";
import { CoffeeCupDoodle, GitBranchDoodle, SlackHuddleDoodle, PizzaSliceDoodle, BugDoodle, LightbulbDoodle, SparklesDoodle, TeaCupDoodle, LaptopDoodle, SpectaclesDoodle, CalendarDoodle, ClockDoodle, PaperAirplaneDoodle } from "@/components/ui/Doodles";

export default function FarewellPage() {
  return (
    <PageTransition>
      <ScrollProgress />
      <main className="relative min-h-screen bg-background paper-grain w-full flex flex-col" id="memory-book-root">
        {/* Soft background vignette highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,191,163,0.12),transparent_70%)] pointer-events-none" />
        
        {/* Viewport Floating Doodles (Outside the physical book margins) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          {/* Top side background doodles */}
          <CoffeeCupDoodle
            className="absolute top-[8%] left-[6%] text-accent/20 sm:text-accent/30"
            size={60}
            rotation={-15}
            delay={0.5}
          />
          <GitBranchDoodle
            className="absolute top-[12%] right-[8%] text-primary/20 sm:text-primary/30"
            size={70}
            rotation={12}
            delay={1.3}
          />
          <BugDoodle
            className="absolute top-[42%] left-[4%] text-primary/15 sm:text-primary/25"
            size={52}
            rotation={25}
            delay={1.9}
          />
          <LaptopDoodle
            className="absolute top-[24%] left-[3%] text-primary/20 sm:text-primary/30"
            size={64}
            rotation={-5}
            delay={0.7}
          />
          <CalendarDoodle
            className="absolute top-[26%] right-[5%] text-primary/15 sm:text-primary/25"
            size={58}
            rotation={8}
            delay={2.8}
          />

          {/* Middle/Bottom side background doodles */}
          <LightbulbDoodle
            className="absolute top-[48%] right-[5%] text-highlight/25"
            size={56}
            rotation={-18}
            delay={2.7}
          />
          <SlackHuddleDoodle
            className="absolute bottom-[18%] left-[5%] text-accent/20 sm:text-accent/30"
            size={64}
            rotation={8}
            delay={2.2}
          />
          <PizzaSliceDoodle
            className="absolute bottom-[12%] right-[7%] text-accent/20 sm:text-accent/30"
            size={58}
            rotation={-20}
            delay={0.4}
          />
          <TeaCupDoodle
            className="absolute bottom-[5%] left-[28%] text-primary/15 sm:text-primary/25"
            size={50}
            rotation={10}
            delay={3.5}
          />
          <SpectaclesDoodle
            className="absolute bottom-[32%] right-[4%] text-accent/20 sm:text-accent/30"
            size={52}
            rotation={15}
            delay={1.3}
          />
          <ClockDoodle
            className="absolute bottom-[38%] left-[3%] text-muted/20 sm:text-muted/30"
            size={48}
            rotation={-10}
            delay={3.2}
          />

          {/* Background sparkles & paper planes */}
          <PaperAirplaneDoodle
            className="absolute top-[4%] right-[32%] text-highlight/20"
            size={48}
            rotation={25}
            delay={1.5}
          />
          <SparklesDoodle
            className="absolute top-[5%] left-[35%] text-highlight/15"
            size={36}
            rotation={5}
            delay={0.1}
          />
          <SparklesDoodle
            className="absolute bottom-[6%] right-[32%] text-highlight/15"
            size={40}
            rotation={-10}
            delay={3.2}
          />
        </div>

        <BookShell data={farewell} />
      </main>
    </PageTransition>
  );
}
