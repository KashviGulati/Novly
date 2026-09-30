from app.core.supabase import supabase


def create_book_if_not_exists(book_data):

    existing = (
        supabase
        .table("books")
        .select("*")
        .eq("open_library_id", book_data["open_library_id"])
        .execute()
    )

    if existing.data:
        return existing.data[0]

    result = (
        supabase
        .table("books")
        .insert(book_data)
        .execute()
    )

    return result.data[0]