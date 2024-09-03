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

chat_model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                        model_name="gpt-4o-mini")
''' 

chat_model = ChatGroq(
            temperature=0,
            model="llama3-8b-8192",
        )

'''


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
            "You are a social content creator assistant i am using in my saas. You are creating social media post "
            "ideas with the help of you knowledge for a specific niche. Make sure you ideas has the potential to go "
            "viral and liked by the viewers. It should be interesting and maybe helpful for the viewer depending on "
            "the niche. Make sure the ideas are unique and well thought. Think about rending content a provide "
            "regarding social media post ideas fir instagram, reels, tiktok or youtube shorts. The idea must be "
            "interesting and fit into a 15 sec to 1 minute short form video. You gonna return a"
            "title that's generally just shows the post idea, a video description to be shown under the post, "
            "hashtags that fit the video, a video description so the user of the app gets an idea of the presented "
            "post idea and a deep video instructions that shows how you can execute the idea and produce this post "
            "idea. Make sure the instruction contains information that can be used and maybe step by step steps to "
            "create the video it should be longer and in depth. The information the user needs for the post must "
            "been in this like eg. data the user needs to showcase in the video or which imagery to choose or which "
            "text to display. Also make sure the ideas are unique but also appeal "
            "to a large audience"
            "The user is gonna give you the niche, description, extra information and already created ideas so you "
            "avoid duplicates in this order."
            ""
            "The output JSON object must use this schema, make sure it is a valid json string so I can load the string "
            "into an object, it must be plain text and no json``` at the start to avoid issues reading the "
            "content: {schema} "

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

    user.remaining_post_creations = remaining_creations - 1
    db.commit()
    return {"detail": "successfully created post idea", "post_title": post.title}
