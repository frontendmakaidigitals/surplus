export async function ProductNotFound({ query }: { query: string | undefined }) {
	return (
		<div className="flex h-[60vh] flex-col items-center justify-center gap-4">
			<h1 className="text-3xl font-bold">
				No products found for “{query}”
			</h1>
			<p className="max-w-md text-center text-neutral-500">
				Try searching with different keywords or check back later for new arrivals.
			</p>
		</div>
	);
}
