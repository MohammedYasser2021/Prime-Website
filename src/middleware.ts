import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "ar"],

//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: "ar",
//   localePrefix: "always",
// });

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {

// }
export default async function middleware(request: NextRequest) {
  const logged = request.cookies.get("token");
  const lang = request.cookies.get("NEXT_LOCALE");
  
  const url = request.nextUrl.pathname;
  // if (!logged && !url.includes("/log-in")) {
  //   return NextResponse.redirect(new URL("/log-in", request.url));
  // }
  if (logged && url.includes("/log-in")) {
        // If logged in and trying to access login, redirect to home
    return NextResponse.redirect(new URL(`/${lang?.value}/`, request.url));
  }


  if(!logged && (url.includes("/profile") )){
    // If not logged in and trying to access profile, redirect to login
    return NextResponse.redirect(new URL(`/${lang?.value}/log-in`, request.url));
  }

  // Step 1: Use the incoming request (example)
  const defaultLocale = request.headers.get("x-your-custom-locale") || "ar";

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "ar"],
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/login","/profile","/((?!api|_next|.*\\..*).*)"],
};
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|en)/:path*']
// };
