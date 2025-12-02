import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Routes where logged-in users should NOT go
  const authPages = ["/login"];

  // Protected routes
  const protectedRoutes = ["/dashboard", "/my-account"];

  // 1️⃣ If user has token AND visits login/register → redirect to home
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2️⃣ If user tries to access protected page without token → login
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/my-account/:path*"],
};
