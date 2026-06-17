"use client";
import { motion, useTransform } from "motion/react";
import { useScrollContext } from "@/utils/useScrollContext";

interface Props {
  badge: string;
  title: string;
  subtitle: string;
}

export default function ContentReveal({ badge, title, subtitle }: Props) {
  const yPos = useScrollContext();

  const y = useTransform(yPos, [0, 0.15, 0.25, 1], [40, 0, 0, 0]);
  const opacity = useTransform(yPos, [0, 0.15, 0.25, 1], [0, 1, 1, 1]);
  const scale = useTransform(yPos, [0.1, 0.4], [0.85, 1]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="absolute z-10 mx-auto max-w-xl px-6 text-center"
    >
      <span className="bg-accent inline-block rounded px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase">
        {badge}
      </span>

      <h2 className="mt-6 font-serif text-3xl leading-tight text-balance text-gray-900 sm:text-4xl md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-md leading-relaxed text-pretty text-gray-700">
        {subtitle}
      </p>
    </motion.div>
  );
}
