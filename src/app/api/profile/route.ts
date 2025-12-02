import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Get the httpOnly cookie (only server-side can read it)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Forward request to external server with the token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // Don't cache this request
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to fetch profile";

      try {
        const errorData: any = await response.json(); // FIXED
        errorMessage = errorData?.message || errorMessage;
      } catch {
        // ignore JSON parse errors
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
