import type { Tab } from "payload";
import { requiredLocalizedField } from "@/utils/payload";

export const Socials: Tab = {
  name: "socials",
  label: "Social Media",
  fields: [requiredLocalizedField("title", "Titolo", "text")],
};
