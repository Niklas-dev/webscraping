import time

from app.db.database import SessionLocal
from celery_setup import celery_app
import time

from langchain.prompts.chat import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import json
import os

from .models import UserPostIdea
from .validators import PostIdea
from ..auth.models import User



chat_model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                        model_name="gpt-3.5-turbo")

@celery_app.task()
def test_tasks():
    time.sleep(60)
    return "test"


@celery_app.task()
def create_post_idea_task(niche: str, description: str, extra: str, user_id: str, post_id: int):
    print("test")
    db = SessionLocal()
    time.sleep(20)
    print("test2")

    create_user_post_idea_model = db.query(UserPostIdea).filter(UserPostIdea.id == post_id).first()
    print("test3")

    template = \
        (
            "You are a social content creator assistant. Make use of everything that you know about social media "
            "growth, trends, viral videos and more to fulfil this task."
            "You create post ideas for different social media account by given inputs and constraints about the niche "
            "of the account. Only create one idea."
            "You get the niche, current trending content and need to create thoughtful ideas that apply to the niche "
            "and can go viral."
            "The input format is niche/trending content the input is split with /"
            "Make sure you dont just scrape the surface with the ideas. You should just return in the given format, "
            "which is in json."
            "Return this title: title of the content idea, description: precise description of the idea (maybe in "
            "steps) - not the actual content of the video but showcase what needs to be shown or done - must be long "
            "enough to actually explain it, hashtags: relevant hashtags which could go viral,"
            "video_description: the text that should be written under the posts/reel dont include hashtags here - "
            "should be short and hook the viewer and not longer than two lines - not hashtags at the end of this "
            "description!!"
        )
    human_template = "{text}"
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("human", human_template)
    ])
    msg = chat_prompt.format_messages(text="business creation/decide yourself")
    result = chat_model.predict_messages(msg)
    json_result = json.loads(result.content)
    post = PostIdea(**json_result)
    print(post.description)

    create_user_post_idea_model.title = post.title
    create_user_post_idea_model.description = post.description
    create_user_post_idea_model.video_description = post.video_description
    create_user_post_idea_model.is_finished = True
    db.commit()
    return "test"
