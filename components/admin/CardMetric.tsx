import { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color?: "blue" | "green" | "amber" | "purple";
}

export default function MetricCard({
  title,
  value,
  icon,
  color = "blue",
}: Props) {

  const colors = {
    blue: "from-blue-600 to-blue-800",
    green: "from-green-600 to-emerald-700",
    amber: "from-amber-500 to-orange-600",
    purple: "from-purple-600 to-indigo-700",
  };

  return (
    <div
      className={`bg-gradient-to-r ${colors[color]} rounded-2xl shadow-lg p-6 text-white hover:scale-[1.02] transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium opacity-90">
          {title}
        </h3>

        <div className="rounded-lg bg-white/20 p-3">
          {icon}
        </div>
      </div>

      <h2 className="mt-6 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}