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

from app.core.supabase import supabase


def update_book_enrichment(book_id, enrichment):

    result = (
        supabase
        .table("books")
        .update({
            "themes": enrichment["themes"],
            "moods": enrichment["moods"],
            "pacing": enrichment["pacing"],
            "description": enrichment["description"],
            "enriched": True
        })
        .eq("id", book_id)
        .execute()
    )

    return result.data[0]

def update_book_enrichment(book_id, enrichment):

    result = (
        supabase
        .table("books")
        .update({
            "themes": enrichment["themes"],
            "moods": enrichment["moods"],
            "pacing": enrichment["pacing"],
            "description": enrichment["description"],
            "enriched": True
        })
        .eq("id", book_id)
        .execute()
    )

    return result.data[0]

def get_book(book_id):

    result = (
        supabase
        .table("books")
        .select("*")
        .eq("id", book_id)
        .single()
        .execute()
    )

    return result.data

def update_book_status(book_id: str, status: str):

    result = (
        supabase
        .table("books")
        .update({
            "status": status
        })
        .eq("id", book_id)
        .execute()
    )

    return result.data[0]