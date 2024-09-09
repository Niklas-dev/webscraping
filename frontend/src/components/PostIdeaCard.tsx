"use client";

import { IPostIdea } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  BiComment,
  BiDotsHorizontal,
  BiDotsVerticalRounded,
  BiHeart,
  BiMenu,
  BiTrash,
} from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

export default function PostIdeaCard({
  post,
  clickCallback,
}: {
  post: IPostIdea;
  clickCallback: (value: boolean) => void;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const deleteIdea = async (postId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      toast.error("Failed to delete post idea.", {
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
    const info = data["detail"];
    toast.success(info, {
      icon: "🤔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    router.refresh();
  };

  const formatHashtags = (hashtags: string): string[] => {
    // Check if hashtags are not null or empty
    if (hashtags) {
      // Remove curly braces and split the string into a list of hashtags
      const hashtagsStr = hashtags.replace(/^\{|\}$/g, ""); // Remove curly braces using regex
      return hashtagsStr.split(",").map((hashtag) => hashtag.trim()); // Split by comma and trim extra spaces
    }
    return [];
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/dashboard/ideas/${post.id}`);
      }}
      key={post.id}
      className="h-[35rem] w-[19rem] bg-gray-300 rounded-xl flex flex-col  px-2 pb-2 group/card hover:-translate-y-2 transition-all cursor cursor-pointer text-white "
    >
      <div className="p-1.5 group-hover/card:-translate-y-1 transition-all flex flex-row justify-center">
        <div className="h-4 w-4 bg-gray-900 rounded-full z-20"></div>
      </div>
      <div className="bg-gradient-to-tr from-[#170E13] to-[#7A7ADB] h-full w-full rounded-xl  flex flex-col justify-between relative group-hover/card:-translate-y-2 transition-all">
        {isModalOpen ? (
          <div className="bg-black rounded-xl bg-opacity-40 w-full h-full absolute flex justify-center items-center px-4">
            <div className="bg-gray-100 w-full h-28 rounded-lg p-2 flex flex-col justify-between">
              <h4 className="text-black font-semibold">
                Do you really want to delete this idea?
              </h4>
              <div className="flex flex-row justify-end gap-4 text-black font-bold">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                  className="border border-black rounded-md px-6 py-0.5"
                >
                  No
                </button>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteIdea(postState.id);
                  }}
                  className="bg-black text-white rounded-md px-6 py-0.5"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="absolute bottom-12 right-4">
          <div className="flex flex-col items-center gap-2 z-10 ">
            {postState.is_liked ? (
              <button>
                <FaHeart
                  onClick={async (e) => {
                    e.stopPropagation();
                    await updatePostLike(!postState.is_liked);
                  }}
                  size="25px"
                />
              </button>
            ) : (
              <button>
                <BiHeart
                  onClick={async (e) => {
                    e.stopPropagation();
                    await updatePostLike(!postState.is_liked);
                  }}
                  size="25px"
                />
              </button>
            )}

            <BiTrash
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              size="25px"
            />
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
              {postState.description}
            </p>
            <div className="truncate font-medium flex flex-row ">
              {formatHashtags(postState.hashtags!).map((tag) => (
                <p className="" key={tag}>
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
