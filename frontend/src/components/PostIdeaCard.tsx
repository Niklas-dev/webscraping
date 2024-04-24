import { IPostIdea } from "@/shared/interfaces";

import React from "react";

export default function PostIdeaCard({ post }: { post: IPostIdea }) {
  return (
    <div
      key={post.id}
      className="h-96 w-[30rem] bg-gray-300 rounded-xl flex flex-col justify-center items-center"
    >
      {post.title}
    </div>
  );
}
