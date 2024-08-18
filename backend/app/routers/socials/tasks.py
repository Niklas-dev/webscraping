import logging
import time

from app.db.database import SessionLocal
from celery_setup import celery_app
import time
from langchain_groq import ChatGroq
from langchain.prompts.chat import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import json
import os

from .models import UserPostIdea
from .validators import PostIdea
from ..auth.models import User

chat_model = ChatGroq(
            temperature=0,
            model="gemma-7b-it",
        )
''' 

chat_model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                        model_name="gpt-3.5-turbo")

'''


@celery_app.task()
def test_tasks():
    time.sleep(60)
    return "test"


@celery_app.task()
def create_post_idea_task(niche: str, description: str, extra: str, user_id: str, post_id: int):
    db = SessionLocal()

    create_user_post_idea_model: UserPostIdea = db.query(UserPostIdea).filter(UserPostIdea.id == post_id).first()

    template = \
        (
            "You are a social content creator assistant i am using in my saas. You are creating social media post "
            "ideas with the help of you knowledge for a specific niche. Make sure you ideas has the potential to go "
            "viral and liked by the viewers. It should be interesting and maybe helpful for the viewer depending on "
            "the niche. Make sure the ideas are unique and well thought. Think about rending content a provide "
            "regarding social media post ideas fir instagram, reels, tiktok or youtube shorts. You gonna return a "
            "title that's generally just shows the post idea, a video description to be shown under the post, "
            "hashtags that fit the video, a video description so the user of the app gets an idea of the presented "
            "post idea and a deep video instructions that shows how you can execute the idea and produce this post "
            "idea."
            "The user is gonna give you the niche, description and extra information in this order."
            ""
            "The output JSON object must use this schema: {schema}"


        )
    human_template = "niche: {niche} description: {description} extra: {extra}"
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("human", human_template)
    ])

    formatted_prompt = chat_prompt.format_messages(niche=niche, description=description, extra=extra,
                                                   schema=json.dumps(PostIdea.model_json_schema(), indent=2))
    result = chat_model.invoke(formatted_prompt)
    cleaned_json = result.content.replace('```json', '').replace('```', '').strip()
    json_result = json.loads(cleaned_json)
    logging.warning(json_result)
    post = PostIdea(**json_result["properties"])
    print(post.hashtags)

    create_user_post_idea_model.title = post.title
    create_user_post_idea_model.description = post.description
    create_user_post_idea_model.video_description = post.video_description
    create_user_post_idea_model.hashtags = post.hashtags

    create_user_post_idea_model.is_finished = True

    user: User = db.query(User).filter(User.id == user_id).first()
    remaining_creations = user.remaining_post_creations

    user.remaining_post_creations = remaining_creations - 1
    db.commit()
    return {"detail": "successfully created post idea", "post_title": post.title}
