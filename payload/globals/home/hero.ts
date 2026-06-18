import {
  buttonRequiredLocalizedField,
  requiredLocalizedField,
  mediaUploadField,
} from "@/utils/fieldFactories";
import type { Tab } from "payload";

export const Hero: Tab = {
  name: "hero",
  label: "Hero",
  fields: [
    {
      label: "Contenuto",
      name: "content",
      type: "group",
      fields: [
        requiredLocalizedField("title", "Titolo", "text"),
        requiredLocalizedField("subtitle", "Sottotitolo", "textarea"),
        buttonRequiredLocalizedField("button", "Pulsante"),
      ],
    },
    {
      label: "Media",
      name: "media",
      type: "group",
      fields: [
        mediaUploadField("leftImage", "Immagine sinistra"),
        mediaUploadField("rightImage", "Immagine destra"),
        requiredLocalizedField("videoUrl", "Link video", "text"),
      ],
    },
  ],
};
