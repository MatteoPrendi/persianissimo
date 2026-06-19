import type { Tab } from "payload";
import { requiredLocalizedField } from "@/utils/payload";

export const Info: Tab = {
  name: "info",
  label: "Contatti",
  fields: [requiredLocalizedField("title", "Titolo", "text")],
};
