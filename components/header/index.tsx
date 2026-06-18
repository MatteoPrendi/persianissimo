"use client";
import Menu from "@/components/header/Menu";
import MenuToggle from "@/components/header/MenuToggle";
import MenuContainer from "@/contexts/MenuContext";

export default function Header() {
  return (
    <MenuContainer>
      <header className="fixed top-4 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 rounded px-4">
        <div className="flex flex-col rounded border border-gray-300 bg-white/75 p-4 shadow backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-xl font-bold">Persianissimo</h1>

            <MenuToggle />
          </div>

          <Menu />
        </div>
      </header>
    </MenuContainer>
  );
}
