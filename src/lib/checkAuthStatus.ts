"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function checkAuthStatus() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const sessionId = cookieStore.get("cart_session")?.value;

  if (!token) {
    return {
      isAuthenticated: false,
      sessionId,
      expired: true,
    };
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      isAuthenticated: true,
      token,
      user: res.data.data,
      expired: false,
    };
  } catch {
    return {
      isAuthenticated: false,
      sessionId,
      expired: true,
    };
  }
}
