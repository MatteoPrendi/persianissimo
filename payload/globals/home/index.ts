import { GlobalConfig } from "payload";
import { Hero } from "@/payload/globals/home/hero";

export const Home: GlobalConfig = {
  slug: "home",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [Hero],
    },
  ],
};
