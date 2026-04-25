import { NextResponse } from "next/server";

const COOKIE_NAME = "site_auth";
const COOKIE_VALUE = "ok";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  const auth = request.cookies.get(COOKIE_NAME);
  if (auth?.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
