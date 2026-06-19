import type { GlobalConfig } from "payload";
import { LinkField } from "@/utils/payload";

export const Header: GlobalConfig = {
  slug: "header",
  access: { read: () => true },
  fields: [
    {
      label: "Menù",
      name: "menu",
      type: "array",
      fields: [LinkField("item", "Voce")],
      required: true,
    },
  ],

  versions: {
    max: 5,
    drafts: {
      autosave: true,
    },
  },
};
