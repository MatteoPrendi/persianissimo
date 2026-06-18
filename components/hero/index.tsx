import { usePayloadGlobal } from "@/utils/usePayload";

import ScrollContainer from "@/contexts/ScrollContext";
import CallToAction from "@/components/hero/CallToAction";
import FloatingImage from "@/components/hero/FloatingImage";
import ExpandingVideo from "@/components/hero/ExpandingVideo";

import { validateImages } from "@/utils/validateImage";

export default async function Hero() {
  const { hero } = await usePayloadGlobal("home");
  const { content, media } = hero;

  const { videoUrl, ...images } = media;

  validateImages(images);

  return (
    <ScrollContainer height="200vh">
      <CallToAction {...content} />

      <FloatingImage {...images.leftImage} position="left" />
      <FloatingImage {...images.rightImage} position="right" />

      <ExpandingVideo videoUrl={media.videoUrl} />
    </ScrollContainer>
  );
}
