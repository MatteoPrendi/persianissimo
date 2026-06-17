import type { Tab } from "payload";

export const Introdution: Tab = {
  name: "introduction",
  label: "Introduzione",
  fields: [
    {
      name: "images",
      label: "Immagini",
      type: "group",
      fields: [
        {
          label: "Immagine in alto a sinistra",
          name: "topLeft",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          label: "Immagine in alto a destra",
          name: "topRight",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          label: "Immagine in basso a sinistra",
          name: "bottomLeft",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          label: "Immagine in basso a destra",
          name: "bottomRight",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
