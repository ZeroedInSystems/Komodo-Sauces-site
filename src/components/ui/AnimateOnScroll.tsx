"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  /** Additional delay in seconds on top of any parent stagger. */
  delay?: number;
  /** Override the default fade-up Y distance (px). */
  distance?: number;
  /** Animation duration in seconds. Default: 0.5 */
  duration?: number;
  /** Intersection margin before animation triggers. Default: "-80px" */
  margin?: string;
  className?: string;
}

const buildVariants = (distance: number, duration: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: "easeOut" },
  },
});

/**
 * Wraps any content in a Framer Motion `whileInView` fade-up animation.
 * Triggers once — will NOT re-animate on scroll back up.
 *
 * @example
 * <AnimateOnScroll delay={0.1}>
 *   <p>This fades up when it enters the viewport.</p>
 * </AnimateOnScroll>
 */
export function AnimateOnScroll({
  children,
  delay = 0,
  distance = 24,
  duration = 0.5,
  margin = "-80px",
  className,
}: AnimateOnScrollProps) {
  const variants = buildVariants(distance, duration);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
