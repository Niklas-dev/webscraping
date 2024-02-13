from pydantic import BaseModel
from typing import List


class PostIdea(BaseModel):
    title: str
    description: str
    hashtags: List[str]
    video_description: str
