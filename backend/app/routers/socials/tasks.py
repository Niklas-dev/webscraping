import logging
import time
from typing import List

from pydantic import Field, BaseModel

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

chat_model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                        model_name="gpt-4o-mini")


@celery_app.task()
def test_tasks():
    time.sleep(60)
    return "test"


@celery_app.task()
def create_post_idea_task(niche: str, description: str, extra: str, user_id: str, post_id: int):
    db = SessionLocal()

    create_user_post_idea_model: UserPostIdea = db.query(UserPostIdea).filter(UserPostIdea.id == post_id).first()

    posts = db.query(UserPostIdea.title).filter(UserPostIdea.user_id == user_id,
                                                UserPostIdea.is_finished == True).all()

    titles_string = ", ".join(post.title for post in posts)

    logging.warning(titles_string)

    template = \
        (
            "You are a social media content assistant for my SaaS. You are required to only answer in the allowed "
            "scheme to avoid errors in my application."
            "You will create social media post ideas for the clients. You will provide a title (The title of the post "
            "just for the client to know what the post is about),"
            "description (This will the user put below their post as their video description), hashtags (The hashtags "
            "will help the post to go viral or reach a lot of viewers,"
            "they must be good and fit the post. they should be lower case and fit into the niche but also adapt for "
            "a larger viewer audience. Dont forget the # at the start of the actual hashtag), "
            "and video_creation_instructions (The instructions should help the"
            "user to create the video for this. You will return the"
            "instructions in multiple steps, each starting with the number like 1. ..., 2. ..., and so on. You must "
            "provide the information the user should talk about in the post,"
            "like data, news, or general information. Make sure the steps are in-depth and contain everything that is "
            "needed in at least 5 sentences for each step. They must really help the user to create the post so also "
            "lines the user could say should be in there). The post ideas"
            "need to be unique, informational, and interesting to the viewers, so that the client will like the "
            "created idea. The ideas need to fit a niche but also appeal to a larger audience."
            "I am going to provide you with the niche, description, extra information, and already created post ideas "
            "of the user, and you will create the post idea based on that."
            "I will also give you the scheme, which you will use to return the previously named fields as JSON. This "
            "is the schema: {schema} . When returning, avoid ```json and ``` so I can load the JSON in my code."
        )
    human_template = "niche: {niche} description: {description} extra: {extra} already created ideas: {titles_string}"
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("human", human_template)
    ])

    formatted_prompt = chat_prompt.format_messages(niche=niche, description=description, extra=extra,
                                                   titles_string=titles_string,
                                                   schema=json.dumps(PostIdea.model_json_schema(),
                                                                     indent=2
                                                                     ))
    result = chat_model.invoke(formatted_prompt)
    logging.warning(result.content)
    json_result = json.loads(result.content)
    logging.warning(json_result)
    post = PostIdea(**json_result)
    print(post.hashtags)

    create_user_post_idea_model.title = post.title
    create_user_post_idea_model.description = post.description
    create_user_post_idea_model.video_creation_instructions = post.video_creation_instructions
    create_user_post_idea_model.hashtags = post.hashtags

    create_user_post_idea_model.is_finished = True



    user: User = db.query(User).filter(User.id == user_id).first()
    remaining_creations = user.remaining_post_creations
    remaining_creations_onetime = user.remaining_post_creations_onetime_paid
    if remaining_creations <= 0:
        user.remaining_post_creations_onetime_paid = remaining_creations_onetime - 1
    elif remaining_creations_onetime >= 0:
        user.remaining_post_creations = remaining_creations - 1
    else:
        raise ValueError("No credits remaining.")
    db.commit()
    return {"detail": "successfully created post idea", "post_title": post.title}
