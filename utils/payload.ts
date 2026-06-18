import config from "@payload-config";
import { getPayload } from "payload";
import type { GlobalSlug, TypedGlobal } from "payload";

export async function getPayloadClient() {
  return await getPayload({ config });
}

export async function getPayloadGlobal<T extends GlobalSlug>(slug: T) {
  const payload = await getPayloadClient();
  const global = await payload.findGlobal({ slug });

  return global as TypedGlobal[T];
}
