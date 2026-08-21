"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DoodleProps extends Omit<HTMLMotionProps<"div">, "children" | "animate"> {
  size?: number | string;
  color?: string;
  animate?: boolean;
  delay?: number;
  rotation?: number;
}

// Reusable wrapper to handle rotation, scale, float animation and hover state
const DoodleWrapper = ({
  children,
  className,
  size = 48,
  color = "text-accent/65",
  animate = true,
  delay = 0,
  rotation = 0,
  ...props
}: DoodleProps & { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion();

  // Floating animation variant
  const floatVariants = {
    animate: {
      y: [0, -6, 0],
      rotate: [rotation - 1, rotation + 1, rotation - 1],
      transition: {
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      className={cn("pointer-events-auto select-none z-10", color, className)}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        transform: `rotate(${rotation}deg)`,
      }}
      variants={shouldReduceMotion || !animate ? {} : floatVariants}
      animate={shouldReduceMotion || !animate ? undefined : "animate"}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.1,
              rotate: [rotation, rotation - 4, rotation + 4, rotation - 2, rotation],
              transition: { duration: 0.4 },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 1. Coffee Mug Doodle
export const CoffeeCupDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Cup body */}
      <path d="M6 12 C 6 18, 7 22, 14 22 C 21 22, 22 18, 22 12 C 22 11, 6 11, 6 12 M6 12 L22 12" />
      {/* Handle */}
      <path d="M22 13.5 C 25.5 13.5, 25.5 17.5, 22 17.5" />
      {/* Steam trails */}
      <path d="M10 8 C 9.5 6, 11 5, 10 3" />
      <path d="M14 8 C 13.5 6, 15 5, 14 3" />
      <path d="M18 8 C 17.5 6, 19 5, 18 3" />
    </svg>
  </DoodleWrapper>
);

// 2. Git Branch Doodle
export const GitBranchDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Main trunk */}
      <path d="M9 4 L 9 28" />
      {/* Branch */}
      <path d="M9 20 C 13 20, 19 17, 19 12 L 19 4" />
      {/* Commit nodes */}
      <circle cx="9" cy="24" r="2.2" className="fill-card stroke-current" strokeWidth={1.5} />
      <circle cx="9" cy="16" r="2.2" className="fill-card stroke-current" strokeWidth={1.5} />
      <circle cx="9" cy="8" r="2.2" className="fill-card stroke-current" strokeWidth={1.5} />
      <circle cx="19" cy="9" r="2.2" className="fill-card stroke-current" strokeWidth={1.5} />
    </svg>
  </DoodleWrapper>
);

// 3. Slack Huddle Doodle
export const SlackHuddleDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Speech bubble */}
      <path d="M6 7 C 6 5, 26 5, 26 12 C 26 18, 21 18, 16 18 L 10 22 L 11 18 C 6 18, 6 13, 6 12 Z" />
      {/* Audio waves */}
      <path d="M11 12.5 L 11 12.5" strokeWidth={2.5} />
      <path d="M14 10 L 14 15" />
      <path d="M17 9 L 17 16" />
      <path d="M20 11 L 20 14" />
      {/* Music note */}
      <path d="M24 16 L 24 22 L 27 21 M27 18 L 27 22" strokeWidth={1.2} />
    </svg>
  </DoodleWrapper>
);

// 4. Pizza Slice Doodle
export const PizzaSliceDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Triangle slice */}
      <path d="M5 7 L 26 16 L 5 25 Z" />
      {/* Crust */}
      <path d="M5 6 C 3.5 10, 3.5 22, 5 26" />
      {/* Pepperoni circles */}
      <circle cx="9" cy="13" r="1.5" className="fill-current" />
      <circle cx="11" cy="19" r="1.5" className="fill-current" />
      <circle cx="16" cy="16" r="1.5" className="fill-current" />
    </svg>
  </DoodleWrapper>
);

// 5. Tea Cup Doodle
export const TeaCupDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Cup body */}
      <path d="M7 13 C 7 19, 19 19, 19 13 C 19 12, 7 12, 7 13 Z M7 13 L19 13" />
      {/* Handle */}
      <path d="M7 14 C 4.5 14, 4.5 17, 7 17" />
      {/* Tea bag string */}
      <path d="M15 12 C 15 9, 21 8, 22 5" />
      {/* Tag */}
      <path d="M21 5 L 25 3 L 26 6 L 22 8 Z" className="fill-card stroke-current" strokeWidth={1.2} />
    </svg>
  </DoodleWrapper>
);

// 6. Lightbulb Doodle
export const LightbulbDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Bulb shape */}
      <path d="M16 5 C 11.5 5, 10.5 10, 12 14 C 12.8 15.5, 12.8 17.5, 13.5 19 L 18.5 19 C 19.2 17.5, 19.2 15.5, 20 14 C 21.5 10, 20.5 5, 16 5 Z" />
      {/* Screw base */}
      <path d="M13.5 19 L 18.5 19 M13.5 21 L 18.5 21 M14.5 23 L 17.5 23" />
      {/* Filament */}
      <path d="M14 13 C 14 11.5, 15 10.5, 16 10.5 C 17 10.5, 18 11.5, 18 13" />
      {/* Ray lines */}
      <path d="M16 2 L 16 3" />
      <path d="M7.5 7.5 L 9 9" />
      <path d="M24.5 7.5 L 23 9" />
      <path d="M4 16 L 5.5 16" />
      <path d="M28 16 L 26.5 16" />
    </svg>
  </DoodleWrapper>
);

// 7. Bug Doodle
export const BugDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Body */}
      <path d="M16 8 C 12.5 8, 12.5 24, 16 24 C 19.5 24, 19.5 8, 16 8 Z" />
      <path d="M12.5 16 L 19.5 16" />
      {/* Head */}
      <path d="M14 8 C 14 6.5, 18 6.5, 18 8" />
      {/* Antennae */}
      <path d="M14 6.5 C 13.5 5, 12.5 4.5, 11.5 4.5 M18 6.5 C 18.5 5, 19.5 4.5, 20.5 4.5" />
      {/* Legs (Left) */}
      <path d="M13.5 12 L 8.5 10" />
      <path d="M12.5 16 L 7.5 16" />
      <path d="M13.5 20 L 8.5 22" />
      {/* Legs (Right) */}
      <path d="M18.5 12 L 23.5 10" />
      <path d="M19.5 16 L 24.5 16" />
      <path d="M18.5 20 L 23.5 22" />
    </svg>
  </DoodleWrapper>
);

// 8. Pencil Doodle
export const PencilDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Pencil shaft */}
      <path d="M6 24 L 21 9 L 23 11 L 8 26 Z" />
      {/* Eraser cap */}
      <path d="M21 9 L 23 11 L 25 9 L 23 7 Z" className="fill-current/15" />
      {/* Lead tip */}
      <path d="M6 24 L 3 29 L 8 26 Z M3 29 L 5 27.5" className="fill-current" />
      {/* Little writing loop */}
      <path d="M3 29 C 1.5 32, 10 32, 12 30 C 13.5 28.5, 18 28.5, 20 30" strokeWidth={1.2} />
    </svg>
  </DoodleWrapper>
);

// 9. Paperclip Doodle
export const PaperclipDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 13 L 9 21 C 9 24.5, 12.5 27, 16 27 C 19.5 27, 23 24.5, 23 21 L 23 9 C 23 5.5, 19.5 3, 16 3 C 12.5 3, 9.5 5.5, 9.5 9 L 9.5 20 C 9.5 22.5, 12 24.5, 15 24.5 C 18 24.5, 20 22.5, 20 20 L 20 10" />
    </svg>
  </DoodleWrapper>
);

// 10. Trophy Doodle
export const TrophyDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Cup bowl */}
      <path d="M9 6 L 23 6 L 23 15 C 23 19, 9 19, 9 15 Z Z M9 6 Z" />
      {/* Left handle */}
      <path d="M9 8 C 6.5 8, 6.5 12, 9 12" />
      {/* Right handle */}
      <path d="M23 8 C 25.5 8, 25.5 12, 23 12" />
      {/* Stem & base */}
      <path d="M16 19 L 16 24 M11 24 L 21 24" strokeWidth={2.0} />
      {/* Star detailing inside */}
      <path d="M16 10 L 16 14 M14 12 L 18 12" strokeWidth={1.2} />
    </svg>
  </DoodleWrapper>
);

// 11. Rocket Doodle
export const RocketDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Rocket fuselage */}
      <path d="M16 4 C 18.5 8, 20.5 12, 20.5 18 L 11.5 18 C 11.5 12, 13.5 8, 16 4 Z" />
      {/* Fins */}
      <path d="M11.5 16 L 8 20 L 11.5 18 Z" />
      <path d="M20.5 16 L 24 20 L 20.5 18 Z" />
      {/* Port window */}
      <circle cx="16" cy="12" r="2" />
      {/* Flames */}
      <path d="M13.5 19 L 13.5 22 M16 19 L 16 24 M18.5 19 L 18.5 22" strokeWidth={1.2} />
    </svg>
  </DoodleWrapper>
);

// 12. Sparkles Doodle
export const SparklesDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Main Sparkle */}
      <path d="M16 10 C 16 13, 16 13, 19 13 C 16 13, 16 13, 16 16 C 16 13, 16 13, 13 13 C 16 13, 16 13, 16 10 Z" className="fill-current" />
      {/* Small Sparkle Bottom-Left */}
      <path d="M8 20 C 8 21.5, 8 21.5, 9.5 21.5 C 8 21.5, 8 21.5, 8 23 C 8 21.5, 8 21.5, 6.5 21.5 C 8 21.5, 8 21.5, 8 20 Z" />
      {/* Small Sparkle Top-Right */}
      <path d="M24 6 C 24 7.5, 24 7.5, 25.5 7.5 C 24 7.5, 24 7.5, 24 9 C 24 7.5, 24 7.5, 22.5 7.5 C 24 7.5, 24 7.5, 24 6 Z" />
      {/* Random small dots */}
      <circle cx="21" cy="18" r="0.6" className="fill-current stroke-none" />
      <circle cx="10" cy="9" r="0.6" className="fill-current stroke-none" />
    </svg>
  </DoodleWrapper>
);

// 13. Heart Doodle
export const HeartDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 23.5 C 16 23.5, 6 15, 6 10 C 6 6.5, 9.5 5, 12.5 7 C 14.5 8, 16 9.5, 16 9.5 C 16 9.5, 17.5 8, 19.5 7 C 22.5 5, 26 6.5, 26 10 C 26 15, 16 23.5, 16 23.5 Z" />
    </svg>
  </DoodleWrapper>
);

// 14. Washi Tape Doodle overlay (for cards)
// Creates a simple tilted tape visual to overlap edges
export const TapeDoodle = ({ className, rotation = -3 }: { className?: string; rotation?: number }) => (
  <div
    className={cn(
      "absolute w-14 h-4 bg-secondary/35 border-x border-dashed border-secondary/70 backdrop-blur-[0.5px] pointer-events-none select-none z-20 shadow-[0.5px_0.5px_2px_rgba(91,70,54,0.05)]",
      className
    )}
    style={{
      transform: `rotate(${rotation}deg)`,
      clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
    }}
  />
);

// 15. Laptop Doodle
export const LaptopDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Screen frame */}
      <path d="M6 7 L 26 7 L 26 21 L 6 21 Z" />
      {/* Keyboard base */}
      <path d="M4 21 L 28 21 L 26 25 L 6 25 Z" />
      {/* Code lines on screen */}
      <path d="M9 11 L 18 11" strokeWidth={1.2} />
      <path d="M9 14 L 22 14" strokeWidth={1.2} />
      <path d="M9 17 L 15 17" strokeWidth={1.2} />
      {/* Trackpad */}
      <path d="M14 22 H 18" strokeWidth={1.0} />
    </svg>
  </DoodleWrapper>
);

// 16. Spectacles Doodle (Screen Glasses)
export const SpectaclesDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Left frame */}
      <path d="M6 14 C 6 11, 13 11, 13 14 C 13 18, 6 18, 6 14 Z" />
      {/* Right frame */}
      <path d="M19 14 C 19 11, 26 11, 26 14 C 26 18, 19 18, 19 14 Z" />
      {/* Bridge connector */}
      <path d="M13 14 C 14.5 12.5, 17.5 12.5, 19 14" />
      {/* Left temple */}
      <path d="M6 13 L 2 11" />
      {/* Right temple */}
      <path d="M26 13 L 30 11" />
    </svg>
  </DoodleWrapper>
);

// 17. Calendar Doodle
export const CalendarDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Calendar page sheet */}
      <path d="M7 6 L 25 6 L 25 26 L 7 26 Z" />
      {/* Spiral binding rings */}
      <path d="M11 4 L 11 8" />
      <path d="M16 4 L 16 8" />
      <path d="M21 4 L 21 8" />
      {/* Horizontal divider */}
      <path d="M7 12 H 25" />
      {/* Grids / Date lines */}
      <path d="M11 16 H 13" strokeWidth={2.0} />
      <path d="M16 16 H 18" strokeWidth={2.0} />
      <path d="M21 16 H 23" strokeWidth={2.0} />
      <path d="M11 21 H 13" strokeWidth={2.0} />
      <path d="M16 21 H 18" strokeWidth={2.0} />
      <path d="M21 21 H 23" strokeWidth={2.0} />
    </svg>
  </DoodleWrapper>
);

// 18. Clock Doodle
export const ClockDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Clock outline */}
      <circle cx="16" cy="16" r="10" />
      {/* Hands pointing to 3:00 (Crash Hour) */}
      <path d="M16 16 L 22 16" />
      <path d="M16 16 L 16 10" />
      {/* Small marker ticks */}
      <path d="M16 6 V 8" />
      <path d="M26 16 H 24" />
      <path d="M16 26 V 24" />
      <path d="M6 16 H 8" />
    </svg>
  </DoodleWrapper>
);

// 19. Paper Airplane Doodle
export const PaperAirplaneDoodle = (props: DoodleProps) => (
  <DoodleWrapper {...props}>
    <svg viewBox="0 0 32 32" className="w-full h-full fill-none stroke-current" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Folded paper wing */}
      <path d="M4 14 L 28 6 L 19 22 L 15 16 Z" />
      {/* Center fold crease */}
      <path d="M28 6 L 15 16" />
      {/* Bottom fold foldout */}
      <path d="M15 16 L 12 21 L 13 17" />
    </svg>
  </DoodleWrapper>
);
