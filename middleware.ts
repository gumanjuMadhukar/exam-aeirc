import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse, URLPattern } from "next/server";
import { Roles } from "utils/enums";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!.*\\.).*)",
    // '/((?!.*|api|_next/static|_next/image|favicon.ico).*)'
  ],
};

export const publicRoutes = [
  "/auth/register",
  "/auth/login",
  "/auth/forgot-pw",
  "/auth/register-verification",
  "/auth/reset-password",
  "/auth/reset-verification",
  // "/dashboard",
  // "/student",
  // "/admin/employee",
];

function verifyOrRedirectRoute(
  continueRoute: boolean,
  redirectUrl: NextURL,
  isLogin?: boolean
): NextResponse {
  if (continueRoute && !isLogin) {
    return NextResponse.next();
  }
  return NextResponse.redirect(redirectUrl);
}

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");
  let role: any = req.cookies.get("role");
  let url = req.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  const pattern = new URLPattern();
  const pageName = pattern.exec(url)?.pathname.input.split(/\/\d/)[0];
  if (!pageName) {
    return NextResponse.next();
  }

  if (verify) {
    if (
      (url.pathname.startsWith("/employee") &&
        role?.value !== Roles.EMPLOYEE) ||
      (url.pathname.startsWith("/admin") &&
        role?.value !== Roles.ADMIN &&
        role?.value !== Roles.SUPERADMIN) ||
      (url.pathname.startsWith("/dir") && role?.value !== Roles.ADMINISTRATOR)
    ) {
      url.pathname = "/dashboard";
      return verifyOrRedirectRoute(publicRoutes.includes(pageName), url);
    } else {
      url.pathname = "/dashboard";
      return verifyOrRedirectRoute(true, url, pageName.startsWith("/auth"));
    }
  } else {
    url.pathname = "/auth/login";
    return verifyOrRedirectRoute(publicRoutes.includes(pageName), url);
  }
}
