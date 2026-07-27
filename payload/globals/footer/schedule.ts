import type { Tab } from "payload";
import { requiredLocalizedField } from "@/utils/payload";

export const Schedule: Tab = {
  name: "schedule",
  label: "Orari",
  fields: [
    requiredLocalizedField("title", "Titolo", "text"),
    requiredLocalizedField("weekday", "Giorni lavorativi", "text"),
    requiredLocalizedField("weekend", "Fine settimana", "text"),
  ],
};
