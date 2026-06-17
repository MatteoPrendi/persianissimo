import { GlobalConfig } from "payload";

import { Hero } from "@/payload/globals/home/hero";
import { Introdution } from "@/payload/globals/home/introduction";

export const Home: GlobalConfig = {
  slug: "home",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [Hero, Introdution],
    },
  ],

  versions: {
    max: 5,
    drafts: {
      autosave: true,
    },
  },
};
