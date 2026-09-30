from groq import Groq
from app.core.config import GROQ_API_KEY
import json

client = Groq(api_key=GROQ_API_KEY)


def enrich_book(title, author):

    prompt = f"""
You are a literary analysis agent.

Book:
Title: {title}
Author: {author}

Infer likely themes, moods, pacing and a short description.

Return ONLY valid JSON.

{{
  "themes": ["theme1","theme2","theme3"],
  "moods": ["mood1","mood2","mood3"],
  "pacing": "slow|medium|fast",
  "description": "2-3 sentence description"
}}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return json.loads(
        response.choices[0].message.content
    )