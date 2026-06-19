import type { Tab } from "payload";
import { requiredLocalizedField, LinkField } from "@/utils/payload";

export const Socials: Tab = {
  name: "socials",
  label: "Social Media",
  fields: [
    requiredLocalizedField("title", "Titolo", "text"),
    {
      type: "group",
      name: "instagram",
      fields: [requiredLocalizedField("href", "Link", "text")],
    },
    {
      type: "group",
      name: "facebook",
      fields: [requiredLocalizedField("href", "Link", "text")],
    },
    {
      type: "group",
      name: "twitter",
      fields: [requiredLocalizedField("href", "Link", "text")],
    },
  ],
};
