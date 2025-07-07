from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, JSON, Float

import datetime
from ...db.database import Base

class TrendingItem(Base):
    __tablename__ = "trending_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    source = Column(String(50), nullable=False)  # reddit, news, youtube
    url = Column(Text, nullable=True)
    thumbnail = Column(Text, nullable=True)
    description = Column(Text, nullable=True)

    # Source-specific fields
    source_name = Column(String(200), nullable=True)  # news source name
    channel = Column(String(200), nullable=True)  # youtube channel
    subreddit = Column(String(100), nullable=True)  # reddit subreddit

    # Metrics
    score = Column(Integer, default=0)  # reddit score
    views = Column(Integer, default=0)  # youtube views
    comments = Column(Integer, default=0)  # reddit comments

    # Metadata
    published_date = Column(DateTime, nullable=True)
    engagement_potential = Column(String(20), nullable=True)  # High, Medium, Low
    post_type = Column(String(50), default='text')

    # Additional data as JSON
    trend_metadata = Column(JSON, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.UTC))
    fetched_at = Column(DateTime, default=datetime.datetime.now(datetime.UTC))

    def to_dict(self):
        """Convert to dictionary format matching the original API response"""
        return {
            'title': self.title,
            'source': self.source,
            'url': self.url,
            'thumbnail': self.thumbnail,
            'description': self.description,
            'source_name': self.source_name,
            'channel': self.channel,
            'subreddit': self.subreddit,
            'score': self.score,
            'views': self.views,
            'comments': self.comments,
            'published': self.published_date.isoformat() if self.published_date else None,
            'engagement_potential': self.engagement_potential,
            'post_type': self.post_type,
            'trend_metadata': self.trend_metadata or {},
            'created_at': self.created_at.isoformat(),
            'fetched_at': self.fetched_at.isoformat()
        }


class TrendingSource(Base):
    __tablename__ = "trending_sources"

    id = Column(Integer, primary_key=True, index=True)
    source_name = Column(String(50), unique=True, nullable=False)
    last_fetched = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    fetch_interval_hours = Column(Integer, default=2)
    error_count = Column(Integer, default=0)
    last_error = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.datetime.now(datetime.UTC))
    updated_at = Column(DateTime, default=datetime.datetime.now(datetime.UTC), onupdate=datetime.datetime.now(datetime.UTC))