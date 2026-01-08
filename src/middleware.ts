import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userToken = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("admin_token")?.value;
  const pathname = req.nextUrl.pathname;

  const res = NextResponse.next();

  if (pathname.startsWith("/my-account") && !userToken) {
    const redirect = NextResponse.redirect(new URL("/login", req.url));
    redirect.cookies.set("toast_message", "Something went wrong!", {
      httpOnly: false, 
      path: "/",
      maxAge: 5, // 5 seconds
    });
    return redirect;
  }

  if (pathname.startsWith("/dashboard") && !adminToken) {
    const redirect = NextResponse.redirect(new URL("/login", req.url));
    redirect.cookies.set("toast_message", "Contact Administrator", {
      httpOnly: false,
      path: "/",
      maxAge: 5,
    });
    return redirect;
  }

  if ((userToken || adminToken) && ["/login", "/register"].includes(pathname)) {
    const redirect = NextResponse.redirect(new URL("/", req.url));
    return redirect;
  }

  return res;
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/my-account/:path*"],
};
