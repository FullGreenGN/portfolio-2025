"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MotionScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionScroll({ children, className }: MotionScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

