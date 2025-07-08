"use client";

import PostTypeSelection from "@/components/PostTypeSelection";
import RichTextFormInput from "@/components/RichTextFormInput";
import TextFormInput from "@/components/TextFormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Hash, Eye, MessageCircle, Play } from "lucide-react";
import type { IFullUserData } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CONTENT_FORMATS = [
  { value: "image", label: "Image Post" },
  { value: "video", label: "Video" },
  { value: "carousel", label: "Carousel" },
  { value: "story", label: "Story" },
  { value: "reel", label: "Reel" },
];

const POST_GOALS = [
  { value: "engagement", label: "Increase Engagement" },
  { value: "sales", label: "Drive Sales" },
  { value: "awareness", label: "Brand Awareness" },
  { value: "traffic", label: "Drive Traffic" },
  { value: "leads", label: "Generate Leads" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
];

interface TrendData {
  title: string;
  source: string;
  post_angle: string;
  hashtags: string[];
  engagement_potential: string;
  original_url: string;
  post_type?: string;
  channel?: string;
  subreddit?: string;
  news_source?: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [formData, setFormData] = useState({
    niche: "",
    post_goal: "",
    target_audience: "",
    content_format: "",
    tone: "",
    extra: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const post_type = searchParams.get("post_type");
  const from_trend = searchParams.get("from_trend") === "true";

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

  const loadTrendData = () => {
    if (from_trend) {
      const trend: TrendData = {
        title: searchParams.get("trend_title") || "",
        source: searchParams.get("trend_source") || "",
        post_angle: searchParams.get("trend_angle") || "",
        hashtags: searchParams.get("trend_hashtags")?.split(",") || [],
        engagement_potential: searchParams.get("trend_engagement") || "",
        original_url: searchParams.get("trend_url") || "",
        post_type: searchParams.get("trend_post_type") || undefined,
        channel: searchParams.get("trend_channel") || undefined,
        subreddit: searchParams.get("trend_subreddit") || undefined,
        news_source: searchParams.get("trend_news_source") || undefined,
      };
      setTrendData(trend);
    }
  };

  const loadPreferences = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      toast.error("Failed to load preferences.", {
        icon: "🤔",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return null;
    }

    const data: IFullUserData = await response.json();

    // If coming from trend, pre-populate some fields based on trend data
    let initialExtra = data.extra_preference ?? "";
    if (from_trend && trendData) {
      initialExtra =
        `${initialExtra}\n\nInspired by trending content: "${trendData.title}"\nTrend angle: ${trendData.post_angle}`.trim();
    }

    setFormData({
      niche: data.niche_preference ?? "",
      post_goal: "",
      target_audience: "",
      content_format: trendData?.post_type || "",
      tone: "",
      extra: initialExtra,
    });
    setIsLoading(false);
  };

  const createNewPostIdea = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/create-new-post-idea`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        body: JSON.stringify({
          ...formData,
          trend_data: from_trend ? trendData : undefined,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      const info = data["detail"];
      toast.error(info, {
        icon: "🤔",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return null;
    }

    const data = await response.json();
    const info = data["detail"];

    toast.success(info, {
      icon: "❤️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    router.push("/dashboard/ideas");
  };

  const renderTrendSourceInfo = () => {
    if (!trendData) return null;

    switch (trendData.source) {
      case "youtube":
        return trendData.channel ? (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Play className="h-3 w-3" />
            {trendData.channel}
          </span>
        ) : null;
      case "reddit":
        return trendData.subreddit ? (
          <span className="text-xs text-gray-500">r/{trendData.subreddit}</span>
        ) : null;
      case "news":
        return trendData.news_source ? (
          <span className="text-xs text-gray-500">{trendData.news_source}</span>
        ) : null;
      default:
        return null;
    }
  };

  useEffect(() => {
    loadTrendData();
  }, [searchParams]);

  useEffect(() => {
    if (from_trend ? trendData : true) {
      loadPreferences();
    }
  }, [trendData, from_trend]);

  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">
        {from_trend ? "Create post from trend" : "Create your next big idea"}
      </h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2"></div>

      {/* Trend Data Display */}
      {from_trend && trendData && (
        <div className="mt-6 mb-6">
          <h3 className="text-lg font-medium mb-3">
            Trending Content Inspiration
          </h3>
          <Card className="border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={getSourceBadgeStyle(trendData.source)}
                  >
                    {trendData.source}
                  </Badge>
                  {trendData.post_type && trendData.post_type !== "text" && (
                    <Badge
                      variant="outline"
                      className="border-purple-200 bg-purple-50 text-purple-700"
                    >
                      {trendData.post_type}
                    </Badge>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className={getEngagementStyle(trendData.engagement_potential)}
                >
                  {trendData.engagement_potential}
                </Badge>
              </div>
              <CardTitle className="text-base line-clamp-2 leading-tight">
                {trendData.title}
              </CardTitle>
              {renderTrendSourceInfo()}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-700 font-medium">
                  {trendData.post_angle}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {trendData.hashtags.slice(0, 5).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    <Hash className="h-2 w-2" />
                    {tag.replace("#", "")}
                  </span>
                ))}
                {trendData.hashtags.length > 5 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{trendData.hashtags.length - 5} more
                  </span>
                )}
              </div>
              {trendData.original_url && (
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      window.open(trendData.original_url, "_blank")
                    }
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View original
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="w-full pt-4 flex flex-col gap-6 items-start">
        <div className="flex flex-row w-full gap-6">
          <div className="flex flex-col gap-6 w-full">
            <TextFormInput
              id="niche"
              label="Niche"
              placeholder="The niche of your post"
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, niche: value }))
              }
              value={formData.niche}
            />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="post_goal" className="text-sm font-medium">
                  Post Goal
                </label>
                <Select
                  value={formData.post_goal}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      post_goal: value,
                    }))
                  }
                >
                  <SelectTrigger id="post_goal">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_GOALS.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="content_format" className="text-sm font-medium">
                  Content Format
                </label>
                <Select
                  value={formData.content_format}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      content_format: value,
                    }))
                  }
                >
                  <SelectTrigger id="content_format">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TextFormInput
              id="target_audience"
              label="Target Audience"
              placeholder="Describe your target audience"
              onChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  target_audience: value,
                }))
              }
              value={formData.target_audience}
            />

            <div className="space-y-2">
              <label htmlFor="tone" className="text-sm font-medium">
                Content Tone
              </label>
              <Select
                value={formData.tone}
                onValueChange={(value) =>
                  setFormData((prevData) => ({ ...prevData, tone: value }))
                }
              >
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <RichTextFormInput
              id="extra"
              label="Extra information"
              placeholder="Add anything relevant that doesn't fit in the fields above."
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, extra: value }))
              }
              value={formData.extra}
            />

            <button
              onClick={() => createNewPostIdea()}
              className="bg-[#1b1b1b] hover:bg-[#252525] text-white px-6 py-2 rounded-xl text-lg font-semibold"
            >
              {from_trend ? "Create Post from Trend" : "Create Your Idea Now"}
            </button>
          </div>
          <div className="w-fit">
            <PostTypeSelection post_type={post_type!} />
          </div>
        </div>
      </div>
    </div>
  );
}
