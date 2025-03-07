import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, TrendingUp, Clock, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { IPostIdea } from "@/shared/interfaces";

interface ContentStrategyProps {
  post: IPostIdea | null;
}

export default function ContentStrategy({ post }: ContentStrategyProps) {
  return (
    <Card className="border-none shadow-none bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Settings className="w-4 h-4" />
          Content Strategy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="seo" className="border-none">
            <AccordionTrigger className="py-3 px-4 rounded-lg hover:bg-muted/50 [&[data-state=open]]:bg-muted/50 text-base">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                SEO & Keywords
              </span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0 text-muted-foreground" />
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-1">
              <div className="flex flex-wrap gap-1.5 text-base">
                {JSON.parse(post?.seo_keywords!).map(
                  (keyword: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-card text-base"
                    >
                      {keyword}
                    </Badge>
                  )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="timing" className="border-none">
            <AccordionTrigger className="py-3 px-4 rounded-lg hover:bg-muted/50 [&[data-state=open]]:bg-muted/50">
              <span className="flex items-center gap-2 text-base">
                <Clock className="w-4 h-4" />
                Best Timing
              </span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0 text-muted-foreground" />
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-1 text-base">
              <p className="text-base text-muted-foreground text-base">
                Post between 6 PM - 9 PM EST for maximum engagement
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Add more accordion items as needed */}
        </Accordion>
      </CardContent>
    </Card>
  );
}
