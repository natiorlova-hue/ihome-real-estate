import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "es", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="iHome Studio"' },
  });
}

function isValidBasicAuth(req: NextRequest) {
  const user = process.env.STUDIO_BASIC_AUTH_USER;
  const pass = process.env.STUDIO_BASIC_AUTH_PASS;

  // If not configured, do not block (handy for dev environments)
  if (!user || !pass) return true;

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  const base64 = header.slice("Basic ".length).trim();
  let decoded = "";
  try {
    decoded = Buffer.from(base64, "base64").toString("utf8");
  } catch {
    return false;
  }

  const [u, p] = decoded.split(":");
  return u === user && p === pass;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect Studio without touching locale routes
  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    if (!isValidBasicAuth(req)) return unauthorized();
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
