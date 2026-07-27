"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import ReviewCard from "./Review";

const reviews = [
  {
    id: 1,
    author: "Elena Rossi",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely fantastic experience! The attention to detail is unmatched, and the staff made us feel completely at home. Highly recommend this place to anyone visiting the area.",
  },
  {
    id: 2,
    author: "Marco Bianchi",
    avatar: "https://i.pravatar.cc/150?u=marco",
    rating: 5,
    date: "1 week ago",
    text: "Best service I've ever received. Everything was exactly as described, and the checkout process was seamless. Will definitely be returning soon!",
  },
  {
    id: 3,
    author: "Sophie Laurent",
    avatar: "https://i.pravatar.cc/150?u=sophie",
    rating: 4,
    date: "3 weeks ago",
    text: "Great overall, but it gets quite busy on the weekends. The quality is consistently high, and I appreciate the friendly atmosphere. Worth the wait.",
  },
  {
    id: 4,
    author: "David Chen",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 5,
    date: "1 month ago",
    text: "I rarely leave reviews, but I had to for this. Exceptional quality, fair pricing, and a genuinely wonderful team. A true hidden gem.",
  },
  {
    id: 5,
    author: "Anna Smith",
    avatar: "https://i.pravatar.cc/150?u=anna",
    rating: 5,
    date: "2 months ago",
    text: "Everything was perfectly arranged. You can tell they really care about their customers. Five stars without a doubt!",
  },
];

export default function GoogleReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 font-sans">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            What our customers say
          </h2>
          <p className="text-foreground/70 mt-1 max-w-lg text-sm leading-relaxed">
            Real feedback from our amazing customers. Read what they have to say
            about their experiences with us on Google.
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            onClick={scrollPrev}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="border-accent text-accent hover:bg-accent flex h-10 w-10 cursor-pointer items-center justify-center rounded border bg-white shadow-sm transition-colors hover:text-white"
            aria-label="Previous reviews"
          >
            <CaretLeftIcon size={20} weight="bold" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollNext}
            className="border-accent text-accent hover:bg-accent flex h-10 w-10 cursor-pointer items-center justify-center rounded border bg-white shadow-sm transition-colors hover:text-white"
            aria-label="Next reviews"
          >
            <CaretRightIcon size={20} weight="bold" />
          </motion.button>
        </div>
      </div>

      <div className="overflow-hidden rounded py-2" ref={emblaRef}>
        <div className="-ml-6 flex cursor-grab active:cursor-grabbing">
          {reviews.map(review => (
            <div
              key={review.id}
              className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
