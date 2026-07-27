import Hero from "@/components/home/hero";
import Introduction from "@/components/home/introduction";
import Marquee from "@/components/home/marquee";
import TestimonialSlider from "@/components/home/testimonials";

export default async function Home() {
  return (
    <main>
      <Hero />

      <Introduction />
      <Marquee />

      <TestimonialSlider />
    </main>
  );
}
