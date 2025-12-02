import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Create a response
  const res = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear the token cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0, // expires immediately
  });

  return res;
}
