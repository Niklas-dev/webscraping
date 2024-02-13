from langchain.prompts.chat import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from starlette import status
import json
import os


from .validators import PostIdea

chat_model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                        model_name="gpt-3.5-turbo")


def create_new_post(niche: str, description: str, extra: str):
    template = \
        (
            "You are a social content creator assistant. Make use of everything that you know about social media growth, trends, viral videos and more to fulfil this task."
            "You create post ideas for different social media account by given inputs and constraints about the niche of the account. Only create one idea."
            "You get the niche, current trending content and need to create thoughtful ideas that apply to the niche and can go viral."
            "The input format is niche/trending content the input is split with /"
            "Make sure you dont just scrape the surface with the ideas. You should just return in the given format, which is in json."
            "Return this title: title of the content idea, description: precise description of the idea (maybe in steps) - not the actual content of the video but showcase what needs to be shown or done - must be long enough to actually explain it, hashtags: relevant hashtags which could go viral, "
            "video_description: the text that should be written under the posts/reel dont include hashtags here - should be short and hook the viewer and not longer than two lines - not hashtags at the end of this description!!"
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
    return post
