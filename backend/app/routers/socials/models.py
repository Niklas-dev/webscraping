from sqlalchemy.orm import relationship

from ...db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.sql import func

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class UserPostIdea(Base):
    __tablename__ = "user_post_ideas"

    # Unique identifier for the post idea
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    # Post status and additional flags
    is_finished = Column(Boolean, default=False)  # Whether the post idea generation is finished
    is_liked = Column(Boolean, default=False)  # Whether the post has been liked (if applicable)
    is_deleted = Column(Boolean, default=False)  # Whether the post has been deleted

    # Post content fields
    title = Column(String, nullable=True)  # The title of the post idea
    description = Column(String, nullable=True)  # Description for the post
    hashtags = Column(String, nullable=True)  # Hashtags associated with the post idea
    video_creation_instructions = Column(String, nullable=True)  # Detailed instructions for creating the video

    # Additional fields from the output class
    seo_keywords = Column(String, nullable=True)  # High-ranking keywords for SEO optimization
    best_posting_times = Column(String, nullable=True)  # Recommended posting times based on engagement trends
    engagement_strategy = Column(String, nullable=True)  # Engagement strategy aligned with the user’s goal
    engagement_suggestions = Column(String, nullable=True)  # Suggestions for boosting engagement (e.g., CTAs, polls)
    platform_adaptation = Column(String,
                                 nullable=True)  # Tailoring the content based on the platform (short-form, long-form)
    editing_suggestions = Column(String, nullable=True)  # Suggestions for visuals, transitions, and editing styles
    suggested_script = Column(String, nullable=True)  # Suggested phrases/lines the user can say in the video
    relevant_data = Column(String, nullable=True)  # Relevant statistics, facts, or references for the content

    # Metadata fields
    created_at = Column(DateTime(timezone=True), default=func.now())  # Timestamp for when the post idea was created
    status = Column(String, nullable=True,
                    default="unadded")  # Current status of the post idea (e.g., "unadded", "in-progress")

    # Relationship with the User model (assuming users table exists)
    user_id = Column(Integer, ForeignKey("users.id"))  # Foreign key linking to the user who created the post idea
    user = relationship("User", back_populates="user_post_ideas")  # Relationship to the User model
