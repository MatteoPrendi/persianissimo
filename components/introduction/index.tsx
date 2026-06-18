import { getPayloadGlobal } from "@/utils/payload";

import ScrollContainer from "@/contexts/ScrollContext";
import ImageSpread from "@/components/introduction/ImageSpread";
import ContentReveal from "@/components/introduction/ContentReveal";

import { validateImages } from "@/utils/validateImage";

export default async function Introduction() {
  const { introduction } = await getPayloadGlobal("home");
  const { content, media } = introduction;

  validateImages(media);

  return (
    <ScrollContainer height="200vh">
      <ImageSpread {...media} />

      <ContentReveal {...content} />
    </ScrollContainer>
  );
}
