import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SocialMediaIdea {
  engagement_potential: string;
}

interface TrendsData {
  reddit?: any[];
  news?: any[];
  youtube?: any[];
}

interface AnalyticsTabProps {
  socialMediaIdeas: SocialMediaIdea[];
  allTrends: TrendsData;
}

export function AnalyticsTab({
  socialMediaIdeas,
  allTrends,
}: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Reddit</span>
              <span className="text-sm font-medium">
                {allTrends.reddit?.length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">YouTube</span>
              <span className="text-sm font-medium">
                {allTrends.youtube?.length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">News</span>
              <span className="text-sm font-medium">
                {allTrends.news?.length || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Engagement Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Very High", "High", "Medium", "Low"].map((level) => {
              const count = socialMediaIdeas.filter(
                (idea) => idea.engagement_potential === level
              ).length;
              return (
                <div key={level} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{level}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
