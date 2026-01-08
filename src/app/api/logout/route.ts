// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

type LogoutRequestBody = {
  role: "user" | "admin";
};

export async function POST(req: Request) {
  const body = (await req.json()) as LogoutRequestBody;

  const res = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  if (body.role === "user") {
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
  } else if (body.role === "admin") {
    res.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
  }

  return res;
}

// Add GET method for server-side clearing
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") as "user" | "admin" | null;

  const res = NextResponse.redirect(new URL("/login", req.url));

  if (role === "user") {
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
  } else if (role === "admin") {
    res.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
  } else {
    // Clear both if role not specified
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    res.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
  }

  return res;
}
