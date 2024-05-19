"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IPostIdea } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import TextFormInput from "@/components/TextFormInput";
import RichTextFormInput from "@/components/RichTextFormInput";
import IdeaInfoArea from "@/components/IdeaInfoArea";
export default function Page() {
  const params = useParams<{ id: string }>();

  const [post, setPost] = useState<IPostIdea | null>(null);

  const getPost = async (id: string): Promise<IPostIdea[] | null> => {
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

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const post = data["post"];

    console.log(post);
    setPost(post);
    return post;
  };

  useLayoutEffect(() => {
    getPost(params.id);

    return () => {};
  }, []);

  return (
    <div className="px-8 min-h-0 flex flex-col">
      <h2 className="text-3xl font-semibold">Your next post idea</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 shadow-2xl"></div>
      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-8  min-h-0 overflow-auto relative pt-6">
        <div className="flex flex-col gap-4 ">
          <IdeaInfoArea title="Title" content={post?.title!} />
          <IdeaInfoArea title="Hashtags" content={post?.hashtags ?? "None"} />
          <IdeaInfoArea
            title="Video Descripition"
            content={post?.video_description!}
          />
          <IdeaInfoArea title="Idea Description" content={post?.description!} />
        </div>
        <div className="flex flex-col ">
          <IdeaInfoArea
            title="How to create your idea"
            content={post?.description!}
          />
        </div>
      </div>
    </div>
  );
}
