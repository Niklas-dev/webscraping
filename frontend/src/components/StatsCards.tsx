import { Star, TrendingUp, Globe, Zap } from "lucide-react";

interface StatsCardsProps {
  postIdeasCount: number;
  topTrendsCount: number;
}

export function StatsCards({
  postIdeasCount,
  topTrendsCount,
}: StatsCardsProps) {
  const stats = [
    {
      icon: Star,
      label: "Post Ideas",
      value: postIdeasCount,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "Top Trends",
      value: topTrendsCount,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Globe,
      label: "Platforms",
      value: 3,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Zap,
      label: "Live Updates",
      value: "Active",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 ${stat.bgColor} rounded-lg`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
