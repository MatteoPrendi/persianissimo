import Hero from "@/components/hero";
import Introduction from "@/components/introduction";
import Marquee from "@/components/marquee";
import TestimonialSlider from "@/components/testimonials";

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
