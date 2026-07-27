import { getPayloadGlobal } from "@/utils/payload";

import ScrollContainer from "@/contexts/ScrollContext";
import ImageSpread from "@/components/home/introduction/ImageSpread";
import ContentReveal from "@/components/home/introduction/ContentReveal";

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
