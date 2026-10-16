"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

export default function AnimatedNumber({
  value,
  format,
  instant = false,
}: {
  value: number;
  format: (n: number) => string;
  instant?: boolean;
}) {
  const motionValue = useMotionValue(value);
  const text = useTransform(motionValue, format);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (instant || reduceMotion) {
      motionValue.jump(value);
      return;
    }
    const controls = animate(motionValue, value, { type: "spring", duration: 0.4, bounce: 0 });
    return () => controls.stop();
  }, [value, instant, reduceMotion, motionValue]);

  return <motion.span>{text}</motion.span>;
}
