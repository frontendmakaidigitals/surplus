interface ConditionBadgeProps {
  condition: string;
}


export const ConditionBadge: React.FC<ConditionBadgeProps> = ({
  condition,
}) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-md text-xs font-semibold bg-secondary/80 text-white`}
    >
      {condition === "Fair" ? "In Fair Condition" : condition}
    </span>
  );
};
