import type { Tab } from "payload";
import { requiredLocalizedField, mediaUploadField } from "@/utils/payload";

export const Introduction: Tab = {
  name: "introduction",
  label: "Introduzione",
  fields: [
    {
      name: "content",
      label: "Contenuto",
      type: "group",
      fields: [
        requiredLocalizedField("badge", "Etichetta", "text"),
        requiredLocalizedField("title", "Titolo", "text"),
        requiredLocalizedField("subtitle", "Sottotitolo", "textarea"),
      ],
    },
    {
      name: "media",
      label: "Media",
      type: "group",
      fields: [
        mediaUploadField("topLeftImage", "Immagine in alto a sinistra"),
        mediaUploadField("topRightImage", "Immagine in alto a destra"),
        mediaUploadField("bottomLeftImage", "Immagine in basso a sinistra"),
        mediaUploadField("bottomRightImage", "Immagine in basso a destra"),
      ],
    },
  ],
};
