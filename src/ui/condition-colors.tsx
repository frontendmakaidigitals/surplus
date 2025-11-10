import React from "react";

interface ConditionBadgeProps {
  condition: string;
}

const conditionColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Refurbished: "bg-green-100 text-green-700",
  Used: "bg-orange-100 text-orange-700",
  Fair: "bg-yellow-100 text-yellow-700",
  Old: "bg-gray-100 text-gray-700",
};

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({ condition }) => {
  const colorClass = conditionColors[condition] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-md text-sm font-semibold ${colorClass}`}
    >
      {condition === "Fair" ? "In Fair Condition" : condition}
    </span>
  );
};
