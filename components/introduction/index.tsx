import { usePayloadGlobal } from "@/utils/usePayload";

import ScrollContainer from "@/components/ScrollContainer";
import ImageSpread from "@/components/introduction/ImageSpread";
import ContentReveal from "@/components/introduction/ContentReveal";

import { Media } from "@/payload-types";

export default async function Introduction() {
  const { introduction } = await usePayloadGlobal("home");
  const { badge, title, subtitle, images } = introduction;

  return (
    <ScrollContainer height="200vh">
      <ImageSpread
        topLeftImage={images.topLeft as Media & { url: string }}
        topRightImage={images.topRight as Media & { url: string }}
        bottomLeftImage={images.bottomLeft as Media & { url: string }}
        bottomRightImage={images.bottomRight as Media & { url: string }}
      />

      <ContentReveal badge={badge} title={title} subtitle={subtitle} />
    </ScrollContainer>
  );
}
