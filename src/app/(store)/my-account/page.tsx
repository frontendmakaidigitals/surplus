import { Suspense } from "react";
import UserDashboard from "@/app/(store)/my-account/user-dashboard";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDashboard />
    </Suspense>
  );
}
