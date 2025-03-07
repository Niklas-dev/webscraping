import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, PlayCircle } from "lucide-react";
import type { IPostIdea } from "@/shared/interfaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VideoCreationGuideProps {
  post: IPostIdea | null;
}

export default function VideoCreationGuide({ post }: VideoCreationGuideProps) {
  return (
    <Card className="border-none shadow-none bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Video className="w-4 h-4" />
          Video Creation Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="instructions" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="script">Script</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="instructions" className="mt-0">
            <div className="space-y-4">
              {JSON.parse(post?.video_creation_instructions!).map(
                (instruction: string, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-lg bg-muted/50"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-base">
                      {index + 1}
                    </span>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {instruction}
                    </p>
                  </div>
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="script" className="mt-0">
            <div className="space-y-3">
              {JSON.parse(post?.suggested_script!).map(
                (line: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                  >
                    <PlayCircle className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <p className="text-base text-muted-foreground">{line}</p>
                  </div>
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-0">
            <div className="space-y-3">
              {JSON.parse(post?.relevant_data!).map(
                (data: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <p className="text-base text-muted-foreground">{data}</p>
                  </div>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
