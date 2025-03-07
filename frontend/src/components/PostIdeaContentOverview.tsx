import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Hash } from "lucide-react";
import type { IPostIdea } from "@/shared/interfaces";

interface ContentOverviewProps {
  post: IPostIdea | null;
}
const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const past = new Date(date); // Ensure it's a Date object
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000); // Use getTime() for number conversion

  if (isNaN(diffInSeconds)) return "Invalid date";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let { label, seconds } of intervals) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};
export default function ContentOverview({ post }: ContentOverviewProps) {
  return (
    <Card className="border-none shadow-none bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Video className="w-4 h-4" />
          Content Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-2">Description</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {post?.description}
          </p>
        </div>

        <div>
          <h3 className="text-base font-medium mb-2">Hashtags</h3>
          <div className="flex flex-wrap gap-1.5 text-base">
            {JSON.parse(post?.hashtags!).map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/5 text-primary hover:bg-primary/10 text-base"
              >
                <Hash className="w-3 h-3 mr-1 " />
                {tag.slice(1)}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Created</span>
            <span className="font-medium">
              {formatTimeAgo(post?.created_at!)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
