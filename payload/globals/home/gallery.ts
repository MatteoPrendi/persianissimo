import type { Tab } from "payload";
import { requiredLocalizedField, mediaUploadField } from "@/utils/payload";

export const Gallery: Tab = {
  name: "gallery",
  label: "Galleria",
  fields: [
    {
      name: "content",
      label: "Contenuto",
      type: "group",
      fields: [
        requiredLocalizedField("title", "Titolo", "text"),
        requiredLocalizedField("subtitle", "Sottotitolo", "textarea"),
      ],
    },
    {
      name: "items",
      label: "Immagini",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: {
            path: "@/payload/admin/ArrayItemLabel",
            clientProps: { path: "title" },
          },
        },
      },
      fields: [
        mediaUploadField("image", "Immagine"),
        requiredLocalizedField("title", "Titolo", "text"),
        {
          name: "alt",
          label: "Testo alternativo (Alt)",
          type: "text",
          localized: true,
        },
        {
          name: "size",
          label: "Dimensione Grid",
          type: "select",
          defaultValue: "auto",
          options: [
            { label: "Automatico", value: "auto" },
            { label: "Normale (1x1)", value: "normal" },
            { label: "Largo (2 colonne)", value: "wide" },
            { label: "Alto (2 righe)", value: "tall" },
          ],
        },
      ],
    },
  ],
};
