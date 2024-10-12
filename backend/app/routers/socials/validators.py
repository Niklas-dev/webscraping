from pydantic import BaseModel, Field
from typing import List


class PostIdea(BaseModel):
    title: str = Field(..., description="A brief title showcasing the post idea")
    description: str = Field(..., description="A description to be shown under the post")
    hashtags: List[str] = Field(..., description="Relevant hashtags for the video")
    video_creation_instructions: List[str] = Field(..., description="List of detailed instructions on how to execute "
                                                                    "the idea and produce the post")


class CreatePostIdeaRequest(BaseModel):
    niche: str
    description: str
    extra: str


class ChangeLikePostIdeaRequest(BaseModel):
    id: int
    is_liked: bool

class ChangeStatusPostIdeaRequest(BaseModel):
    id: int
    status: str
