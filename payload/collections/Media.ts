import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/jpeg", "image/webp"],
  },
  access: { read: () => true },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
