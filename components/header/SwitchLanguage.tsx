"use client";
import { clsx } from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { GlobeIcon, CheckIcon } from "@phosphor-icons/react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

interface Props {
  languages: Array<{ code: string; name: string }>;
}

export default function LanguageDropdown({ languages }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const activeLang = pathname.split("/")[1];
  const currentLanguage = languages.find(lang => lang.code === activeLang)!;

  function handleLanguageChange(languageCode: string) {
    if (languageCode !== currentLanguage?.code) {
      const newPath = pathname.replace(/^\/[^/]+/, `/${languageCode}`);
      window.location.assign(newPath);
    }
  }

  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger className="text-foreground/80 focus:outline-accent flex cursor-pointer items-center gap-2 rounded border px-3 py-2 transition-all duration-200 focus:outline-offset-3">
        <GlobeIcon size={18} className="text-foreground/80" />

        <span className="hidden text-sm font-medium sm:inline">
          {currentLanguage?.name}
        </span>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          align="center"
          sideOffset={3}
          className="z-50 w-36 rounded border bg-white p-1"
        >
          <Dropdown.Arrow className="stroke-foreground/50 fill-white" />
          <div className="flex flex-col gap-0.5">
            {languages.map(lang => {
              const isSelected = lang.code === activeLang;

              return (
                <Dropdown.Item
                  key={lang.code}
                  onSelect={() => handleLanguageChange(lang.code)}
                  className={clsx(
                    "flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left transition-colors outline-none",
                    isSelected
                      ? "bg-accent/5 text-accent font-medium"
                      : "text-foreground/70 data-highlighted:bg-foreground/5"
                  )}
                >
                  <span className="text-sm">{lang.name}</span>

                  {isSelected && <CheckIcon className="text-accent size-4" />}
                </Dropdown.Item>
              );
            })}
          </div>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
