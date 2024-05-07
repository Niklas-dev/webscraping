"use client";

import { IPostIdea } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import Link from "next/link";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  BiComment,
  BiDotsHorizontal,
  BiDotsVerticalRounded,
  BiHeart,
  BiMenu,
} from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

export default function PostIdeaCard({
  post,
  clickCallback,
}: {
  post: IPostIdea;
  clickCallback: (value: boolean) => void;
}) {
  const [postState, setPostState] = useState<IPostIdea>(post);

  const updatePostLike = async (newLikeValue: boolean) => {
    setPostState({ ...postState, is_liked: !postState.is_liked });
    clickCallback(newLikeValue);

    toast.success("Post Idea like status changed", {
      icon: "❤️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/change-like-post-idea`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        body: JSON.stringify({
          id: postState.id,
          is_liked: newLikeValue,
        }),
      }
    );

    if (!response.ok) {
      toast.error("Failed to update post idea.", {
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
    const post: IPostIdea = data["post"];

    setPostState(post);
  };

  return (
    <Link
      href={`/dashboard/ideas/${post.id}`}
      key={post.id}
      className="h-[35rem] w-[19rem] bg-gray-300 rounded-xl flex flex-col  px-2 pb-2 group/card hover:-translate-y-2 transition-all cursor cursor-pointer text-white "
    >
      <div className="p-1.5 group-hover/card:-translate-y-1 transition-all flex flex-row justify-center">
        <div className="h-4 w-4 bg-gray-900 rounded-full z-20"></div>
      </div>
      <div className="bg-gradient-to-tr from-[#170E13] to-[#7A7ADB] h-full w-full rounded-xl  flex flex-col justify-between relative group-hover/card:-translate-y-2 transition-all">
        <div className="absolute bottom-12 right-4">
          <div className="flex flex-col items-center gap-2">
            {postState.is_liked ? (
              <FaHeart
                onClick={async () => await updatePostLike(!postState.is_liked)}
                size="25px"
              />
            ) : (
              <BiHeart
                onClick={async () => await updatePostLike(!postState.is_liked)}
                size="25px"
              />
            )}

            <BiDotsVerticalRounded size="25px" />
          </div>
        </div>
        <div></div>
        <div className="flex flex-row justify-center p-2 text-center">
          <h3>&quot;{postState.title}&quot;</h3>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black p-2 h-fit flex flex-col justify-end rounded-xl ">
          <div className="flex flex-row items-center gap-2">
            <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
            <p className="font-semibold">A Cool Person</p>
          </div>
          <div className="mt-1 ">
            <p className="truncate w-11/12 font-medium">
              {postState.video_description}
            </p>
            <p className="truncate w-11/12 font-medium">{postState.hashtags}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
