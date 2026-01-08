import { NextRequest, NextResponse } from "next/server";
const API = process.env.NEXT_PUBLIC_SERVER_URL as string;

/* ===================== MIDDLEWARE ===================== */

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const userToken = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("admin_token")?.value;

  /* ---------- USER ROUTES ---------- */
  if (pathname.startsWith("/my-account")) {
    if (!userToken) {
      return redirectHome(req, "Please login to continue");
    }

    const isValid = await verifyToken(userToken);
    if (!isValid) {
      return clearAndRedirect(req, "token", "Session expired");
    }
  }

  /* ---------- ADMIN ROUTES ---------- */
  if (pathname.startsWith("/dashboard")) {
    if (!adminToken) {
      return redirectHome(req, "Unauthorized access");
    }

    const isValid = await verifyToken(adminToken);
    if (!isValid) {
      return clearAndRedirect(req, "admin_token", "Admin session expired");
    }
  }

  /* ---------- AUTH PAGES ---------- */
  if (
    (userToken || adminToken) &&
    (pathname === "/login" || pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

/* ===================== HELPERS ===================== */

async function verifyToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok;
  } catch {
    return false;
  }
}

function redirectHome(req: NextRequest, message: string): NextResponse {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set("toast_message", message, {
    httpOnly: false,
    path: "/",
    maxAge: 5,
  });
  return res;
}

function clearAndRedirect(
  req: NextRequest,
  cookieName: "token" | "admin_token",
  message: string
): NextResponse {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.delete(cookieName);
  res.cookies.set("toast_message", message, {
    httpOnly: false,
    path: "/",
    maxAge: 5,
  });
  return res;
}

/* ===================== MATCHER ===================== */

export const config = {
  matcher: ["/login", "/register", "/my-account/:path*", "/dashboard/:path*"],
};
