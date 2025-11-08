import React from "react";

interface ProductCountProps {
  dataArray?: {}[];
  length?: number;
}

const ProductCount: React.FC<ProductCountProps> = ({
  dataArray = [],
  length,
}) => {
  const count = dataArray.length || length || 0;

  if (count < 1) {
    return (
      <div className="">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="">
      <p>
        Showing 1 - {Math.min(length ?? 24, count)} of <span>{count}</span>{" "}
        Products
      </p>
    </div>
  );
};

export default ProductCount;
