import { usePayload } from "@/utils/usePayload";

import ScrollContainer from "@/components/ScrollContainer";
import CallToAction from "@/components/hero/CallToAction";
import FloatingImage from "@/components/hero/FloatingImage";
import ExpandingVideo from "@/components/hero/ExpandingVideo";

export default async function Hero() {
  const payload = await usePayload();
  const homeData = await payload.findGlobal({ slug: "home" });
  const { title, subtitle, button, imageLeft, imageRight, videoUrl } =
    homeData.hero;

  if (typeof imageLeft !== "object" || typeof imageRight !== "object") {
    throw new Error("HERO: One of the images was not properly populated");
  }

  if (typeof imageLeft.url !== "string" || typeof imageRight.url !== "string") {
    throw new Error("HERO: One of the images has an invalid or missing URL");
  }

  return (
    <ScrollContainer height="200vh">
      <CallToAction title={title} subtitle={subtitle} button={button} />

      <FloatingImage src={imageLeft.url} alt={imageLeft.alt} position="left" />
      <FloatingImage
        src={imageRight.url}
        alt={imageRight.alt}
        position="right"
      />

      <ExpandingVideo videoUrl={videoUrl} />
    </ScrollContainer>
  );
}
