import { usePayloadGlobal } from "@/utils/usePayload";
import ScrollingText from "@/components/marquee/ScrollingText";

export default async function Marquee() {
  const { marquee } = await usePayloadGlobal("home");

  const contentPhrases = marquee.phrases.map(({ content }) => content);
  const duplicatedPhrases = [...contentPhrases, ...contentPhrases];

  return (
    <section className="bg-accent overflow-hidden py-6">
      <ScrollingText phrases={duplicatedPhrases} />
    </section>
  );
}
