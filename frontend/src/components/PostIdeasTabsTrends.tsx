import { Badge } from "@/components/ui/badge";
import { PostIdeaCardTrends } from "./PostIdeaCardTrends";

interface SocialMediaIdea {
  title: string;
  source: string;
  post_angle: string;
  hashtags: string[];
  engagement_potential: string;
  original_url: string;
  timestamp: string;
  thumbnail?: string;
  has_visual?: boolean;
  post_type?: string;
  // YouTube specific
  video_url?: string;
  channel?: string;
  views?: number;
  // Reddit specific
  subreddit?: string;
  reddit_score?: number;
  comments?: number;
  // News specific
  news_source?: string;
  published_date?: string;
}

interface PostIdeasTabProps {
  socialMediaIdeas: SocialMediaIdea[];
}

export function PostIdeasTab({ socialMediaIdeas }: PostIdeasTabProps) {
  const ideasWithThumbnails = socialMediaIdeas.filter(
    (idea) => idea.has_visual || idea.thumbnail
  );
  const videoIdeas = socialMediaIdeas.filter(
    (idea) => idea.post_type === "video" || idea.source === "youtube"
  );
  const textIdeas = socialMediaIdeas.filter(
    (idea) => idea.post_type === "text" || !idea.post_type
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Post Ideas</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">{socialMediaIdeas.length} total</Badge>
          {ideasWithThumbnails.length > 0 && (
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-700"
            >
              {ideasWithThumbnails.length} with visuals
            </Badge>
          )}
          {videoIdeas.length > 0 && (
            <Badge
              variant="outline"
              className="border-red-200 bg-red-50 text-red-700"
            >
              {videoIdeas.length} videos
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {socialMediaIdeas.map((idea, index) => (
          <PostIdeaCardTrends key={index} idea={idea} />
        ))}
      </div>
    </div>
  );
}
