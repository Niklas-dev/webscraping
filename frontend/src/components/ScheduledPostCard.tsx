"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import { ScheduledPost } from "@/shared/interfaces";

export default function ScheduledPostCard({
  post,
  onDelete,
}: {
  post: ScheduledPost;
  onDelete: (id: string) => void;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="border rounded-md overflow-hidden flex flex-col">
      <div className="aspect-video bg-gray-100 relative">
        <img
          src={post.thumbnail || "/placeholder.svg"}
          className="w-full h-full object-cover"
        />
        {/* platform badges */}
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-medium text-base mb-1">{post.title}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {post.description}
        </p>
        <div className="text-xs text-gray-500 flex items-center">
          <Clock size={12} className="mr-1" />
          {formatDate(post.publishDate)}
        </div>
      </div>
      <div className="border-t p-3 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal size={16} />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
