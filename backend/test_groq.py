from app.services.enrichment_agent import enrich_book

print(
    enrich_book(
        "Project Hail Mary",
        "Andy Weir"
    )
)