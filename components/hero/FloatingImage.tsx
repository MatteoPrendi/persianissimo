"use client";
import { clsx } from "clsx";
import { motion, useTransform } from "motion/react";

import { useScrollContext } from "@/utils/useScrollContext";

interface Props {
  src: string;
  alt: string;
  position: "left" | "right";
}

export default function FloatingImage({ src, alt, position }: Props) {
  const yPos = useTransform(useScrollContext(), [0, 1], ["0%", "160%"]);

  return (
    <motion.div
      style={{ y: yPos }}
      className={clsx(
        "absolute z-10 hidden lg:block",
        position === "left"
          ? "top-[20%] left-[3%] w-[18vw] max-w-70"
          : "top-[30%] right-[3%] w-[15vw] max-w-60"
      )}
    >
      <img
        src={src}
        alt={alt}
        className={clsx(
          "h-auto w-full rounded-sm border-8 border-white shadow-2xl",
          position === "left" ? "-rotate-12" : "rotate-6"
        )}
      />
    </motion.div>
  );
}
