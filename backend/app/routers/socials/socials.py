from fastapi import APIRouter, Request

from instascrape import *

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

def fetch_instagram():
    google_hashtag = Hashtag('https://www.instagram.com/explore/tags/google/')
    google_hashtag.scrape()
    print(google_hashtag.amount_of_posts)
    return google_hashtag.amount_of_posts

@router.get("/get-instagram")
async def get_instagram(request: Request):
    return "Success"
