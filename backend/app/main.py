from fastapi import FastAPI
from app.api.books import router as books_router

app = FastAPI(title="Novly API")

app.include_router(
    books_router,
    prefix="/books",
    tags=["Books"]
)


@app.get("/")
def root():
    return {
        "message": "Novly API running"
    }