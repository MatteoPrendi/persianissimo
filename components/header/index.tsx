import { getPayloadClient, getPayloadGlobal } from "@/utils/payload";

import Menu from "@/components/header/Menu";
import MenuToggle from "@/components/header/MenuToggle";
import MenuContainer from "@/contexts/MenuContext";
import SwitchLanguage from "./SwitchLanguage";

export default async function Header() {
  const { config } = await getPayloadClient();
  const { menu } = await getPayloadGlobal("header");

  if (!config.localization) throw new Error("Localization is not enabled");

  const languages = config.localization.locales.map(locale => ({
    name: locale.label,
    code: locale.code,
  })) as { code: string; name: string }[];

  return (
    <MenuContainer>
      <header className="fixed top-4 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 rounded px-4">
        <div className="flex flex-col gap-4 rounded border border-gray-300 bg-white/75 p-4 shadow backdrop-blur-md md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex w-full items-center justify-between md:w-auto">
            <h1 className="font-serif text-xl font-bold">Persianissimo</h1>

            <div className="flex items-center gap-4 md:hidden">
              <SwitchLanguage languages={languages} />
              <MenuToggle />
            </div>
          </div>

          <Menu items={menu} />

          <div className="hidden md:block">
            <SwitchLanguage languages={languages} />
          </div>
        </div>
      </header>
    </MenuContainer>
  );
}
