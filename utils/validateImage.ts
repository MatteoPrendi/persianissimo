import type { Media } from "@/payload-types";

type MediaWithUrl = Media & { url: string };

export function validateImages<T extends Record<string, number | Media>>(
  images: T
  // @ts-expect-error
): asserts images is Record<keyof T, MediaWithUrl> {
  for (const key of Object.keys(images)) {
    const image = images[key];

    if (typeof image === "number") {
      throw new Error(`ERROR: image "${key}" was not populated`);
    }

    if (typeof image.url !== "string") {
      throw new Error(`ERROR: image "${key}" has an undefined or missing URL`);
    }
  }
}
