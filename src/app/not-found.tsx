import { YnsLink } from "@/ui/yns-link";
import Image from "next/image";
import { HomeIcon } from "lucide-react";
export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl flex h-[80dvh] lg:min-h-screen flex-col items-center justify-center text-center px-4">
      <div className="h-auto bg-red-300 lg:h-[65dvh] ">
        <Image
          src={"/underconstruction.jpg"}
          alt="Under Construction"
          width={800}
          height={800}
		  className="w-full h-full object-contain"
        />
      </div>
      <YnsLink
        href="/"
        className="mt-6 flex items-center gap-2 bg-blue-600 text-blue-50 px-4 py-[.6rem] rounded-lg hover:bg-blue-800 transition-colors"
      >
        <HomeIcon />
        Go back home
      </YnsLink>
    </main>
  );
}
