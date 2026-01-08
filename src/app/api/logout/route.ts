import { cookies } from "next/headers";
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

export async function GET() {
  const cookie = await cookies();
  cookie.delete("token");
  cookie.delete("admin_token");

  return NextResponse.redirect(new URL("/login"));
}
