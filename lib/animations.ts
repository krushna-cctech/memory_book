import { Variants } from "framer-motion";

export const fadeIn = (duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration, ease: "easeOut" }
  }
});

export const fadeUp = (duration = 0.6, distance = 24): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] } // Custom cubic-bezier for slick momentum
  }
});

export const fadeDown = (duration = 0.6, distance = 24): Variants => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] }
  }
});

export const scaleIn = (duration = 0.5, initialScale = 0.95): Variants => ({
  hidden: { opacity: 0, scale: initialScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: [0.22, 1, 0.36, 1] }
  }
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export const coverOpen = (shouldReduceMotion = false): Variants => ({
  closed: {
    transform: "scale(1) rotate(0deg) translateX(0%)",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  },
  open: {
    transform: shouldReduceMotion 
      ? "scale(1) rotate(0deg) translateX(0%)" 
      : "scale(1.05) rotate(-3deg) translateX(-100%)",
    opacity: shouldReduceMotion ? 0 : 0,
    transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
  }
});
