import json
import os

from fastapi import APIRouter, Request
from langchain_openai import ChatOpenAI
from langchain.prompts.chat import ChatPromptTemplate
from starlette import status
from starlette.responses import StreamingResponse

router = APIRouter(
    prefix='/socials',
    tags=['socials']
)

chat_model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                        model_name="gpt-3.5-turbo")

template = ("You are a social content creator assistant. "
            "You create post ideas for different social media account by given inputs and constraints about the niche of the account. Only create one idea."
            "You get the niche, current trending content and need to create thoughtful ideas that apply to the niche and can go viral."
            "The input format is niche/trending content the input is split with /"
            "Make sure you dont just scrape the surface with the ideas. You should just return in the given format, which is in json."
            "Return this title: title of the content idea, description: precise description of the idea (maybe in steps) - not the actual content of the video but showcase what needs to be shown or done - must be long enough to actually explain it, hashtags: relevant hashtags which could go viral, "
            "video_description: the text that should be written under the posts/reel dont include hashtags here - should be short and hook the viewer - not hashtags at the end of this description!!"
            )
human_template = "{text}"
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", template),
    ("human", human_template)
])


def fetch_gpt():
    msg = chat_prompt.format_messages(text="business creation/decide yourself")
    result = chat_model.predict_messages(msg)
    return json.loads(result.content)


@router.post("/create-new-post-idea")
async def create_new_post_idea(request: Request):
    return fetch_gpt()
