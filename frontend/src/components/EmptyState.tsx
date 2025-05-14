"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="text-center py-16 border rounded-md bg-gray-50">
      <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium mb-1">No scheduled posts</h3>
      <p className="text-gray-500 mb-4">
        You haven&apos;t scheduled any posts yet
      </p>
      <Button onClick={onCreate}>Create your first post</Button>
    </div>
  );
}
