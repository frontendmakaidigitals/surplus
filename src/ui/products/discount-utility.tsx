export default function DiscountUtility(
  discountPercent?: number,
  startDate?: string,
  endDate?: string,
  price?: number
) {
  // Validate required fields
  if (!price || !discountPercent || discountPercent <= 0) return null;

  const now = new Date();
  const end = new Date(endDate || "");

  // End date is missing or discount expired
  if (!endDate || now > end) return null;

  // Validate start date
  if (startDate) {
    const start = new Date(startDate);
    if (now < start) return null;
  }

  // Calculate discounted price
  const discountedPrice = price - price * (discountPercent / 100);

  return (
    <div className="flex flex-col gap-0.5">
      {/* Prices */}
      <div className="flex items-baseline gap-2">
        {/* Discounted Price */}
        <span className="text-2xl font-[600] text-gray-900">
          ${discountedPrice.toFixed(2)}
        </span>

        {/* Original Price */}
        <span className="text-sm text-gray-500 font-[500] line-through">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
