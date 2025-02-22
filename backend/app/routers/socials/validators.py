from pydantic import BaseModel, Field
from typing import List

from pydantic import BaseModel, Field
from typing import List


from pydantic import BaseModel, Field
from typing import List

class PostIdea(BaseModel):
    title: str = Field(..., description="A compelling and curiosity-inducing title for the post")
    description: str = Field(..., description="A persuasive description with a hook, purpose, and engagement prompt")
    hashtags: List[str] = Field(..., description="A mix of viral, niche-relevant, and broad-reaching hashtags")
    video_creation_instructions: List[str] = Field(..., description="Step-by-step, detailed instructions for video creation")

    seo_keywords: List[str] = Field(..., description="High-ranking keywords for SEO optimization")
    best_posting_times: List[str] = Field(..., description="Recommended posting times based on engagement trends")

    engagement_strategy: str = Field(..., description="A strategy aligned with the user’s goal (e.g., virality, brand awareness, lead generation)")
    engagement_suggestions: List[str] = Field(..., description="Suggestions for boosting engagement, such as CTAs, polls, or interactive elements")

    platform_adaptation: str = Field(..., description="How the content should be tailored to the selected platform (e.g., short-form, long-form)")
    editing_suggestions: List[str] = Field(..., description="Suggestions for visuals, transitions, and editing styles")

    suggested_script: List[str] = Field(..., description="Suggested phrases or lines the user can say in the video")
    relevant_data: List[str] = Field(..., description="Relevant statistics, facts, or references to include in the content")



class CreatePostIdeaRequest(BaseModel):
    niche: str
    post_goal: str
    target_audience: str
    content_format: str
    extra: str
    tone: str


class ChangeLikePostIdeaRequest(BaseModel):
    id: int
    is_liked: bool

class ChangeStatusPostIdeaRequest(BaseModel):
    id: int
    status: str
