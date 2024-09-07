from sqlalchemy.orm import relationship

from ...db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.sql import func


class UserPostIdea(Base):
    __tablename__ = "user_post_ideas"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    is_finished = Column(Boolean, default=False)
    is_liked = Column(Boolean, default=False)
    title = Column(String, nullable=True)
    description = Column(String, nullable=True)
    hashtags = Column(String, nullable=True)
    video_creation_instructions = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="user_post_ideas")


