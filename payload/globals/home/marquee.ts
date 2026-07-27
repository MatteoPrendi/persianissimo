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
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: {
            path: "@/payload/admin/ArrayItemLabel",
            clientProps: { path: "content" },
          },
        },
      },
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
