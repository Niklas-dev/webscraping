"use client";

import { ScheduledPost } from "@/shared/interfaces";
import { useState } from "react";

import toast from "react-hot-toast";

export function useScheduledPosts() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      title: "Product Launch Announcement",
      description: "Exciting new features coming to our platform!",
      publishDate: "2023-06-15T14:00",
      platforms: ["youtube", "tiktok"],
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    // ... other mock posts
  ]);

  const addPost = (post: ScheduledPost) => {
    setScheduledPosts((prev) => [post, ...prev]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this scheduled post?")) {
      setScheduledPosts((prev) => prev.filter((post) => post.id !== id));
      toast.success("Post deleted");
    }
  };

  return { scheduledPosts, addPost, handleDelete };
}
