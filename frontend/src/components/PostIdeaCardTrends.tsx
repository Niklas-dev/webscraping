"use client";

import {
  ArrowRight,
  ExternalLink,
  Hash,
  Play,
  MessageCircle,
  Eye,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface SocialMediaIdeaTrends {
  title: string;
  source: string;
  post_angle: string;
  hashtags: string[];
  engagement_potential: string;
  original_url: string;
  timestamp: string;
  thumbnail?: string;
  has_visual?: boolean;
  post_type?: string;
  // YouTube specific
  video_url?: string;
  channel?: string;
  views?: number;
  // Reddit specific
  subreddit?: string;
  reddit_score?: number;
  comments?: number;
  // News specific
  news_source?: string;
  published_date?: string;
}

interface PostIdeaCardTrendsProps {
  idea: SocialMediaIdeaTrends;
}

export function PostIdeaCardTrends({ idea }: PostIdeaCardTrendsProps) {
  const router = useRouter();

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

  const getEngagementStyle = (potential: string) => {
    switch (potential?.toLowerCase()) {
      case "very high":
        return "border-green-200 bg-green-50 text-green-700";
      case "high":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";
      default:
        return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleCreatePost = () => {
    // Create URL params with the trend data
    const params = new URLSearchParams({
      from_trend: "true",
      trend_title: idea.title,
      trend_source: idea.source,
      trend_angle: idea.post_angle,
      trend_hashtags: idea.hashtags.join(","),
      trend_engagement: idea.engagement_potential,
      trend_url: idea.original_url || idea.video_url || "",
      ...(idea.post_type && { trend_post_type: idea.post_type }),
      ...(idea.channel && { trend_channel: idea.channel }),
      ...(idea.subreddit && { trend_subreddit: idea.subreddit }),
      ...(idea.news_source && { trend_news_source: idea.news_source }),
    });

    router.push(`/dashboard/create-post-idea?${params.toString()}`);
  };

  const getSourceSpecificInfo = () => {
    switch (idea.source) {
      case "youtube":
        return (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {idea.channel && (
              <span className="flex items-center gap-1">
                <Play className="h-3 w-3" />
                {idea.channel}
              </span>
            )}
            {idea.views && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatNumber(idea.views)}
              </span>
            )}
          </div>
        );
      case "reddit":
        return (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {idea.subreddit && <span>r/{idea.subreddit}</span>}
            {idea.reddit_score && (
              <span className="flex items-center gap-1">
                ↑ {formatNumber(idea.reddit_score)}
              </span>
            )}
            {idea.comments && (
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {formatNumber(idea.comments)}
              </span>
            )}
          </div>
        );
      case "news":
        return (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {idea.news_source && <span>{idea.news_source}</span>}
            {idea.published_date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(idea.published_date).toLocaleDateString()}
              </span>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      {/* Thumbnail Section */}
      {idea.thumbnail && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={idea.thumbnail || "/placeholder.svg"}
            alt={idea.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const container = target.parentElement;
              if (container) {
                container.style.display = "none";
              }
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              variant="outline"
              className={`${getSourceBadgeStyle(
                idea.source
              )} backdrop-blur-sm bg-white/90`}
            >
              {idea.source}
            </Badge>
            {idea.post_type && idea.post_type !== "text" && (
              <Badge
                variant="outline"
                className="backdrop-blur-sm bg-white/90 border-purple-200 bg-purple-50 text-purple-700"
              >
                {idea.post_type}
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <Badge
              variant="outline"
              className={`${getEngagementStyle(
                idea.engagement_potential
              )} backdrop-blur-sm bg-white/90`}
            >
              {idea.engagement_potential}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className={idea.thumbnail ? "pb-3" : "pb-3"}>
        {/* Show badges here only if no thumbnail */}
        {!idea.thumbnail && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={getSourceBadgeStyle(idea.source)}
              >
                {idea.source}
              </Badge>
              {idea.post_type && idea.post_type !== "text" && (
                <Badge
                  variant="outline"
                  className="border-purple-200 bg-purple-50 text-purple-700"
                >
                  {idea.post_type}
                </Badge>
              )}
            </div>
            <Badge
              variant="outline"
              className={getEngagementStyle(idea.engagement_potential)}
            >
              {idea.engagement_potential}
            </Badge>
          </div>
        )}
        <CardTitle className="text-base line-clamp-2 leading-tight">
          {idea.title}
        </CardTitle>
        {getSourceSpecificInfo()}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-700 line-clamp-2 font-medium">
            {idea.post_angle}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {idea.hashtags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              <Hash className="h-2 w-2" />
              {tag.replace("#", "")}
            </span>
          ))}
          {idea.hashtags.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{idea.hashtags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={handleCreatePost}
          >
            Create Post
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
          {(idea.original_url || idea.video_url) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(idea.video_url || idea.original_url, "_blank")
              }
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
