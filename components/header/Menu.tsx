"use client";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

import { useMenuContext } from "@/hooks/useMenuContext";

interface Props {
  items: {
    item: {
      label: string;
      href: string;
    };
    id?: string | null;
  }[];
}

export default function Menu({ items }: Props) {
  const pathname = usePathname();
  const { isOpen } = useMenuContext();

  return (
    <nav
      className={clsx(
        "mt-4 flex-col gap-4 md:mt-0 md:flex md:flex-row md:gap-6",
        isOpen ? "flex" : "hidden"
      )}
    >
      {items.map(({ id, item }) => {
        console.log(item);

        return (
          <a
            key={id}
            href={item.href}
            className={clsx(
              "hover:text-accent",
              pathname === item.href && "text-accent font-medium"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
