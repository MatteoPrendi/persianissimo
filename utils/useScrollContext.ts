"use client";
import { useContext } from "react";
import { ScrollContext } from "@/components/ScrollContainer";

export function useSectionScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error(
      "useSectionScroll must be used within a <ScrollContext /> component"
    );
  }

  return context;
}
