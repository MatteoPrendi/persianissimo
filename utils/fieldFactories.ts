import { Field } from "payload";

export function buttonRequiredLocalizedField(name: string, label: string) {
  return {
    name,
    label,
    type: "group",
    fields: [
      {
        type: "row",
        fields: [
          requiredLocalizedField("label", "Contenuto", "text"),
          requiredLocalizedField("href", "Link", "text"),
        ],
      },
    ],
  } as Field;
}

export function requiredLocalizedField(
  name: string,
  label: string,
  type: "text" | "textarea"
) {
  return { name, label, type, required: true, localized: true } as Field;
}

export function mediaUploadField(name: string, label: string) {
  return {
    name,
    label,
    type: "upload",
    relationTo: "media",
    required: true,
  } as Field;
}
