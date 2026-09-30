from fastapi import APIRouter
from app.services.google_books import search_books
from app.models.book import AddBookRequest
from app.services.book_service import create_book_if_not_exists
from app.services.library_service import get_library
from app.services.enrichment_agent import enrich_book
from app.services.book_service import (
    create_book_if_not_exists,
    update_book_enrichment,
    get_book
)


router = APIRouter()


@router.get("/search")
def book_search(q: str):
    return search_books(q)


@router.post("/add")
def add_book(book: AddBookRequest):

    saved_book = create_book_if_not_exists(
        {
            "open_library_id": book.open_library_id,
            "title": book.title,
            "author": book.author,
            "cover_url": book.cover_url,
            "enriched": False
        }
    )

    return {
        "success": True,
        "book": saved_book
    }

@router.get("/library")
def library():

    return {
        "success": True,
        "books": get_library()
    }



@router.post("/enrich/{book_id}")
def enrich(book_id: str):

    book = get_book(book_id)

    enrichment = enrich_book(
        book["title"],
        book["author"]
    )

    updated_book = update_book_enrichment(
        book_id,
        enrichment
    )

    return {
        "success": True,
        "book": updated_book
    }