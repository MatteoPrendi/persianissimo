"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EyeIcon } from "@phosphor-icons/react";
import Lightbox, { SlideItem } from "@/components/ui/lightbox";

export interface GalleryItemData {
  id: string | number;
  title: string;
  src: string;
  alt: string;
  className: string;
}

interface GalleryClientProps {
  title: string;
  subtitle: string;
  items: GalleryItemData[];
}

export default function GalleryClient({
  title,
  subtitle,
  items,
}: GalleryClientProps) {
  const [index, setIndex] = useState(-1);

  const slides: SlideItem[] = items.map(({ src, title, alt }) => ({
    src,
    title,
    alt,
  }));

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 font-sans">
      <div className="mb-12 text-center">
        {title && (
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-foreground/70 mx-auto mt-3 max-w-xl text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            viewport={{ once: true }}
            onClick={() => setIndex(idx)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 shadow-md transition-shadow hover:shadow-xl ${item.className}`}
          >
            <div className="absolute top-3 right-3 rounded-sm z-10 flex h-8 w-8 items-center justify-center bg-black/40 text-white backdrop-blur-md sm:hidden">
              <EyeIcon size={18} weight="bold" />
            </div>

            <div className="relative h-full w-full overflow-hidden">
              <img
                src={item.src}
                alt={item.alt || item.title || "Gallery image"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                  <EyeIcon size={20} weight="bold" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  );
}
