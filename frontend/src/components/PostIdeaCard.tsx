import { IPostIdea } from "@/shared/interfaces";

import React from "react";
import {
  BiComment,
  BiDotsHorizontal,
  BiDotsVerticalRounded,
  BiHeart,
  BiMenu,
} from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

export default function PostIdeaCard({ post }: { post: IPostIdea }) {
  return (
    <div
      key={post.id}
      className="h-[35rem] w-[21rem] bg-gray-300 rounded-xl flex flex-col  px-2 pb-2 group/card hover:-translate-y-2 transition-all cursor cursor-pointer text-white "
    >
      <div className="p-1.5 group-hover/card:-translate-y-1 transition-all flex flex-row justify-center">
        <div className="h-4 w-4 bg-black rounded-full z-20"></div>
      </div>
      <div className="bg-gradient-to-tr from-[#170E13] to-[#7A7ADB] h-full w-full rounded-xl  flex flex-col justify-between relative group-hover/card:-translate-y-2 transition-all">
        <div className="absolute bottom-12 right-4">
          <div className="flex flex-col items-center gap-2">
            <BiHeart size="25px" />
            <BiDotsVerticalRounded size="25px" />
          </div>
        </div>
        <div></div>
        <div className="flex flex-row justify-center p-2 ">
          <h3>&quot;{post.title}&quot;</h3>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black p-2 h-fit flex flex-col justify-end rounded-xl ">
          <div className="flex flex-row items-center gap-2">
            <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
            <p className="font-semibold">A Cool Person</p>
          </div>
          <div className="mt-1 ">
            <p className="truncate w-11/12 font-medium">
              {post.video_description}
            </p>
            <p className="truncate w-11/12 font-medium">{post.hashtags}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
