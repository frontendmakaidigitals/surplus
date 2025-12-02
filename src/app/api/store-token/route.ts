import { NextResponse } from "next/server";

type TokenBody = {
  token: string;
};

export async function POST(req: Request) {
  const result = (await req.json()) as TokenBody;
  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
