"use client";
import LoadingCard from "@/components/LoadingCard";
import PostIdeaCard from "@/components/PostIdeaCard";
import { IPostIdea } from "@/shared/interfaces";
import { getCookie } from "cookies-next";

import { useEffect, useLayoutEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState<IPostIdea[]>([]);

  const getPosts = async () => {
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
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
    const interval = setInterval(getPosts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-8 min-h-0 flex flex-col">
      <h2 className="text-3xl font-semibold">Your cool ideas ❄️</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 shadow-2xl"></div>
      <div className="flex flex-row flex-wrap gap-8  min-h-0 overflow-auto relative pt-6">
        {posts.length >= 1 ? (
          <>
            {posts!.map((post) => {
              if (post.is_finished) {
                return <PostIdeaCard key={post.id} post={post} />;
              } else {
                return <LoadingCard key={post.id} />;
              }
            })}
          </>
        ) : (
          <div>
            <p>No Posts created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
