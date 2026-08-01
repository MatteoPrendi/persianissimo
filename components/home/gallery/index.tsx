"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EyeIcon } from "@phosphor-icons/react";
import Lightbox, { SlideItem } from "@/components/ui/lightbox";

interface GalleryItem extends SlideItem {
  id: number;
  className: string;
}

const galleryImages: GalleryItem[] = [
  {
    id: 1,
    title: "Rustic Family Feast",
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    alt: "Rustic Family Feast",
    className: "col-span-1 md:col-span-2 h-80 md:h-96",
  },
  {
    id: 2,
    title: "Precision Chef Plating",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80",
    alt: "Precision Chef Plating",
    className: "col-span-1 md:row-span-2 h-96 md:h-full min-h-[350px]",
  },
  {
    id: 3,
    title: "Artisanal Sourdough Bread",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    alt: "Artisanal Sourdough Bread",
    className: "col-span-1 h-72 md:h-80",
  },
  {
    id: 4,
    title: "Gourmet Wagyu Burger",
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    alt: "Gourmet Wagyu Burger",
    className: "col-span-1 h-72 md:h-80",
  },
  {
    id: 5,
    title: "Master Sushi Omakase",
    src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    alt: "Master Sushi Omakase",
    className: "col-span-1 md:row-span-2 h-96 md:h-full min-h-[350px]",
  },
  {
    id: 6,
    title: "Vibrant Night Market spread",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    alt: "Vibrant Night Market spread",
    className: "col-span-1 md:col-span-2 h-80 md:h-96",
  },
  {
    id: 7,
    title: "Slow-Roasted Glazed Ribs",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    alt: "Slow-Roasted Glazed Ribs",
    className: "col-span-1 h-72 md:h-80",
  },
];

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  const slides: SlideItem[] = galleryImages.map(({ src, title, alt }) => ({
    src,
    title,
    alt,
  }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 font-sans">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Gallery Showcase
        </h2>
        <p className="text-foreground/70 mx-auto mt-3 max-w-xl text-base leading-relaxed">
          Explore our collection of authentic Persian craftsmanship, featuring intricate designs and timeless artistry.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            viewport={{ once: true }}
            onClick={() => setIndex(idx)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 shadow-md transition-shadow hover:shadow-xl ${item.className}`}
          >
            <div className="relative h-full w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt || item.title || "Gallery image"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Hover overlay with Title */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
