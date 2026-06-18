"use client";
import { motion, useTransform } from "motion/react";
import { useScrollContext } from "@/hooks/useScrollContext";

interface Props {
  title: string;
  subtitle: string;
  button: {
    label: string;
    href: string;
  };
}

export default function CallToAction({ title, subtitle, button }: Props) {
  const yPos = useScrollContext();

  const headingColor = useTransform(yPos, [0, 0.9], ["#202224", "#ffffff"]);
  const paragraphColor = useTransform(yPos, [0, 0.7], ["#202224", "#d1d5db"]);
  const containerY = useTransform(yPos, [0, 0.5], ["-15%", "0%"]);

  return (
    <motion.div
      style={{ top: containerY }}
      className="pointer-events-none absolute z-20 flex h-full max-w-3xl flex-col items-center justify-center px-4 text-center"
    >
      <motion.h1
        style={{ color: headingColor }}
        className="mb-4 font-serif text-4xl leading-none font-medium text-balance md:text-6xl"
      >
        {title}
      </motion.h1>

      <motion.p
        style={{ color: paragraphColor }}
        className="mb-10 max-w-2xl text-lg text-balance md:text-xl"
      >
        {subtitle}
      </motion.p>

      <a
        href={button.href}
        className="bg-accent pointer-events-auto rounded px-4.5 py-2.5 text-lg font-medium text-white transition-colors hover:cursor-pointer"
      >
        {button.label}
      </a>
    </motion.div>
  );
}
