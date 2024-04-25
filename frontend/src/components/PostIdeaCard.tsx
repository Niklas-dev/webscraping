import { IPostIdea } from "@/shared/interfaces";

import React from "react";

export default function PostIdeaCard({ post }: { post: IPostIdea }) {
  return (
    <div
      key={post.id}
      className="h-[35rem] w-[21rem] bg-gray-300 rounded-xl flex flex-col  px-2 pb-2 group/card hover:-translate-y-2 transition-all cursor cursor-pointer"
    >
      <div className="p-1.5 flex flex-row justify-center">
        <div className="h-4 w-4 bg-black rounded-full"></div>
      </div>
      <div className="bg-white h-full w-full rounded-xl p-2 flex flex-col justify-between">
        <div>
          {" "}
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
            <p className="font-semibold">A Cool Person</p>
          </div>
          <div className="mt-1">
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
