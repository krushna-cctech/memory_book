"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageEnter } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={shouldReduceMotion ? {} : pageEnter}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
};
