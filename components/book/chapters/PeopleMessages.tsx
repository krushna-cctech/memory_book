import React from "react";
import { motion } from "framer-motion";
import { TeammateMessage } from "@/types/farewell";
import { AvatarPlaceholder } from "../../avatar/AvatarPlaceholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TapeDoodle, HeartDoodle, SparklesDoodle, CoffeeCupDoodle } from "../../ui/Doodles";

interface PeopleMessagesProps {
  messages?: TeammateMessage[];
  message?: TeammateMessage;
  index?: number;
  total?: number;
}

export const PeopleMessages = ({
  messages,
  message,
  index = 0,
  total = 4,
}: PeopleMessagesProps) => {
  const shouldReduceMotion = useReducedMotion();

  // If a single message is passed, use it; otherwise pick from messages array
  const currentMessage: TeammateMessage | undefined =
    message || (messages && messages[index]);

  if (!currentMessage) return null;

  const colorStyles: Record<
    string,
    {
      cardBg: string;
      borderColor: string;
      textColor: string;
      quoteColor: string;
      accentBg: string;
      tapeRotation: number;
    }
  > = {
    yellow: {
      cardBg: "bg-[#FAF2DE]",
      borderColor: "border-[#E8C96A]/60",
      textColor: "text-[#4A3728]",
      quoteColor: "text-[#C49B38]",
      accentBg: "bg-[#E8C96A]/25 text-[#6B4E2E]",
      tapeRotation: -3,
    },
    blue: {
      cardBg: "bg-[#EBF3F6]",
      borderColor: "border-[#A7C5D3]/60",
      textColor: "text-[#2B3E48]",
      quoteColor: "text-[#5B889E]",
      accentBg: "bg-[#A7C5D3]/25 text-[#2C4857]",
      tapeRotation: 2,
    },
    pink: {
      cardBg: "bg-[#F7ECE9]",
      borderColor: "border-[#D8A79E]/60",
      textColor: "text-[#542F2A]",
      quoteColor: "text-[#B86B60]",
      accentBg: "bg-[#D8A79E]/25 text-[#5F302A]",
      tapeRotation: -2,
    },
    green: {
      cardBg: "bg-[#EDF3EA]",
      borderColor: "border-[#BACBB0]/60",
      textColor: "text-[#35432E]",
      quoteColor: "text-[#638055]",
      accentBg: "bg-[#BACBB0]/25 text-[#374C2E]",
      tapeRotation: 3,
    },
  };

  const style =
    colorStyles[currentMessage.color || "yellow"] || colorStyles.yellow;

  return (
    <div className="relative w-full max-w-xl mx-auto py-1 flex flex-col justify-between h-full">
      <div>
        {/* Chapter Header */}
        <div className="text-left mb-4 border-b border-secondary/30 pb-2.5 select-none">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent font-black">
              Chapter 04 &bull; Words from the Team
            </span>
            <span className="text-[10px] font-mono text-muted/50 font-bold uppercase tracking-wider">
              Note 0{index + 1} of 0{total}
            </span>
          </div>
          <h2 className="font-serif text-lg md:text-xl font-black text-primary tracking-wide mt-0.5">
            Personal Note &bull; {currentMessage.sender}
          </h2>
          <p className="font-serif text-xs md:text-sm text-primary/70 italic mt-0.5">
            “Heartfelt messages, memories, and warm wishes from your teammates.”
          </p>
        </div>

        {/* Full-Page Single Note Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={shouldReduceMotion ? {} : staggerContainer(0.08, 0.05)}
          className="w-full pt-3"
        >
          <motion.div
            variants={shouldReduceMotion ? {} : fadeUp(0.4, 12)}
            className="relative"
          >
            {/* Antique Tape Doodle holding the top of the sticky note */}
            {!shouldReduceMotion && (
              <TapeDoodle
                className="-top-3 left-1/2 -translate-x-1/2 z-20"
                rotation={style.tapeRotation}
              />
            )}

            <div
              className={`w-full p-6 md:p-8 border-2 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-[3px_3px_0px_rgba(91,70,54,0.15)] relative ${style.cardBg} ${style.borderColor} ${style.textColor}`}
            >
              {/* Decorative background quote mark */}
              <span
                className={`absolute top-4 right-6 font-serif text-7xl select-none pointer-events-none opacity-20 ${style.quoteColor}`}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Note Content */}
              <div className="relative z-10">
                <p className="font-handwritten text-base sm:text-lg md:text-[19px] leading-relaxed mb-6 font-bold whitespace-pre-line text-left">
                  &ldquo;{currentMessage.message}&rdquo;
                </p>
              </div>

              {/* Author Signature & Role Badge */}
              <div className="flex items-center justify-between border-t border-current/15 pt-4 mt-2 relative z-10">
                <div className="flex items-center space-x-3.5 text-left">
                  <AvatarPlaceholder
                    name={currentMessage.sender}
                    className={`w-11 h-11 text-sm font-black border-2 border-current/20 shadow-sm ${style.accentBg}`}
                  />
                  <div>
                    <h4 className="font-serif text-sm md:text-base font-black uppercase tracking-wide leading-tight">
                      {currentMessage.sender}
                    </h4>
                    <span className="font-serif text-xs opacity-80 mt-0.5 block font-bold tracking-wider uppercase">
                      {currentMessage.role}
                    </span>
                  </div>
                </div>

                {/* Subtle Decorative Icon */}
                <div className="select-none pointer-events-none opacity-40">
                  {index % 2 === 0 ? (
                    <HeartDoodle size={26} className="text-current" />
                  ) : (
                    <SparklesDoodle size={26} className="text-current" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Page Footer Navigation Hint */}
      {index < total - 1 ? (
        <div className="text-right pt-3 pr-2 text-[10px] md:text-xs font-serif text-accent/80 italic select-none">
          Next message on next page &rarr;
        </div>
      ) : (
        <div className="mt-3 p-3 bg-card/90 border-2 border-dashed border-accent/40 rounded-xl text-center relative select-none">
          <p className="font-handwritten text-sm md:text-base text-accent font-bold leading-relaxed">
            &ldquo;We will always cherish the laughter, dedication, and memories you brought to our team.&rdquo;
          </p>
          <span className="block mt-0.5 font-serif text-[9px] uppercase tracking-widest text-muted/60">
            ✦ A Team That Inspires Together ✦
          </span>
        </div>
      )}
    </div>
  );
};

