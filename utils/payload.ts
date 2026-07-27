import { headers, draftMode } from "next/headers";

import config from "@payload-config";
import { getPayload } from "payload";
import type { Field, GlobalSlug, TypedGlobal } from "payload";

export async function getPayloadClient() {
  return await getPayload({ config });
}

export async function getPayloadGlobal<T extends GlobalSlug>(slug: T) {
  const payload = await getPayloadClient();

  const allHeaders = await headers();
  const currentLocale = allHeaders.get("x-current-locale") || "it";

  const { isEnabled: isDraftMode } = await draftMode();

  const global = await payload.findGlobal({
    slug,
    locale: currentLocale as any,
    draft: isDraftMode,
    overrideAccess: isDraftMode,
  });

  return global as TypedGlobal[T];
}

export function LinkField(name: string, label: string) {
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

export function FormField(name: string, label: string) {
  return {
    name,
    label,
    type: "group",
    fields: [
      {
        type: "row",
        fields: [
          requiredLocalizedField("label", "Etichetta", "text"),
          requiredLocalizedField("placeholder", "Placeholder", "text"),
        ],
      },
    ],
  } as Field;
}
