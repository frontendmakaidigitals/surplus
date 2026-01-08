"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function loginAction(data: { email: string; password: string }) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
      data
    );

    const token = res.data.data.token;
    const role = res.data.data.user.role; // <-- get role here

    const cookieStore = await cookies();
    cookieStore.set(role === "user" ? "token" : "admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 days
    });
    if (role === "user") {
      cookieStore.delete("admin_token");
    } else {
      cookieStore.delete("token");
    }

    return { success: true, role, token };
  } catch (error) {
    return { success: false, message: "Invalid login credentials" };
  }
}
