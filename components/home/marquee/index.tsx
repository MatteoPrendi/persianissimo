import { getPayloadGlobal } from "@/utils/payload";
import ScrollingText from "@/components/home/marquee/ScrollingText";

export default async function Marquee() {
  const { marquee } = await getPayloadGlobal("home");

  const contentPhrases = marquee.phrases.map(({ content }) => content);
  const duplicatedPhrases = [...contentPhrases, ...contentPhrases];

  return (
    <section className="bg-accent overflow-hidden py-6">
      <ScrollingText phrases={duplicatedPhrases} />
    </section>
  );
}
