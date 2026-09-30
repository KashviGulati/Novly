from pydantic import BaseModel


class AddBookRequest(BaseModel):
    open_library_id: str
    title: str
    author: str
    cover_url: str | None = None