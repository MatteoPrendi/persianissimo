import { usePayloadGlobal } from "@/utils/usePayload";

import ScrollContainer from "@/contexts/ScrollContext";
import ImageSpread from "@/components/introduction/ImageSpread";
import ContentReveal from "@/components/introduction/ContentReveal";

import { validateImages } from "@/utils/validateImage";

export default async function Introduction() {
  const { introduction } = await usePayloadGlobal("home");
  const { content, media } = introduction;

  validateImages(media);

  return (
    <ScrollContainer height="200vh">
      <ImageSpread {...media} />

      <ContentReveal {...content} />
    </ScrollContainer>
  );
}
