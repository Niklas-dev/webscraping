# app/routers/trending/tasks.py
from app.db.database import SessionLocal
from celery_setup import celery_app
from celery import Task

import logging
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
import asyncio
import datetime
from .models import TrendingItem, TrendingSource
from .services import TrendAggregator
import os

logger = logging.getLogger(__name__)

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")





@celery_app.task(bind=True)
def fetch_all_trending_data(self):
    """Fetch trending data from all sources and store in database"""
    db = SessionLocal()
    try:
        logger.info("Starting trending data fetch task")

        # Clear old data (older than 24 hours)
        cutoff_time = datetime.datetime.now(datetime.UTC) - datetime.timedelta(hours=24)
        deleted_count = db.execute(
            delete(TrendingItem).where(TrendingItem.fetched_at < cutoff_time)
        ).rowcount

        logger.info(f"Deleted {deleted_count} old trending items")

        # Fetch new data using async wrapper
        total_items = 0

        # Reddit trends
        reddit_count = asyncio.run(fetch_reddit_trends_async(db))
        total_items += reddit_count

        # News trends
        news_count = asyncio.run(fetch_news_trends_async(db))
        total_items += news_count

        # YouTube trends
        youtube_count = asyncio.run(fetch_youtube_trends_async(db))
        total_items += youtube_count

        # Update source tracking
        update_source_status(db, 'all', success=True)

        db.commit()
        logger.info(f"Successfully fetched {total_items} trending items")

        return {
            'status': 'success',
            'total_items': total_items,
            'reddit_items': reddit_count,
            'news_items': news_count,
            'youtube_items': youtube_count,
            'timestamp': datetime.datetime.now(datetime.UTC).isoformat()
        }

    except Exception as e:
        logger.error(f"Error in fetch_all_trending_data: {str(e)}")
        update_source_status(db, 'all', success=False, error=str(e))
        db.rollback()
        raise


async def fetch_reddit_trends_async(db: Session) -> int:
    """Fetch Reddit trends and store in database"""
    try:
        async with TrendAggregator() as aggregator:
            reddit_trends = await aggregator.get_reddit_trends()

            items_saved = 0
            for trend in reddit_trends:
                # Check if item already exists (by title and source)
                existing = db.query(TrendingItem).filter(
                    and_(
                        TrendingItem.title == trend['title'],
                        TrendingItem.source == 'reddit'
                    )
                ).first()

                if not existing:
                    trending_item = TrendingItem(
                        title=trend['title'],
                        source='reddit',
                        url=trend.get('url', ''),
                        thumbnail=trend.get('thumbnail', ''),
                        description=trend.get('description', ''),
                        subreddit=trend.get('subreddit', ''),
                        score=trend.get('score', 0),
                        comments=trend.get('comments', 0),
                        engagement_potential=calculate_engagement_potential(trend),
                        post_type='text',
                        trend_metadata=trend.get('trend_metadata', {}),
                        fetched_at=datetime.datetime.now(datetime.UTC)
                    )
                    db.add(trending_item)
                    items_saved += 1

            logger.info(f"Saved {items_saved} Reddit trending items")
            return items_saved

    except Exception as e:
        logger.error(f"Error fetching Reddit trends: {str(e)}")
        raise


async def fetch_news_trends_async(db: Session) -> int:
    """Fetch news trends and store in database"""
    try:
        async with TrendAggregator(NEWS_API_KEY) as aggregator:
            news_trends = await aggregator.get_news_trends()

            items_saved = 0
            for trend in news_trends:
                existing = db.query(TrendingItem).filter(
                    and_(
                        TrendingItem.title == trend['title'],
                        TrendingItem.source == 'news'
                    )
                ).first()

                if not existing:
                    trending_item = TrendingItem(
                        title=trend['title'],
                        source='news',
                        url=trend.get('url', ''),
                        thumbnail=trend.get('thumbnail', ''),
                        description=trend.get('description', ''),
                        source_name=trend.get('source_name', ''),
                        published_date=trend.get('published_date'),
                        engagement_potential='High',  # News generally has high engagement
                        post_type='article',
                        trend_metadata=trend.get('trend_metadata', {}),
                        fetched_at=datetime.datetime.now(datetime.UTC)
                    )
                    db.add(trending_item)
                    items_saved += 1

            logger.info(f"Saved {items_saved} News trending items")
            return items_saved

    except Exception as e:
        logger.error(f"Error fetching News trends: {str(e)}")
        raise


async def fetch_youtube_trends_async(db: Session) -> int:
    """Fetch YouTube trends and store in database"""
    try:
        async with TrendAggregator(youtube_api_key=YOUTUBE_API_KEY) as aggregator:
            youtube_trends = await aggregator.get_youtube_trends()

            items_saved = 0
            for trend in youtube_trends:
                existing = db.query(TrendingItem).filter(
                    and_(
                        TrendingItem.title == trend['title'],
                        TrendingItem.source == 'youtube'
                    )
                ).first()

                if not existing:
                    trending_item = TrendingItem(
                        title=trend['title'],
                        source='youtube',
                        url=trend.get('url', ''),
                        thumbnail=trend.get('thumbnail', ''),
                        description=trend.get('description', ''),
                        channel=trend.get('channel', ''),
                        views=trend.get('views', 0),
                        engagement_potential=calculate_engagement_potential(trend),
                        post_type='video',
                        trend_metadata=trend.get('trend_metadata', {}),
                        fetched_at=datetime.datetime.now(datetime.UTC)
                    )
                    db.add(trending_item)
                    items_saved += 1

            logger.info(f"Saved {items_saved} YouTube trending items")
            return items_saved

    except Exception as e:
        logger.error(f"Error fetching YouTube trends: {str(e)}")
        raise


def update_source_status(db: Session, source_name: str, success: bool, error: str = None):
    """Update the status of a trending source"""
    try:
        source = db.query(TrendingSource).filter(
            TrendingSource.source_name == source_name
        ).first()

        if not source:
            source = TrendingSource(
                source_name=source_name,
                last_fetched=datetime.datetime.now(datetime.UTC),
                error_count=0 if success else 1,
                last_error=error if not success else None
            )
            db.add(source)
        else:
            source.last_fetched = datetime.datetime.now(datetime.UTC)
            if success:
                source.error_count = 0
                source.last_error = None
            else:
                source.error_count += 1
                source.last_error = error
            source.updated_at = datetime.datetime.now(datetime.UTC)

        db.commit()

    except Exception as e:
        logger.error(f"Error updating source status: {str(e)}")


def calculate_engagement_potential(trend: Dict[str, Any]) -> str:
    """Calculate engagement potential based on trend metrics"""
    source = trend.get('source', '')

    if source == 'reddit':
        score = trend.get('score', 0)
        if score > 10000:
            return "Very High"
        elif score > 5000:
            return "High"
        elif score > 1000:
            return "Medium"
        else:
            return "Low"

    elif source == 'youtube':
        views = trend.get('views', 0)
        if views > 1000000:
            return "Very High"
        elif views > 500000:
            return "High"
        elif views > 100000:
            return "Medium"
        else:
            return "Low"

    else:  # news
        return "High"  # News is generally high engagement


@celery_app.task(bind=True)
def cleanup_old_trends(self):
    """Clean up trends older than specified time"""
    db = SessionLocal()
    try:
        # Remove items older than 48 hours
        cutoff_time = datetime.datetime.now(datetime.UTC) - datetime.timedelta(hours=48)
        deleted_count = db.execute(
            delete(TrendingItem).where(TrendingItem.fetched_at < cutoff_time)
        ).rowcount

        db.commit()
        logger.info(f"Cleaned up {deleted_count} old trending items")

        return {
            'status': 'success',
            'deleted_count': deleted_count,
            'timestamp': datetime.datetime.now(datetime.UTC).isoformat()
        }

    except Exception as e:
        logger.error(f"Error in cleanup_old_trends: {str(e)}")
        db.rollback()
        raise