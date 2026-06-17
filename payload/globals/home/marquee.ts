import type { Tab } from "payload";

export const Marquee: Tab = {
  name: "marquee",
  label: "Testo scorrevole",
  fields: [
    {
      name: "phrases",
      label: "Frasi",
      type: "array",
      required: true,
      fields: [
        {
          name: "content",
          label: "Contenuto",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
