from sqlalchemy.orm import relationship

from ...db.database import Base
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    google_sub = Column(String, unique=True, nullable=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)

    remaining_post_creations = Column(Integer, default=0)
    remaining_post_creations_onetime_paid = Column(Integer, default=0)
    created_posts_all_time = Column(Integer, default=0)

    customer_id = Column(String(255), nullable=True)
    plan_id = Column(Integer, nullable=True)
    subscription_id = Column(String(255), nullable=True)
    subscription_status = Column(String(64), nullable=True)
    subscription_last_renew = Column(String, unique=False, nullable=True)
    subscription_next_renew = Column(String, unique=False, nullable=True)

    niche_preference = Column(String, unique=False, nullable=True)
    extra_preference = Column(String, unique=False, nullable=True)

    user_post_ideas = relationship("UserPostIdea", back_populates="user")
