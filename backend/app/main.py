from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.books import router as books_router

app = FastAPI(title="Novly API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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