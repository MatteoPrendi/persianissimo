"use client";
import { createContext, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";

export const MenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

interface Props {
  children: ReactNode;
}

export default function MenuContainer({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  );
}
