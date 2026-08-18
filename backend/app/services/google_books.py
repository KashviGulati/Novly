import requests


BAD_KEYWORDS = [
    "summary",
    "study guide",
    "analysis",
    "workbook",
    "review of",
    "guide to"
]


def search_books(query: str):

    response = requests.get(
        "https://openlibrary.org/search.json",
        params={"q": query}
    )

    data = response.json()

    books = []

    for book in data.get("docs", []):

        title = book.get("title", "")

        if any(
            keyword in title.lower()
            for keyword in BAD_KEYWORDS
        ):
            continue

        books.append({
            "open_library_id": book.get("key"),
            "title": title,
            "author": ", ".join(
                book.get("author_name", [])
            )
        })

        if len(books) == 10:
            break

    return books