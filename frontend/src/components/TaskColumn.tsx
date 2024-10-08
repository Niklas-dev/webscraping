import React from "react";
import { useDrop } from "react-dnd";

import PostCard from "./PostCard";
interface Post {
  id: number;
  title: string;
  assignee: string;
  date: string;
  status: "Unadded" | "To-do" | "Doing" | "Done";
}
interface ColumnProps {
  title: string;
  posts: Post[];
  movePost: (
    id: number,
    status: "Unadded" | "To-do" | "Doing" | "Done"
  ) => void;
}

export default function Column({ title, posts, movePost }: ColumnProps) {
  const [, drop] = useDrop({
    accept: "POST",
    drop: (item: { id: number }) =>
      movePost(item.id, title as "Unadded" | "To-do" | "Doing" | "Done"),
  });

  return (
    <div ref={drop} className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          {title} <span className="text-gray-400 ml-1">{posts.length}</span>
        </h2>
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} movePost={movePost} />
      ))}
      <button className="w-full text-left text-gray-500 hover:text-gray-700 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        New
      </button>
    </div>
  );
}
