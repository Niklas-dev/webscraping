// components/TaskCard.tsx
import { IPostIdea } from "@/shared/interfaces";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useDrag } from "react-dnd";

interface PostCardProps {
  post: IPostIdea;
  movePost: (
    id: number,
    status: "unadded" | "used" | "planned" | "dropoff"
  ) => void;
}

export default function PostCard({ post, movePost }: PostCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [{ isDragging }, drag] = useDrag({
    type: "POST",
    item: { id: post.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Connect the drag function to the ref
  drag(ref);

  return (
    <div
      ref={ref}
      className={`bg-white p-4 mb-2 rounded-lg shadow cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{post.title}</h3>
        <button className="text-gray-500 hover:text-gray-700 hidden">
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
        <span>{post.description}</span>
      </div>
      {post.status !== "unadded" && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => router.push(`/dashboard/ideas/${post.id}`)}
            className="py-0.5 px-2 rounded-lg border border-gray-400 text-gray-800 mt-2 text-sm hover:bg-gray-100 transition-colors"
          >
            Open
          </button>
          <button
            onClick={() => movePost(post.id, "unadded")}
            className="py-0.5 px-2 rounded-lg border border-gray-400 text-gray-800 mt-2 text-sm hover:bg-gray-100 transition-colors"
          >
            Unplan
          </button>
        </div>
      )}
    </div>
  );
}
