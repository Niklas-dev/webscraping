"use client";

import { Heart, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrendItem {
  title: string;
  source: string;
  url?: string;
  score?: number;
  views?: number;
  timestamp?: string;
}

interface TrendItemProps {
  trend: TrendItem;
}

export function TrendItemComponent({ trend }: TrendItemProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getSourceBadgeStyle = (source: string) => {
    switch (source) {
      case "reddit":
        return "border-orange-200 bg-orange-50 text-orange-700";
      case "youtube":
        return "border-red-200 bg-red-50 text-red-700";
      default:
        return "border-blue-200 bg-blue-50 text-blue-700";
    }
  };

  return (
    <Card className="hover:shadow-sm transition-shadow border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={getSourceBadgeStyle(trend.source)}
              >
                {trend.source}
              </Badge>
              {trend.score ? (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Heart className="h-3 w-3" />
                  {formatNumber(trend.score)}
                </div>
              ) : (
                ""
              )}
              {trend.views ? (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Eye className="h-3 w-3" />
                  {formatNumber(trend.views)}
                </div>
              ) : (
                ""
              )}
            </div>
            <h3 className="font-medium text-gray-900 line-clamp-2">
              {trend.title}
            </h3>
          </div>
          {trend.url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(trend.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
