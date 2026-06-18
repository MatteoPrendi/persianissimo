"use client";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

import { useMenuContext } from "@/hooks/useMenuContext";

const ITEMS = [
  { id: 1, href: "/", label: "Home" },
  { id: 2, href: "/about", label: "About" },
  { id: 3, href: "/menu", label: "Il menù" },
  { id: 4, href: "/contatti", label: "Contatti" },
];

export default function Menu() {
  const pathname = usePathname();
  const { isOpen } = useMenuContext();

  return (
    <nav
      className={clsx(
        "mt-4 flex-col gap-4 md:mt-0 md:flex md:flex-row md:gap-6",
        isOpen ? "flex" : "hidden"
      )}
    >
      {ITEMS.map(item => (
        <a
          key={item.id}
          href={item.href}
          className={clsx(
            "hover:text-accent",
            pathname === item.href && "text-accent font-medium"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
