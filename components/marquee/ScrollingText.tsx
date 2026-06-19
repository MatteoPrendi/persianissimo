"use client";
import { motion } from "motion/react";
import { ForkKnifeIcon } from "@phosphor-icons/react";

interface Props {
  phrases: Array<string>;
}

export default function ScrollingText({ phrases }: Props) {
  return (
    <motion.div
      className="flex w-max flex-nowrap items-center gap-6"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        duration: 22,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {phrases.map((phrase, i) => (
        <div key={i} className="flex shrink-0 items-center gap-6">
          <span className="text-background font-serif text-2xl md:text-3xl">
            {phrase}
          </span>

          <span className="text-background/70 text-2xl md:text-3xl">
            <ForkKnifeIcon />
          </span>
        </div>
      ))}
    </motion.div>
  );
}
