import { getPayloadGlobal } from "@/utils/payload";
import GalleryClient, { GalleryItemData } from "./GalleryClient";
import type { Media } from "@/payload-types";

const defaultGalleryImages: GalleryItemData[] = [
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
  {
    id: 8,
    title: "Artisanal Sourdough Bread",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    alt: "Artisanal Sourdough Bread",
    className: "col-span-1 h-72 md:h-80",
  },
];

function getItemClassName(size: string | undefined | null, idx: number): string {
  if (size === "wide") return "col-span-1 md:col-span-2 h-80 md:h-96";
  if (size === "tall") return "col-span-1 md:row-span-2 h-96 md:h-full min-h-[350px]";
  if (size === "normal") return "col-span-1 h-72 md:h-80";

  const mod = idx % 6;
  if (mod === 0 || mod === 5) return "col-span-1 md:col-span-2 h-80 md:h-96";
  if (mod === 1 || mod === 4) return "col-span-1 md:row-span-2 h-96 md:h-full min-h-[350px]";
  return "col-span-1 h-72 md:h-80";
}

export default async function Gallery() {
  const homeData = await getPayloadGlobal("home");
  const gallery = homeData?.gallery;

  const title = gallery?.content?.title || "Gallery Showcase";
  const subtitle =
    gallery?.content?.subtitle ||
    "Explore our collection of authentic Persian craftsmanship, featuring intricate designs and timeless artistry.";

  let items: GalleryItemData[] = [];

  if (gallery?.items && gallery.items.length > 0) {
    items = gallery.items
      .map((item, idx) => {
        const mediaObj = typeof item.image === "object" ? (item.image as Media) : null;
        const src = mediaObj?.url || "";
        const alt = item.alt || mediaObj?.alt || item.title || "Gallery image";

        return {
          id: item.id || idx,
          title: item.title,
          src,
          alt,
          className: getItemClassName(item.size, idx),
        };
      })
      .filter((item) => Boolean(item.src));
  }

  // Fallback to default gallery images if no valid payload media items exist
  if (items.length === 0) {
    items = defaultGalleryImages;
  }

  return <GalleryClient title={title} subtitle={subtitle} items={items} />;
}
