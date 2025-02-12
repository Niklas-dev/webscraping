from app.db.database import SessionLocal
from celery_setup import celery_app
import time
from langchain.prompts.chat import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import os
import json
import logging
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
def create_post_idea_task(niche: str,
                          post_goal: str,
                          target_audience: str,
                          content_format: str,
                          extra: str,
                          tone: str,
                          user_id: str,
                          post_id: int):
    db = SessionLocal()
    create_user_post_idea_model: UserPostIdea = db.query(UserPostIdea).filter(UserPostIdea.id == post_id).first()

    if not create_user_post_idea_model:
        raise ValueError(f"Post idea with ID {post_id} not found.")

    # Get all previously created titles for this user
    posts = db.query(UserPostIdea.title).filter(UserPostIdea.user_id == user_id,
                                                UserPostIdea.is_finished == True).all()

    titles_string = ", ".join(post.title for post in posts)
    logging.warning(f"Existing Titles: {titles_string}")

    template = (
        "You are a highly advanced social media content assistant for my SaaS, specializing in viral and engaging "
        "post ideas. Your goal is to generate well-structured, compelling, and high-performance post ideas tailored to the user's "
        "needs."

        "### **Guidelines:**"
        "1. **Title**: Create a compelling title that is engaging and curiosity-inducing. The title should grab attention and make the audience want to learn more."

        "2. **Description**: Write a persuasive description that:"
        "   - Starts with an attention-grabbing hook to draw in the audience."
        "   - Clearly explains the post’s purpose so the audience understands the message."
        "   - Encourages engagement with a call-to-action, such as 'What do you think? Comment below!'"

        "3. **Hashtags**: Generate a mix of viral, niche-relevant, and broad-reaching hashtags that will increase the post’s discoverability and engagement."

        "4. **Video Creation Instructions**: Provide clear, actionable steps for creating the video:"
        "   - Each step should be **at least 5 sentences long**, providing clear instructions."
        "   - Include suggested **phrases the user can say** in the video."
        "   - Provide relevant **data, statistics, or references** to back up the content."
        "   - Suggest **visuals, transitions, or editing styles** (if applicable) to enhance the video’s appeal."

        "5. **SEO & Performance Optimization**:"
        "   - Recommend relevant **high-ranking keywords** that will help the post perform well in search results."
        "   - Suggest the **best posting times** based on trends in audience engagement for the platform."

        "6. **Engagement Strategy**: Align the content with the user’s engagement goal:"
        "- If the goal is **virality** → Use hooks, controversial topics, or challenges that encourage widespread "
        "sharing."
        "- If the goal is **brand awareness** → Use storytelling and value-driven content to educate and connect with "
        "the audience."
        "- If the goal is **lead generation** → Include **CTAs** that prompt users to take action, "
        "such as subscribing or purchasing."

        "7. **Platform Adaptation**: Tailor the content format based on the user’s selected platform:"
        "   - **Short-form** (TikTok, Reels, YouTube Shorts) → Fast-paced and designed for quick, engaging content."
        "   - **Long-form** (YouTube, LinkedIn) → More detailed, value-focused, and informative content."

        "8. **Editing Suggestions**: Provide advice on editing the content:"
        "   - Suggested **visuals** such as color schemes, props, or locations to enhance the aesthetic."
        "   - Transition ideas, such as **smooth cuts, fades**, or other dynamic effects."
        "- Editing styles, like using **fast cuts** for short-form videos or **slow transitions** for longer content."

        "9. **Suggested Script**: A list of suggested phrases or lines the user can say in the video. This should be "
        "in line with the post’s theme, tone, and objective."

        "10. **Relevant Data**: Provide any **statistics, facts, or references** that can be used in the content to "
        "validate the message or make the post more credible."

        "### **User Inputs:**"
        "Niche: {niche} "
        "Extra Info: {extra} "
        "Target Audience: {target_audience} "
        "Preferred Tone: {preferred_tone} "
        "Content Format: {content_format} "
        "Engagement Goal: {engagement_goal} "
        "Already Created Ideas (Make sure to not create to similar ideas): {titles_string}"
        
        "Ensure the response strictly follows this JSON schema: {schema}"
    )

    human_template = (
        "Niche: {niche} "
        "Extra Information: {extra} "
        "Target Audience: {target_audience} "
        "Preferred Tone: {preferred_tone} "
        "Content Format: {content_format} "
        "Engagement Goal: {engagement_goal} "
        "Already Created Ideas: {titles_string}"
    )

    # Format the message for the LLM
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("human", human_template)
    ])

    formatted_prompt = chat_prompt.format_messages(
        niche=niche,
        extra=extra,
        target_audience=target_audience,
        preferred_tone=tone,
        content_format=content_format,
        engagement_goal=post_goal,
        titles_string=titles_string,
        schema=json.dumps(PostIdea.model_json_schema(), indent=2)
    )

    # Invoke the LLM and capture the response
    result = chat_model.invoke(formatted_prompt)
    json_result = json.loads(result.content)

    # Ensure the LLM returned all the necessary fields
    required_fields = ["title", "description", "hashtags", "video_creation_instructions"]
    if not all(field in json_result for field in required_fields):
        raise ValueError("LLM response is missing required fields.")

    # Helper function to convert strings with new formats into lists
    def convert_string_to_list(value):
        """Convert strings of hashtags or posting times into lists."""
        if isinstance(value, str):
            # If the string is in curly braces, like hashtags or times, handle it:
            if value.startswith("{") and value.endswith("}"):
                value = value[1:-1]  # Remove the curly braces
                # Split by commas, then strip quotes if the values have them
                return [item.strip().strip('"') for item in value.split(",")]
            try:
                return json.loads(value)  # Try to parse the JSON string into a list
            except json.JSONDecodeError:
                return []  # Return empty list if parsing fails
        return value  # Return the value as is if already a list

    # Map the LLM results to the UserPostIdea fields
    create_user_post_idea_model.title = json_result["title"]
    create_user_post_idea_model.description = json_result["description"]
    create_user_post_idea_model.hashtags = convert_string_to_list(json_result["hashtags"])
    create_user_post_idea_model.video_creation_instructions = convert_string_to_list(json_result["video_creation_instructions"])
    create_user_post_idea_model.is_finished = True

    # Convert JSON strings into lists before storing
    if "seo_keywords" in json_result:
        create_user_post_idea_model.seo_keywords = convert_string_to_list(json_result["seo_keywords"])
    if "best_posting_times" in json_result:
        create_user_post_idea_model.best_posting_times = convert_string_to_list(json_result["best_posting_times"])
    if "engagement_strategy" in json_result:
        create_user_post_idea_model.engagement_strategy = json_result["engagement_strategy"]
    if "engagement_suggestions" in json_result:
        create_user_post_idea_model.engagement_suggestions = convert_string_to_list(
            json_result["engagement_suggestions"])
    if "platform_adaptation" in json_result:
        create_user_post_idea_model.platform_adaptation = json_result["platform_adaptation"]
    if "editing_suggestions" in json_result:
        create_user_post_idea_model.editing_suggestions = convert_string_to_list(json_result["editing_suggestions"])
    if "suggested_script" in json_result:
        create_user_post_idea_model.suggested_script = convert_string_to_list(json_result["suggested_script"])
    if "relevant_data" in json_result:
        create_user_post_idea_model.relevant_data = convert_string_to_list(json_result["relevant_data"])

    # Deduct credits from the user (if needed)
    user: User = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError(f"User with ID {user_id} not found.")

    remaining_creations = user.remaining_post_creations
    remaining_creations_onetime = user.remaining_post_creations_onetime_paid

    if remaining_creations <= 0:
        user.remaining_post_creations_onetime_paid = remaining_creations_onetime - 1
    elif remaining_creations_onetime >= 0:
        user.remaining_post_creations = remaining_creations - 1
    else:
        raise ValueError("No credits remaining.")

    # Commit the changes to the database
    db.commit()
    logging.info(f"Post idea successfully created for user {user_id}. Title: {json_result['title']}")

    return {"detail": "Successfully created post idea", "post_title": json_result["title"]}
