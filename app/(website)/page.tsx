import Hero from "@/components/hero";
import Introduction from "@/components/introduction";
import Marquee from "@/components/marquee";

export default async function Home() {
  return (
    <main className="min-h-[200vh]">
      <Hero />

      <Introduction />
      <Marquee />
    </main>
  );
}
