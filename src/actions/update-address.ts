"use server";

import axios from "axios";

export async function updateProfileAction(formData: FormData) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/addresses`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (!response.status) {
      const data = await response.data;
      throw new Error(data?.message || "Profile update failed");
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
