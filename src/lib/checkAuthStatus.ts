"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function checkAuthStatus() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const adminToken = cookieStore.get("admin_token")?.value;
  const sessionId = cookieStore.get("cart_session")?.value;

  if (!token && !adminToken) {
    return {
      isAuthenticated: false,
      sessionId,
      expired: true,
    };
  }

  const isAdmin = Boolean(adminToken);
  const authToken = adminToken || token;
  const endpoint = "/api/auth/me";

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return {
      isAuthenticated: true,
      role: isAdmin ? "admin" : "user",
      token: authToken,
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
