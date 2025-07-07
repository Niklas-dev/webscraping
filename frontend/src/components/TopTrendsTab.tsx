import { Badge } from "@/components/ui/badge";
import { TrendItemComponent } from "./TrendItem";

interface TrendItem {
  title: string;
  source: string;
  url?: string;
  score?: number;
  views?: number;
  timestamp?: string;
}

interface TopTrendsTabProps {
  topTrends: TrendItem[];
}

export function TopTrendsTab({ topTrends }: TopTrendsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Top Trends</h2>
        <Badge variant="secondary">Live</Badge>
      </div>

      <div className="space-y-3">
        {topTrends.map((trend, index) => (
          <TrendItemComponent key={index} trend={trend} />
        ))}
      </div>
    </div>
  );
}
