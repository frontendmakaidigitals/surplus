import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const userToken = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("admin_token")?.value;

  /* ---------------- USER: /my-account ---------------- */

  if (pathname.startsWith("/my-account")) {
    if (!userToken) {
      return redirectHome(req, "Please login to continue");
    }

    const valid = await verifyToken(`${API}/api/auth/me`, userToken);
    if (!valid) {
      return clearAndRedirect(req, "token", "Session expired");
    }
  }

  /* ---------------- ADMIN: /dashboard ---------------- */

  if (pathname.startsWith("/dashboard")) {
    if (!adminToken) {
      return redirectHome(req, "Unauthorized access");
    }

    const valid = await verifyToken(`${API}/api/admin/auth/me`, adminToken);

    if (!valid) {
      return clearAndRedirect(req, "admin_token", "Admin session expired");
    }
  }

  /* ---------------- AUTH PAGES ---------------- */

  if ((userToken || adminToken) && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

/* ---------------- HELPERS ---------------- */

async function verifyToken(url: string, token: string) {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

function redirectHome(req: NextRequest, message: string) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.set("toast_message", message, {
    httpOnly: false,
    path: "/",
    maxAge: 5,
  });
  return res;
}

function clearAndRedirect(
  req: NextRequest,
  cookieName: string,
  message: string
) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.delete(cookieName);
  res.cookies.set("toast_message", message, {
    httpOnly: false,
    path: "/",
    maxAge: 5,
  });
  return res;
}

/* ---------------- MATCHER ---------------- */

export const config = {
  matcher: ["/login", "/register", "/my-account/:path*", "/dashboard/:path*"],
};
