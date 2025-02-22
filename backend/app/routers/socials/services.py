import logging
import time

from langchain.prompts.chat import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from starlette import status
import json
import os

from .models import UserPostIdea
from .tasks import create_post_idea_task
from .validators import PostIdea
from ...db.database import db_dependency

chat_model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                        model_name="gpt-3.5-turbo")


def create_new_post(
    niche: str,
    post_goal: str,
    target_audience: str,
    content_format: str,
    extra: str,
    tone: str,
    user_id: str,
    db: db_dependency
):
    logging.info(f"Creating a new post idea for user {user_id}.")

    # Create new post idea entry in the database
    create_user_post_idea_model = UserPostIdea(
        user_id=user_id
    )
    db.add(create_user_post_idea_model)
    db.commit()  # Commit after task initiation
    # Trigger async task for generating the post idea
    print(create_user_post_idea_model.id)
    result = create_post_idea_task.delay(
        niche, post_goal, target_audience, content_format, extra, tone, user_id, create_user_post_idea_model.id
    )


    logging.info(f"Post idea task {result.id} started for user {user_id}.")

    return result
