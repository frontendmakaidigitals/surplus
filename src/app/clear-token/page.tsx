import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClearTokenPage() {
  const cookie = await cookies();
  cookie.delete("token");
  cookie.delete("admin_token");
  redirect("/login");
}
