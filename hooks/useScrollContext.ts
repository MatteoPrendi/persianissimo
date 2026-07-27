"use client";
import { useContext } from "react";
import { ScrollContext } from "@/contexts/ScrollContext";

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext used outside of context");
  }

  return context.yProgress;
}
