import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ThumbsUp, ArrowLeft } from "lucide-react";
import type { IPostIdea } from "@/shared/interfaces";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PostHeaderProps {
  post: IPostIdea | null;
}

export default function PostHeader({ post }: PostHeaderProps) {
  const statusVariants = {
    unadded: "bg-muted text-muted-foreground",
    used: "bg-emerald-500/10 text-emerald-500",
    planned: "bg-blue-500/10 text-blue-500",
    dropoff: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 -ml-2 text-base"
        asChild
      >
        <Link href="/dashboard/ideas">
          <ArrowLeft className="w-4 h-4 -mt-0.5" />
          Back to Ideas
        </Link>
      </Button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{post?.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant={post?.is_finished ? "default" : "secondary"}>
              {post?.is_finished ? (
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5 mr-1.5" />
              )}
              {post?.is_finished ? "Completed" : "In Progress"}
            </Badge>
            <Badge variant={post?.is_liked ? "default" : "secondary"}>
              <ThumbsUp className="w-3.5 h-3.5 mr-1.5" />
              {post?.is_liked ? "Liked" : "Not Liked"}
            </Badge>
            <Badge
              className={`${
                statusVariants[post?.status as keyof typeof statusVariants]
              }`}
            >
              {post?.status?.charAt(0).toUpperCase()! + post?.status?.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
