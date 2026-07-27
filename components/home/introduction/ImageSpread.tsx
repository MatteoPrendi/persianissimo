"use client";
import { motion, useTransform, useMotionTemplate } from "motion/react";
import { useScrollContext } from "@/hooks/useScrollContext";
import type { Media } from "@/payload-types";

type Image = Media & { url: string };

interface Props {
  topLeftImage: Image;
  topRightImage: Image;
  bottomLeftImage: Image;
  bottomRightImage: Image;
}

export default function ImageSpread({
  topLeftImage,
  topRightImage,
  bottomLeftImage,
  bottomRightImage,
}: Props) {
  const spread = useTransform(useScrollContext(), [0, 0.4], [0, 1]);

  function createTransform(xBasis: number, yBasis: number, r: number) {
    const xOffset = useTransform(spread, [0, 1], [xBasis * 51, xBasis * 150]);
    const yOffset = useTransform(spread, [0, 1], [yBasis * 51, yBasis * 115]);
    const rotation = useTransform(spread, [0, 1], [0, r]);

    return {
      transform: useMotionTemplate`translate(calc(-50% + ${xOffset}%), calc(-50% + ${yOffset}%)) rotate(${rotation}deg)`,
    };
  }

  const topLeft = createTransform(-1, -1, -7);
  const topRight = createTransform(1, -1, 7);
  const bottomLeft = createTransform(-1, 1, 6);
  const bottomRight = createTransform(1, 1, -6);

  const images = [
    { image: topLeftImage, style: topLeft },
    { image: topRightImage, style: topRight },
    { image: bottomLeftImage, style: bottomLeft },
    { image: bottomRightImage, style: bottomRight },
  ];

  return (
    <div className="relative h-full w-full">
      {images.map(({ image, style }) => (
        <motion.div
          key={image.id}
          style={style}
          className="absolute top-1/2 left-1/2 z-20 aspect-square w-[45vw] sm:w-[30vw] md:aspect-auto md:h-[34vh] md:w-[22vw]"
        >
          <div className="h-full w-full overflow-hidden rounded-3xl shadow-2xl">
            <img
              alt={image.alt}
              src={image.url}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
