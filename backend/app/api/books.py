from fastapi import APIRouter
from app.services.google_books import search_books
from app.models.book import AddBookRequest
from app.services.book_service import create_book_if_not_exists

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
            "enriched": False
        }
    )

    return {
        "success": True,
        "book": saved_book
    }