import React from "react";
import { motion } from "framer-motion";
import { TeammateMessage } from "@/types/farewell";
import { AvatarPlaceholder } from "../../avatar/AvatarPlaceholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TapeDoodle } from "../../ui/Doodles";

interface PeopleMessagesProps {
  messages: TeammateMessage[];
}

export const PeopleMessages = ({ messages }: PeopleMessagesProps) => {
  const shouldReduceMotion = useReducedMotion();

  const colorMap = {
    yellow: "bg-[#FAF0D7] border-[#E8C96A] text-[#5B4636] shadow-[2px_2px_0px_rgba(232,201,106,0.35)]",
    blue: "bg-[#E5EFF2] border-[#A7C5D3] text-[#3A4F59] shadow-[2px_2px_0px_rgba(167,197,211,0.35)]",
    pink: "bg-[#F3E8E6] border-[#D8A79E] text-[#633B36] shadow-[2px_2px_0px_rgba(216,167,158,0.35)]",
    green: "bg-[#E8EDE4] border-[#BACBB0] text-[#44503C] shadow-[2px_2px_0px_rgba(186,203,176,0.35)]",
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={shouldReduceMotion ? {} : staggerContainer(0.08, 0.05)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full py-1 text-left"
    >
      {messages.map((item, index) => {
        const rotationAngle = index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]";
        const styleClass = colorMap[item.color || "yellow"];

        return (
          <motion.div
            key={item.id}
            variants={shouldReduceMotion ? {} : fadeUp(0.4, 12)}
            className="flex pt-2" // Added padding top for the tape overlay overflow
          >
            <div
              className={`w-full p-4 border-2 rounded-xl flex flex-col justify-between transition-all duration-300 hover:rotate-0 hover:scale-[1.02] transform ${shouldReduceMotion ? "" : rotationAngle} ${styleClass} min-h-[150px] relative`}
            >
              {/* Tape Doodle on top */}
              <TapeDoodle className="-top-2.5 left-1/2 -translate-x-1/2" rotation={index % 2 === 0 ? -3 : 2} />

              {/* Sticky note text content */}
              <p className="font-handwritten text-sm md:text-base leading-relaxed mb-3">
                &ldquo;{item.message}&rdquo;
              </p>

              {/* Author signature detail */}
              <div className="flex items-center space-x-2.5 border-t border-current/10 pt-2">
                <AvatarPlaceholder
                  name={item.sender}
                  className="w-7 h-7 text-[10px] bg-current/10 border-none text-inherit font-black"
                />
                <div>
                  <h4 className="font-serif text-[11px] font-bold leading-none">
                    {item.sender}
                  </h4>
                  <span className="font-serif text-[9px] opacity-75 mt-0.5 block leading-none">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
