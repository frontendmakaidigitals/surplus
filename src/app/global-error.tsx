"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<body className="flex flex-col items-center justify-center min-h-screen gap-4 text-center bg-gray-50 text-gray-800">
				<h2 className="text-2xl font-semibold">Something went wrong</h2>
				<p>{error.message}</p>

				{(error.digest || error.stack) && (
					<details className="max-w-lg text-left bg-white border rounded-lg p-4 shadow-sm">
						<summary className="cursor-pointer font-medium text-gray-700">More details</summary>
						{error.digest && <p className="mt-2 text-sm text-gray-500">{error.digest}</p>}
						{error.stack && (
							<pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-sm text-gray-600">
								{error.stack}
							</pre>
						)}
					</details>
				)}

				<button
					onClick={() => reset()}
					className="mt-4 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 transition-colors"
				>
					Try Again
				</button>
			</body>
		</html>
	);
}
