import type { Tab } from "payload";

export const Hero: Tab = {
  name: "hero",
  label: "Hero",
  fields: [
    {
      label: "Titolo",
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      label: "Sottotitolo",
      name: "subtitle",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      label: "Immagine sinistra",
      name: "imageLeft",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      label: "Immagine destra",
      name: "imageRight",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
