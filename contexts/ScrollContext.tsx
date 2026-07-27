"use client";
import { createContext, useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "motion/react";

export const ScrollContext = createContext<{
  yProgress: MotionValue<number>;
} | null>(null);

interface Props {
  children: ReactNode;
  height: string;
}

export default function ScrollContainer({ children, height }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <ScrollContext.Provider value={{ yProgress: scrollYProgress }}>
      <section ref={containerRef} className="relative" style={{ height }}>
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {children}
        </div>
      </section>
    </ScrollContext.Provider>
  );
}
