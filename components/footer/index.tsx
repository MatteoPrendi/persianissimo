import { getPayloadGlobal } from "@/utils/payload";

import Contacts from "@/components/footer/Contacts";
import OpenHours from "@/components/footer/OpenHours";
import SocialIcons from "@/components/footer/SocialIcons";

export default async function Footer() {
  const { info, schedule, socials } = await getPayloadGlobal("footer");

  return (
    <footer className="border-foreground bg-foreground border-t py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <Contacts {...info} />
          <OpenHours {...schedule} />
          <SocialIcons {...socials} />
        </div>

        <div className="border-background/20 text-background border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Persianissimo</p>
        </div>
      </div>
    </footer>
  );
}
