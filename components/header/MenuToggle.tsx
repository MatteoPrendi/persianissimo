"use client";
import { clsx } from "clsx";
import { useMenuContext } from "@/hooks/useMenuContext";

export default function MenuToggle() {
  const { isOpen, setIsOpen } = useMenuContext();

  return (
    <button
      className="relative size-6 overflow-hidden transition-all duration-300 md:hidden"
      onClick={() => setIsOpen(prev => !prev)}
    >
      <div
        className={clsx(
          "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
          isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
        )}
      ></div>

      <div
        className={clsx(
          "absolute top-2.5 left-0 h-0.5 w-6 bg-current transition-opacity duration-300",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      ></div>

      <div
        className={clsx(
          "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
          isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-4"
        )}
      ></div>
    </button>
  );
}
