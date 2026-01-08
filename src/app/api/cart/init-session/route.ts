import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const existingSession = cookieStore.get("cart_session")?.value;

  if (existingSession) {
    return NextResponse.json({ sessionId: existingSession });
  }

  const sessionId = crypto.randomUUID();
  const res = NextResponse.json({ sessionId });

  res.cookies.set("cart_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}