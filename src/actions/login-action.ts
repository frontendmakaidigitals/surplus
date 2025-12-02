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
    const cookie = await cookies();
    cookie.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Invalid login credentials" };
  }
}
