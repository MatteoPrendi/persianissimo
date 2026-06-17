"use client";
import { useContext } from "react";
import { ScrollContext } from "@/components/ScrollContainer";

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useSectionScroll used outside of context");
  }

  return context.yProgress;
}
