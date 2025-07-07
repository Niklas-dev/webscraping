import asyncio
import logging
import os
from datetime import datetime
from typing import Dict, Any, Optional, List

from celery.result import AsyncResult
from fastapi import APIRouter, HTTPException, WebSocket, Query
from sqlalchemy import desc, and_
from sqlalchemy.orm import Session
from starlette import status
from starlette.responses import JSONResponse

from app.db.database import db_dependency
from app.routers.auth.services import user_dependency
from .models import TrendingItem, TrendingSource
from .tasks import fetch_all_trending_data

router = APIRouter(
    prefix='/trending',
    tags=['trending']
)

logger = logging.getLogger(__name__)


@router.get("/")
async def get_all_trends(user: user_dependency, db: db_dependency):
    """Get trends from all available sources (from database)"""
    try:
        # Get all trends from database
        trends = db.query(TrendingItem).order_by(desc(TrendingItem.score)).all()

        # Group by source
        reddit_trends = [trend.to_dict() for trend in trends if trend.source == 'reddit']
        news_trends = [trend.to_dict() for trend in trends if trend.source == 'news']
        youtube_trends = [trend.to_dict() for trend in trends if trend.source == 'youtube']
        result = {
            'reddit': reddit_trends,
            'news': news_trends,
            'youtube': youtube_trends,
            'total_items': len(trends),
            'timestamp': datetime.now().isoformat(),
            'last_updated': trends[0].fetched_at.isoformat() if trends else None
        }

        return JSONResponse(content=result)

    except Exception as e:
        logger.error(f"Error fetching trends: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching trends: {str(e)}")


@router.get("/top")
async def get_top_trends(
        user: user_dependency,
        db: db_dependency,
        limit: int = Query(10, ge=1, le=50)
):
    """Get top trending items across all sources (from database)"""
    try:
        # Get top trends based on engagement scores
        trends = db.query(TrendingItem).order_by(
            desc(TrendingItem.score + TrendingItem.views)
        ).limit(limit).all()

        top_trends = [trend.to_dict() for trend in trends]

        total_available = db.query(TrendingItem).count()

        return JSONResponse(content={
            "top_trends": top_trends,
            "total_available": total_available,
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error fetching top trends: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching top trends: {str(e)}")


@router.get("/reddit")
async def get_reddit_trends(user: user_dependency, db: db_dependency):
    """Get trends from Reddit only (from database)"""
    try:
        reddit_trends = db.query(TrendingItem).filter(
            TrendingItem.source == 'reddit'
        ).order_by(desc(TrendingItem.score)).all()

        trends_data = [trend.to_dict() for trend in reddit_trends]

        return JSONResponse(content={
            "reddit_trends": trends_data,
            "count": len(trends_data),
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error fetching Reddit trends: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching Reddit trends: {str(e)}")


@router.get("/news")
async def get_news_trends(user: user_dependency, db: db_dependency):
    """Get trends from News API only (from database)"""
    try:
        news_trends = db.query(TrendingItem).filter(
            TrendingItem.source == 'news'
        ).order_by(desc(TrendingItem.fetched_at)).all()

        trends_data = [trend.to_dict() for trend in news_trends]

        return JSONResponse(content={
            "news_trends": trends_data,
            "count": len(trends_data),
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error fetching news trends: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching news trends: {str(e)}")


@router.get("/youtube")
async def get_youtube_trends(user: user_dependency, db: db_dependency):
    """Get trends from YouTube only (from database)"""
    try:
        youtube_trends = db.query(TrendingItem).filter(
            TrendingItem.source == 'youtube'
        ).order_by(desc(TrendingItem.views)).all()

        trends_data = [trend.to_dict() for trend in youtube_trends]

        return JSONResponse(content={
            "youtube_trends": trends_data,
            "count": len(trends_data),
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error fetching YouTube trends: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching YouTube trends: {str(e)}")


@router.get("/social-media-ideas")
async def get_social_media_post_ideas(
        user: user_dependency,
        db: db_dependency,
        category: Optional[str] = Query(None, description="Filter by category"),
        limit: int = Query(5, ge=1, le=40),
        include_thumbnails: bool = Query(True, description="Include thumbnails in response")
):
    """Get trending topics formatted as social media post ideas (from database)"""
    try:
        # Get top trends based on engagement potential
        query = db.query(TrendingItem).order_by(
            desc(TrendingItem.score + TrendingItem.views)

        )

        if category:
            query = query.filter(TrendingItem.source == category)

        trends = query.limit(limit).all()

        # Format as social media post ideas
        post_ideas = []
        for trend in trends:
            trend_dict = trend.to_dict()

            idea = {
                "title": trend.title,
                "source": trend.source,
                "post_angle": generate_post_angle(trend_dict),
                "hashtags": generate_hashtags(trend_dict),
                "engagement_potential": trend.engagement_potential or calculate_engagement_potential(trend_dict),
                "original_url": trend.url or '',
                "post_type": trend.post_type or 'text',
                "timestamp": datetime.now().isoformat()
            }

            # Add thumbnail if available and requested
            if include_thumbnails and trend.thumbnail:
                idea["thumbnail"] = trend.thumbnail
                idea["has_visual"] = True
            else:
                idea["has_visual"] = False

            # Add source-specific metadata
            if trend.source == 'youtube':
                idea["video_url"] = trend.url or ''
                idea["channel"] = trend.channel or ''
                idea["views"] = trend.views or 0
            elif trend.source == 'reddit':
                idea["subreddit"] = trend.subreddit or ''
                idea["reddit_score"] = trend.score or 0
                idea["comments"] = trend.comments or 0
            elif trend.source == 'news':
                idea["news_source"] = trend.source_name or ''
                idea["published_date"] = trend.published_date.isoformat() if trend.published_date else ''

            post_ideas.append(idea)

        return JSONResponse(content={
            "social_media_ideas": post_ideas,
            "count": len(post_ideas),
            "has_thumbnails": any(idea.get("has_visual", False) for idea in post_ideas),
            "generated_at": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error generating post ideas: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating post ideas: {str(e)}")


@router.post("/refresh")
async def refresh_trends(user: user_dependency, db: db_dependency):
    """Manually trigger a refresh of trending data"""
    try:
        # Start the background task
        task = fetch_all_trending_data.delay()

        return JSONResponse(content={
            "status": "started",
            "task_id": task.id,
            "message": "Trending data refresh started",
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error starting refresh task: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error starting refresh task: {str(e)}")


@router.get("/status")
async def get_trending_status(user: user_dependency, db: db_dependency):
    """Get the status of trending data sources"""
    try:
        sources = db.query(TrendingSource).all()
        total_items = db.query(TrendingItem).count()

        latest_item = db.query(TrendingItem).order_by(
            desc(TrendingItem.fetched_at)
        ).first()

        return JSONResponse(content={
            "total_items": total_items,
            "last_updated": latest_item.fetched_at.isoformat() if latest_item else None,
            "sources": [
                {
                    "source_name": source.source_name,
                    "last_fetched": source.last_fetched.isoformat() if source.last_fetched else None,
                    "is_active": source.is_active,
                    "error_count": source.error_count,
                    "last_error": source.last_error
                }
                for source in sources
            ],
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error getting trending status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error getting trending status: {str(e)}")


# Helper functions (same as before)
def generate_post_angle(trend: Dict[str, Any]) -> str:
    """Generate a social media post angle based on the trend"""
    source = trend['source']
    title = trend['title']

    angles = {
        'reddit': f"💬 Reddit is buzzing about: {title}",
        'news': f"📰 Breaking trend: {title}",
        'youtube': f"🎥 Viral video trend: {title}"
    }

    return angles.get(source, f"🔥 Trending now: {title}")


def generate_hashtags(trend: Dict[str, Any]) -> List[str]:
    """Generate relevant hashtags for the trend"""
    title = trend['title'].lower()
    source = trend['source']

    hashtags = ['#trending', f'#{source}']

    if source == 'reddit':
        hashtags.extend(['#reddit', '#viral', '#discussion'])
    elif source == 'news':
        hashtags.extend(['#news', '#breaking', '#current'])
    elif source == 'youtube':
        hashtags.extend(['#youtube', '#video', '#viral'])

    return hashtags


def calculate_engagement_potential(trend: Dict[str, Any]) -> str:
    """Calculate engagement potential based on trend metrics"""
    source = trend['source']

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
        return "High"