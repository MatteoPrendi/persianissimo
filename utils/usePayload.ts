"use server";
import config from "@payload-config";
import { getPayload } from "payload";
import type { GlobalSlug, TypedGlobal } from "payload";

export async function usePayload() {
  return await getPayload({ config });
}

export async function usePayloadGlobal<T extends GlobalSlug>(slug: T) {
  const payload = await usePayload();
  const global = await payload.findGlobal({ slug });

  return global as TypedGlobal[T];
}
