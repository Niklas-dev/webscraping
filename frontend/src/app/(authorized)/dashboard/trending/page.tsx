"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { AnalyticsTab } from "@/components/AnalyticsTab";
import { PlatformsTab } from "@/components/PlatformsTab";
import { PostIdeasTab } from "@/components/PostIdeasTabsTrends";
import { StatsCards } from "@/components/StatsCards";
import { TopTrendsTab } from "@/components/TopTrendsTab";
import { TrendingHeader } from "@/components/TrendingHeader";

interface TrendItem {
  title: string;
  source: string;
  url?: string;
  score?: number;
  views?: number;
  timestamp?: string;
  post_angle?: string;
  hashtags?: string[];
  engagement_potential?: string;
  thumbnail?: string;
}

interface SocialMediaIdea {
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

interface TrendsData {
  reddit?: TrendItem[];
  news?: TrendItem[];
  youtube?: TrendItem[];
  total_items?: number;
}

export default function TrendingPage() {
  const [allTrends, setAllTrends] = useState<TrendsData>({});
  const [topTrends, setTopTrends] = useState<TrendItem[]>([]);
  const [socialMediaIdeas, setSocialMediaIdeas] = useState<SocialMediaIdea[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("ideas");

  const fetchWithAuth = async (endpoint: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}${endpoint}`,
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
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    return response.json();
  };

  const fetchAllData = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) setIsRefreshing(true);

      // Updated endpoint paths to match your new API with auth
      const [trendsData, topTrendsData, ideasData] = await Promise.all([
        fetchWithAuth("/trending/"),
        fetchWithAuth("/trending/top?limit=40"),
        fetchWithAuth(
          "/trending/social-media-ideas?limit=25&include_thumbnails=true"
        ),
      ]);

      // Add debugging logs
      console.log("All trends data:", trendsData);
      console.log("Top trends data:", topTrendsData);
      console.log("Ideas data:", ideasData);

      setAllTrends(trendsData);
      setTopTrends(topTrendsData.top_trends || []);
      setSocialMediaIdeas(ideasData.social_media_ideas || []);

      if (showRefreshToast) {
        toast.success("Trends updated!", {
          icon: "🔥",
          style: {
            borderRadius: "8px",
            background: "#1f2937",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch trends:", error);
      toast.error("Failed to load trends", {
        style: {
          borderRadius: "8px",
          background: "#1f2937",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleRefresh = () => {
    fetchAllData(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
            <span className="text-lg font-medium text-gray-700">
              Loading trends...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Current state:", {
      allTrends,
      topTrends: topTrends.length,
      socialMediaIdeas: socialMediaIdeas.length,
      redditTrends: allTrends.reddit?.length,
      youtubeTrends: allTrends.youtube?.length,
      newsTrends: allTrends.news?.length,
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-8 space-y-8">
        <TrendingHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        <StatsCards
          postIdeasCount={socialMediaIdeas.length}
          topTrendsCount={topTrends.length}
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-gray-100">
            <TabsTrigger value="ideas" className="data-[state=active]:bg-white">
              Ideas
            </TabsTrigger>
            <TabsTrigger value="top" className="data-[state=active]:bg-white">
              Top
            </TabsTrigger>
            <TabsTrigger
              value="platforms"
              className="data-[state=active]:bg-white"
            >
              Platforms
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas">
            <PostIdeasTab socialMediaIdeas={socialMediaIdeas} />
          </TabsContent>

          <TabsContent value="top">
            <TopTrendsTab topTrends={topTrends} />
          </TabsContent>

          <TabsContent value="platforms">
            <PlatformsTab allTrends={allTrends} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab
              socialMediaIdeas={socialMediaIdeas}
              allTrends={allTrends}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
