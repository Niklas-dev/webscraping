"use client";
import PostIdeaCard from "@/components/PostIdeaCard";
import { IPostIdea } from "@/shared/interfaces";
import { getCookie } from "cookies-next";

import { useEffect, useState } from "react";

export default function Page() {
  const [likedPosts, setLikedPosts] = useState<IPostIdea[] | null>([]);
  const [refetchState, setRefetchState] = useState(false);

  const getLikedPosts = async (): Promise<IPostIdea[] | null> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/liked-posts`,
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

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const liked_posts = data["liked_posts"];
    console.log(liked_posts);
    setLikedPosts(liked_posts);
    return liked_posts;
  };

  useEffect(() => {
    getLikedPosts();

    return () => {};
  }, [refetchState]);
  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">Your liked ideas ❤️</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 "></div>
      <div className="flex flex-row flex-wrap gap-8  min-h-0 overflow-auto relative pt-6">
        {likedPosts!.length >= 1 ? (
          <>
            {likedPosts!.map((post) => {
              return (
                <PostIdeaCard
                  clickCallback={(value) => setRefetchState((prev) => !prev)}
                  key={post.id}
                  post={post}
                />
              );
            })}
          </>
        ) : (
          <div>
            <p>No Posts liked yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
