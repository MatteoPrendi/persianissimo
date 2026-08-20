import { GlobalConfig } from "payload";

import { Hero } from "@/payload/globals/home/hero";
import { Introduction } from "@/payload/globals/home/introduction";
import { Marquee } from "@/payload/globals/home/marquee";
import { Gallery } from "@/payload/globals/home/gallery";

export const Home: GlobalConfig = {
  slug: "home",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [Hero, Introduction, Marquee, Gallery],
    },
  ],

  versions: {
    max: 5,
    drafts: {
      autosave: true,
    },
  },
};
