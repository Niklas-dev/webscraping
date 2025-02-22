"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import type { IPostIdea } from "@/shared/interfaces";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";
import ContentOverview from "@/components/PostIdeaContentOverview";
import ContentStrategy from "@/components/PostIdeaContentStrategy";
import PostHeader from "@/components/PostIdeaHeader";
import VideoCreationGuide from "@/components/PostIdeaVideoCreationGuide";
import { BiBookAdd, BiHeart } from "react-icons/bi";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<IPostIdea | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getPost(id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/socials/posts/${id}`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
        }
      );

      if (!response.ok) return null;

      const data = await response.json();
      setPost(data.post);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch post:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPost(params.id);
  }, [params.id]); // Added getPost to dependencies

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <PostHeader post={post} />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <ContentOverview post={post} />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <ContentStrategy post={post} />
            <VideoCreationGuide post={post} />
          </div>
        </div>

        <div className="flex justify-between gap-4 sticky bottom-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg border shadow-sm">
          <Button variant="outline" size="lg" className="w-full max-w-[200px]">
            Like Idea <BiHeart />
          </Button>
          <Button size="lg" className="w-full max-w-[200px]">
            Add Idea to planned <BiBookAdd />
          </Button>
        </div>
      </div>
    </div>
  );
}
