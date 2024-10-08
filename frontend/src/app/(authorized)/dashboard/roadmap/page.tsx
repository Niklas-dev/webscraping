"use client";

import PostCard from "@/components/PostCard";
import Column from "@/components/TaskColumn";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Task {
  id: number;
  title: string;
  assignee: string;
  date: string;
  status: "Unadded" | "To-do" | "Doing" | "Done";
}
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Task[]>([]);

  const fetchPosts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/posts`,
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
      return null;
    }

    const data = await response.json();

    const posts = data["posts"];
    setIsLoading(false);
    setPosts(posts);
  };

  const movePost = (
    id: number,
    newStatus: "Unadded" | "To-do" | "Doing" | "Done"
  ) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="px-8">
        <h2 className="text-3xl font-semibold">Plan your content 📈</h2>
        <div className="h-[2px] w-full bg-gray-200 mt-2 "></div>
        <div className="pt-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Unplanned post ideas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts
                .filter((p) => p.status === "Unadded")
                .map((post) => (
                  <PostCard key={post.id} post={post} movePost={movePost} />
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Column
              title="To-do"
              posts={posts.filter((p) => p.status === "To-do")}
              movePost={movePost}
            />
            <Column
              title="Doing"
              posts={posts.filter((p) => p.status === "Doing")}
              movePost={movePost}
            />
            <Column
              title="Done"
              posts={posts.filter((p) => p.status === "Done")}
              movePost={movePost}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
