from fastapi import APIRouter
from app.core.supabase import supabase

router = APIRouter()


@router.get("/test-db")
def test_db():

    result = (
        supabase
        .table("books")
        .select("*")
        .execute()
    )

    return result.data