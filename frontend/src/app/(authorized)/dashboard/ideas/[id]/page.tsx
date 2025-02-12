"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import type { IPostIdea } from "@/shared/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  Hash,
  Loader2,
  TrendingUp,
  Users,
  Video,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  Settings,
  Edit3,
  MessageCircle,
} from "lucide-react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<IPostIdea | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatHashtags = (hashtags: string): string[] => {
    if (hashtags) {
      const hashtagsStr = hashtags.replace(/^\{|\}$/g, "");
      return hashtagsStr.split(",").map((hashtag) => hashtag.trim());
    }
    return [];
  };

  const getStatusColor = (status: IPostIdea["status"]) => {
    const colors = {
      unadded: "bg-gray-500",
      used: "bg-green-500",
      planned: "bg-blue-500",
      dropoff: "bg-red-500",
    };
    return colors[status];
  };

  const getPost = async (id: string) => {
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
  };

  useEffect(() => {
    getPost(params.id);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{post?.title}</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant={post?.is_finished ? "default" : "secondary"}>
              {post?.is_finished ? (
                <CheckCircle2 className="w-4 h-4 mr-1" />
              ) : (
                <XCircle className="w-4 h-4 mr-1" />
              )}
              {post?.is_finished ? "Completed" : "In Progress"}
            </Badge>
            <Badge variant={post?.is_liked ? "default" : "secondary"}>
              <ThumbsUp className="w-4 h-4 mr-1" />
              {post?.is_liked ? "Liked" : "Not Liked"}
            </Badge>
            <Badge className={`${getStatusColor(post?.status!)}`}>
              {post?.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{post?.description}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {formatHashtags(post?.hashtags!).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <Hash className="w-3 h-3 mr-1" />
                    {tag.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Content Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="seo">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    SEO & Keywords
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post?.seo_keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timing">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Best Posting Times
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 pt-2">
                    {post?.best_posting_times.map((time, index) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="engagement">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Engagement Strategy
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pt-2 text-muted-foreground">
                    {post?.engagement_strategy}
                  </p>
                  <h4 className="font-medium mt-4 mb-2">
                    Engagement Suggestions:
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {post?.engagement_suggestions.map((suggestion, index) => (
                      <li key={index} className="text-muted-foreground">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="platform">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Platform Adaptation
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pt-2 text-muted-foreground">
                    {post?.platform_adaptation}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="editing">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Editing Suggestions
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 pt-2">
                    {post?.editing_suggestions.map((suggestion, index) => (
                      <li key={index} className="text-muted-foreground">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Creation Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Instructions</h3>
              <div className="prose prose-gray max-w-none">
                {post?.video_creation_instructions
                  .split("\n")
                  .map((instruction, index) => (
                    <p key={index} className="mb-4 text-muted-foreground">
                      {instruction}
                    </p>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Suggested Script</h3>
              <div className="space-y-2">
                {post?.suggested_script.map((line, index) => (
                  <div key={index} className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">{line}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Relevant Data</h3>
              <div className="prose prose-gray max-w-none">
                {post?.relevant_data.map((data, index) => (
                  <p key={index} className="mb-2 text-muted-foreground">
                    {data}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <Button variant="outline" size="lg">
          Save Draft
        </Button>
        <Button size="lg">Create Your Idea Now</Button>
      </div>
    </div>
  );
}
