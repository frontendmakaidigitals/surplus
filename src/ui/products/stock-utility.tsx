export default function RenderStockStatus(stock: number) {
  if (stock === 0) {
    return (
      <span className="text-red-600 !text-[12px] font-semibold">
        Out of stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="text-amber-600 !text-[12px] font-semibold">
        Only few left
      </span>
    );
  }

  return (
    <span className="text-secondary !text-[12px] font-semibold">In stock</span>
  );
}
