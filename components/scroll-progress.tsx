"use client";

import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-primary/80 via-primary to-primary/60"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

