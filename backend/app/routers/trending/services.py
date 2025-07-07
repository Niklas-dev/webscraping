import requests
import asyncio
import aiohttp
from datetime import datetime
from typing import Dict, List, Any
import json


class TrendAggregator:
    def __init__(self, news_api_key: str = None, youtube_api_key: str = None):
        self.news_api_key = news_api_key
        self.youtube_api_key = youtube_api_key
        self.session = None

    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def get_reddit_trends(self) -> List[Dict[str, Any]]:
        """Get trending posts from Reddit"""
        try:
            headers = {'User-Agent': 'TrendBot/1.0'}
            subreddits = ['all', 'popular', 'news', 'worldnews']
            all_trends = []

            for subreddit in subreddits:
                url = f"https://www.reddit.com/r/{subreddit}/hot.json?limit=10"

                async with self.session.get(url, headers=headers) as response:
                    if response.status == 200:
                        data = await response.json()

                        for post in data['data']['children']:
                            post_data = post['data']
                            all_trends.append({
                                'source': 'reddit',
                                'title': post_data['title'],
                                'score': post_data['score'],
                                'subreddit': post_data['subreddit'],
                                'url': f"https://reddit.com{post_data['permalink']}",
                                'created': datetime.fromtimestamp(post_data['created_utc']).isoformat(),
                                'comments': post_data['num_comments'],
                                'upvote_ratio': post_data.get('upvote_ratio', 0)
                            })

            # Sort by score and return top 20
            return sorted(all_trends, key=lambda x: x['score'], reverse=True)[:40]

        except Exception as e:
            print(f"Reddit API Error: {e}")
            return []

    async def get_news_trends(self) -> List[Dict[str, Any]]:
        """Get trending news from NewsAPI"""
        if not self.news_api_key:
            print("NewsAPI key not provided, skipping news trends")
            return []

        try:
            # Top headlines
            url = f"https://newsapi.org/v2/top-headlines"
            params = {
                'country': 'us',
                'pageSize': 40,
                'apiKey': self.news_api_key
            }

            async with self.session.get(url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    trends = []

                    for article in data.get('articles', []):
                        trends.append({
                            'source': 'news',
                            'title': article['title'],
                            'description': article.get('description', ''),
                            'url': article['url'],
                            'published': article['publishedAt'],
                            'source_name': article['source']['name'],
                            'author': article.get('author', 'Unknown')
                        })

                    return trends
                else:
                    print(f"NewsAPI Error: {response.status}")
                    return []

        except Exception as e:
            print(f"News API Error: {e}")
            return []

    async def get_youtube_trends(self) -> List[Dict[str, Any]]:
        """Get trending videos from YouTube"""
        if not self.youtube_api_key:
            print("YouTube API key not provided, skipping YouTube trends")
            return []

        try:
            url = "https://www.googleapis.com/youtube/v3/videos"
            params = {
                'part': 'snippet,statistics',
                'chart': 'mostPopular',
                'regionCode': 'US',
                'maxResults': 40,
                'key': self.youtube_api_key
            }

            async with self.session.get(url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    trends = []

                    for video in data.get('items', []):
                        snippet = video['snippet']
                        stats = video.get('statistics', {})

                        trends.append({
                            'source': 'youtube',
                            'title': snippet['title'],
                            'description': snippet.get('description', '')[:200] + '...',
                            'channel': snippet['channelTitle'],
                            'published': snippet['publishedAt'],
                            'url': f"https://youtube.com/watch?v={video['id']}",
                            'views': int(stats.get('viewCount', 0)),
                            'likes': int(stats.get('likeCount', 0)),
                            'comments': int(stats.get('commentCount', 0))
                        })

                    return trends
                else:
                    print(f"YouTube API Error: {response.status}")
                    return []

        except Exception as e:
            print(f"YouTube API Error: {e}")
            return []

    async def get_all_trends(self) -> Dict[str, List[Dict[str, Any]]]:
        """Get trends from all sources"""
        tasks = [
            self.get_reddit_trends(),
            self.get_news_trends(),
            self.get_youtube_trends()
        ]

        reddit_trends, news_trends, youtube_trends = await asyncio.gather(*tasks)

        return {
            'reddit': reddit_trends,
            'news': news_trends,
            'youtube': youtube_trends,
            'total_items': len(reddit_trends) + len(news_trends) + len(youtube_trends),
            'timestamp': datetime.now().isoformat()
        }

    def get_top_trends(self, all_trends: Dict, limit: int = 10) -> List[Dict[str, Any]]:
        """Get top trending items across all sources"""
        combined = []

        # Add Reddit trends with weighted score
        for trend in all_trends['reddit']:
            trend['weighted_score'] = trend['score'] * 0.1  # Scale down Reddit scores
            combined.append(trend)

        # Add news trends (assume high relevance)
        for trend in all_trends['news']:
            trend['weighted_score'] = 1000  # High baseline for news
            combined.append(trend)

        # Add YouTube trends with view-based scoring
        for trend in all_trends['youtube']:
            trend['weighted_score'] = trend['views'] / 10000  # Scale down view counts
            combined.append(trend)

        # Sort by weighted score and return top items
        return sorted(combined, key=lambda x: x['weighted_score'], reverse=True)[:limit]


def get_trends_sync(news_api_key: str = None, youtube_api_key: str = None) -> Dict:
    """Synchronous wrapper for FastAPI integration"""

    async def _get_trends():
        async with TrendAggregator(news_api_key, youtube_api_key) as aggregator:
            return await aggregator.get_all_trends()

    return asyncio.run(_get_trends())
