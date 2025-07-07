"use client";

import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendItem {
  title: string;
  source: string;
  url?: string;
  score?: number;
  views?: number;
}

interface PlatformSectionProps {
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  trends: TrendItem[];
  formatNumber: (num: number) => string;
}

export function PlatformSection({
  title,
  icon,
  iconBg,
  iconColor,
  trends,
  formatNumber,
}: PlatformSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedTrends = showAll ? trends : trends.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}
          >
            <span className={`${iconColor} font-semibold text-sm`}>{icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{trends.length} trends</p>
          </div>
        </div>
        {trends.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Show All <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-2 overflow-y-auto">
        {displayedTrends.map((trend, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {trend.title}
                </p>
                {trend.score ? (
                  <p className="text-xs text-gray-500">
                    {formatNumber(trend.score)} upvotes
                  </p>
                ) : (
                  ""
                )}
                {trend.views ? (
                  <p className="text-xs text-gray-500">
                    {formatNumber(trend.views)} views
                  </p>
                ) : (
                  ""
                )}
                {!trend.score && !trend.views && title === "News" && (
                  <p className="text-xs text-gray-500">Breaking news</p>
                )}
              </div>

              {trend.url && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 opacity-100 group-hover:opacity-100 transition-opacity"
                  onClick={() => window.open(trend.url, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAll && trends.length > 10 && (
        <div className="text-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(false)}
            className="text-gray-500"
          >
            Show Less <ChevronUp className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
