import { headers } from "next/headers";
import type { Config } from "@/payload-types";

type Locale = Config["locale"];

export function getPreferredLocale(headers: Headers): string {
  const acceptLanguage = headers.get("accept-language");
  if (!acceptLanguage) return "it";

  const primaryLocale = acceptLanguage.split(",")[0];
  return primaryLocale.split(/[-_]/)[0];
}

export function isAvailableLocale(locale: string): locale is Locale {
  const validLocales: Locale[] = ["it", "en", "fa"];
  return validLocales.includes(locale as Locale);
}

export function getLocale(headers: Headers): Locale {
  const locale = getPreferredLocale(headers);
  return isAvailableLocale(locale) ? locale : "it";
}

export async function getCurrentLocale(): Promise<Locale> {
  const allHeaders = await headers();
  return (allHeaders.get("x-current-locale") as Locale) || "it";
}
