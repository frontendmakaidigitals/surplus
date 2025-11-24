import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/ui/shadcn/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
export function DashboardCard({
  title,
  value,
  trendData = [],
  trendDirection = "up",
  reverseColors = false, // ⭐ new
}: {
  title: string;
  value: string | number;
  trendData?: { value: number }[];
  trendDirection?: "up" | "down";
  reverseColors?: boolean;
}) {
  // ⭐ Apply color reversal logic
  const isUp = trendDirection === "up";
  const isPositive = reverseColors ? !isUp : isUp;

  const color = isPositive ? "text-green-600" : "text-red-600";
  const stroke = isPositive ? "#16a34a" : "#dc2626";

  return (
    <Card className="p-5 flex items-center justify-between shadow-md hover:shadow-lg transition rounded-xl">
      {/* LEFT */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-bold mt-3">{value}</h2>

        <div
          className={`flex mt-2 items-center gap-1 text-sm font-medium ${color}`}
        >
          {isPositive ? (
            <ArrowUpRight size={18} />
          ) : (
            <ArrowDownRight size={18} />
          )}
          {isPositive ? "Increasing" : "Decreasing"}
        </div>
      </div>

      {/* RIGHT CHART */}
      <div className="w-24 h-14 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}