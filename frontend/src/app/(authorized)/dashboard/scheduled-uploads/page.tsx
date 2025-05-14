"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EmptyState from "@/components/EmptyState";

import ScheduledPostCard from "@/components/ScheduledPostCard";
import UploadForm from "@/components/UploadForm";
import { useScheduledPosts } from "@/components/hooks/useScheduledPosts";

export default function ScheduledPostsPage() {
  const [view, setView] = useState<"list" | "upload">("list");
  const { scheduledPosts, handleDelete } = useScheduledPosts();

  return (
    <div className="px-8 py-6">
      {view === "upload" ? (
        <UploadForm setView={setView} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Scheduled Posts</h2>
            <Button
              onClick={() => setView("upload")}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Create Post
            </Button>
          </div>
          <div className="h-[2px] w-full bg-gray-100 mb-6"></div>
          {scheduledPosts.length === 0 ? (
            <EmptyState onCreate={() => setView("upload")} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledPosts.map((post) => (
                <ScheduledPostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
