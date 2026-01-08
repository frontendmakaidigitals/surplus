import { NextResponse } from "next/server";

type TokenBody = {
  token: string;
  role: "user" | "admin";
};

export async function POST(req: Request) {
  const result = (await req.json()) as TokenBody;

  const res = NextResponse.json({ ok: true });

  res.cookies.set(
    result.role === "user" ? "token" : "admin_token",
    result.token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 days
    }
  );

  return res;
}
