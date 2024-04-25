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
      <div className="bg-white h-full w-full rounded-xl p-2">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
    </div>
  );
}
