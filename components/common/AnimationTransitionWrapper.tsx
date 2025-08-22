// components/common/AnimationTransitionWrapper.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationType =
  | "fade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "blur";

interface AnimationTransitionWrapperProps {
  children: ReactNode;
  /** Jenis animasi yang ingin ditampilkan */
  animation?: AnimationType;
  /** Durasi animasi dalam detik */
  duration?: number;
  /** Delay sebelum animasi dimulai */
  delay?: number;
  /** Stagger delay untuk multiple children (berguna untuk list items) */
  staggerDelay?: number;
  /** Custom className */
  className?: string;
  /** Threshold untuk intersection observer (0-1) */
  threshold?: number;
  /** Root margin untuk intersection observer */
  rootMargin?: string;
  /** Apakah animasi harus diulang setiap kali masuk viewport */
  repeatOnEnter?: boolean;
  /** Custom initial state */
  initial?: any;
  /** Custom animate state */
  animate?: any;
  /** Custom exit state */
  exit?: any;
}

// Predefined animation variants
const animationVariants: Record<AnimationType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export default function AnimationTransitionWrapper({
  children,
  animation = "fade",
  duration = 0.6,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -100px 0px",
  repeatOnEnter = true,
  initial,
  animate,
  exit,
}: AnimationTransitionWrapperProps) {
  const variants = animationVariants[animation];

  const motionProps = {
    initial: initial || variants.hidden,
    whileInView: animate || variants.visible,
    exit: exit || variants.hidden,
    viewport: {
      threshold,
      rootMargin,
      once: !repeatOnEnter, // jika repeatOnEnter false, animasi hanya sekali
    },
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing yang lebih smooth
      staggerChildren: staggerDelay,
    },
  };

  return (
    <motion.div
      className={className}
      {...motionProps}
      style={{
        // Prevent vertical scroll issues
        overflowX: "visible",
        overflowY: "visible",
      }}
    >
      {children}
    </motion.div>
  );
}

// Hook untuk staggered children animations
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = "",
  ...props
}: Omit<AnimationTransitionWrapperProps, "staggerDelay"> & {
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ threshold: 0.1, once: false }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Individual staggered item
export const StaggerItem = ({
  children,
  animation = "slideUp",
  duration = 0.6,
  className = "",
}: {
  children: ReactNode;
  animation?: AnimationType;
  duration?: number;
  className?: string;
}) => {
  const variants = animationVariants[animation];

  return (
    <motion.div
      variants={variants}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
