"use client";
import { useContext } from "react";
import { MenuContext } from "@/contexts/MenuContext";

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext used outside of context");
  }

  return context;
}
