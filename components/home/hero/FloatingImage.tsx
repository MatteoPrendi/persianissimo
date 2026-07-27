"use client";
import { clsx } from "clsx";
import { motion, useTransform } from "motion/react";
import type { Media } from "@/payload-types";

import { useScrollContext } from "@/hooks/useScrollContext";

interface Props extends Media {
  url: string;
  position: "left" | "right";
}

export default function FloatingImage({ url, alt, position }: Props) {
  const yPos = useTransform(useScrollContext(), [0, 1], ["0%", "120%"]);

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
        src={url}
        alt={alt}
        className={clsx(
          "h-auto w-full rounded-sm border-8 border-white shadow-2xl",
          position === "left" ? "-rotate-12" : "rotate-6"
        )}
      />
    </motion.div>
  );
}
