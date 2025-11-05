import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { env, publicUrl } from "@/env.mjs";

export const metadata: Metadata = {
	title: "Your Next Store",
	description: "Delightful commerce for everyone.",
	metadataBase: new URL(publicUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="flex min-h-full flex-col bg-white">
				<div className="flex min-h-full flex-1 flex-col" vaul-drawer-wrapper="">
					{children}
				</div>
				<Toaster position="top-center" offset={10} />

				{env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
					<Script
						async
						src="/stats/script.js"
						data-host-url={publicUrl + "/stats"}
						data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
					/>
				)}

				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
