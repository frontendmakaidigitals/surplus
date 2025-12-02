import { Suspense } from "react";
import axios from "axios";
import UserDashboard from "@/app/(store)/my-account/user-dashboard";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data.data;
  } catch (e) {
    console.error("AUTH ERROR:", e);
    return null;
  }
}

export default async function Page() {
  const user = await getUser();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDashboard userData={user} />
    </Suspense>
  );
}
