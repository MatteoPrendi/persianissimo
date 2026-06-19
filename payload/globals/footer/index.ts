import type { GlobalConfig } from "payload";

import { Schedule } from "./schedule";
import { Socials } from "./socials";
import { Info } from "./info";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [Info, Schedule, Socials],
    },
  ],

  versions: {
    max: 5,
    drafts: {
      autosave: true,
    },
  },
};
