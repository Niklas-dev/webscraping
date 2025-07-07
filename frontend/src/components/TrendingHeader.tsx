"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function TrendingHeader({
  onRefresh,
  isRefreshing,
}: TrendingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">
          See what&apos;s <span className="text-yellow-500">trending</span> now
        </h1>
        <p className="text-gray-600">
          Discover viral content across all platforms
        </p>
      </div>
      <Button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
      >
        <RefreshCw
          className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
        />
        Refresh
      </Button>
    </div>
  );
}
