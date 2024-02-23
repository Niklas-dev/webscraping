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


def create_new_post(niche: str, description: str, extra: str, user_id: str, db: db_dependency):
    create_user_post_idea_model = UserPostIdea(
        user_id=user_id
    )

    db.add(create_user_post_idea_model)
    db.commit()

    result = create_post_idea_task.delay(niche, description, extra, user_id, create_user_post_idea_model.id)

    return result
