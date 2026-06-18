import Contacts from "@/components/footer/Contacts";
import OpenHours from "@/components/footer/OpenHours";
import SocialIcons from "@/components/footer/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-foreground bg-foreground border-t py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <Contacts />
          <OpenHours />
          <SocialIcons />
        </div>

        <div className="border-background/20 text-background border-t pt-8 text-center text-sm">
          <p>&copy; {currentYear} Persianissimo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
