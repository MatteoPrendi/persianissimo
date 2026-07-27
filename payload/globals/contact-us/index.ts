import type { GlobalConfig } from "payload";
import { FormField, requiredLocalizedField } from "@/utils/payload";

export const ContactUs: GlobalConfig = {
  slug: "contact-us",
  access: { read: () => true },
  fields: [
    requiredLocalizedField("heading", "Titolo", "text"),
    requiredLocalizedField("subtitle", "Sottotitolo", "textarea"),
    {
      name: "fields",
      label: "Form",
      type: "group",
      fields: [
        FormField("name", "Nome"),
        FormField("lastName", "Cognome"),
        FormField("email", "Email"),
        FormField("message", "Messaggio"),
        requiredLocalizedField("submit", "Pulsante d'invio", "text"),
      ],
    },
  ],

  versions: {
    max: 5,
    drafts: {
      autosave: true,
    },
  },
};
