import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getLocale, isAvailableLocale } from "@/utils/locale";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    const preferredLocale = getLocale(request.headers);
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }
  const locale = segments[0];
  if (!isAvailableLocale(locale)) {
    const preferredLocale = getLocale(request.headers);
    const remainingPath = segments.slice(1).join("/");
    const newPath = `/${preferredLocale}${remainingPath ? `/${remainingPath}` : ""}`;

    return NextResponse.redirect(new URL(newPath, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api).*)"],
};
