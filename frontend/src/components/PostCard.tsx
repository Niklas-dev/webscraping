// components/TaskCard.tsx
import React from "react";
import { useDrag } from "react-dnd";
interface Post {
  id: number;
  title: string;
  assignee: string;
  date: string;
  status: "Unadded" | "To-do" | "Doing" | "Done";
}
interface PostCardProps {
  post: Post;
  movePost: (
    id: number,
    status: "Unadded" | "To-do" | "Doing" | "Done"
  ) => void;
}

export default function PostCard({ post, movePost }: PostCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "POST",
    item: { id: post.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-4 mb-2 rounded-lg shadow cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{post.title}</h3>
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
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <span className="mr-2">{post.assignee}</span>
        <span>{post.date}</span>
      </div>
    </div>
  );
}
