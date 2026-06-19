import { AVAILABLE_LOCALES } from "@/constants/available_locales";
import { headers } from "next/headers";

export function getPreferredLocale(headers: Headers): string {
  const acceptLanguage = headers.get("accept-language");
  if (!acceptLanguage) return "it";

  const primaryLocale = acceptLanguage.split(",")[0];
  return primaryLocale.split(/[-_]/)[0];
}

export function isAvailableLocale(locale: string): boolean {
  return AVAILABLE_LOCALES.includes(locale);
}

export function getLocale(headers: Headers): string {
  const locale = getPreferredLocale(headers);
  return isAvailableLocale(locale) ? locale : "it";
}

export async function getCurrentLocale() {
  const allHeaders = await headers();
  return allHeaders.get("x-current-locale") as string;
}
