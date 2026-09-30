from app.core.supabase import supabase


def get_library():

    result = (
        supabase
        .table("books")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )

    return result.data