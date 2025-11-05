import { YnsLink } from "@/ui/yns-link";

export default function NotFound() {
	return (
		<main className="mx-auto max-w-xl flex min-h-screen flex-col items-center justify-center text-center px-4">
			<h1 className="mt-4 text-4xl font-black text-gray-900">Page Not Found</h1>
			<p className="mt-4 text-lg text-gray-600">
				Sorry, the page you’re looking for doesn’t exist or may have been moved.
			</p>
			<YnsLink href="/" className="mt-6 text-blue-600 underline hover:text-blue-800 transition-colors">
				Go back home
			</YnsLink>
		</main>
	);
}
