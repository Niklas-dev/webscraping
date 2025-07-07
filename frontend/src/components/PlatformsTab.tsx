import { PlatformSection } from "./PlatformSection";

interface TrendItem {
  title: string;
  source: string;
  url?: string;
  score?: number;
  views?: number;
}

interface TrendsData {
  reddit?: TrendItem[];
  news?: TrendItem[];
  youtube?: TrendItem[];
}

interface PlatformsTabProps {
  allTrends: TrendsData;
}

export function PlatformsTab({ allTrends }: PlatformsTabProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">By Platform</h2>
        <div className="text-sm text-gray-500">
          Total:{" "}
          {(allTrends.reddit?.length || 0) +
            (allTrends.youtube?.length || 0) +
            (allTrends.news?.length || 0)}{" "}
          trends
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PlatformSection
          title="Reddit"
          icon="R"
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          trends={allTrends.reddit || []}
          formatNumber={formatNumber}
        />
        <PlatformSection
          title="YouTube"
          icon="Y"
          iconBg="bg-red-100"
          iconColor="text-red-600"
          trends={allTrends.youtube || []}
          formatNumber={formatNumber}
        />
        <PlatformSection
          title="News"
          icon="N"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          trends={allTrends.news || []}
          formatNumber={formatNumber}
        />
      </div>
    </div>
  );
}
