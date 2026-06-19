"use client";
import { motion, useTransform } from "motion/react";
import { useScrollContext } from "@/hooks/useScrollContext";

interface Props {
  videoUrl: string;
}

export default function ExpandingVideo({ videoUrl }: Props) {
  const yPos = useScrollContext();

  const top = useTransform(yPos, [0, 1], ["70%", "0%"]);
  const width = useTransform(yPos, [0, 1], ["50%", "100%"]);
  const height = useTransform(yPos, [0, 1], ["25%", "100%"]);
  const borderRadius = useTransform(yPos, [0, 1], ["32px", "0px"]);

  const overlayOpacity = useTransform(yPos, [0, 1], [0, 0.5]);

  return (
    <motion.div
      style={{ top, width, height, borderRadius }}
      className="absolute -bottom-1/2 left-1/2 z-0 -translate-x-1/2 overflow-hidden shadow-2xl"
    >
      <video
        loop
        muted
        autoPlay
        src={videoUrl}
        className="h-full w-full object-cover"
      />

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 bg-black"
      />
    </motion.div>
  );
}
