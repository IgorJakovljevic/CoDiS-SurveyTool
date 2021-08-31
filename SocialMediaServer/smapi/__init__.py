from fastapi import FastAPI
from smapi.config import Config
from smapi.routers import (
    tags,
    tasks,
    notifications,
    privacy_selection,
    sentiment_selection,
    article,
    survey,
    survey_public,
    auth,
    participant,
    evaluation_private,
    evaluation_public,
)
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware

tags_metadata = [
    {
        "name": "Server Health",
        "description": "Operations to test if the server is running",
    },
    {"name": "Auth", "description": "Authentification Operations"},
    {
        "name": "Surveys",
        "description": "Operations with Surveys.",
    },
    {
        "name": "Tags",
        "description": "Operations with Tags.",
    },
    {
        "name": "Tasks",
        "description": "Operations with Tasks.",
    },
    {
        "name": "Notifications",
        "description": "Operations with Notifications.",
    },
    {
        "name": "Articles",
        "description": "Operations with Articles.",
    },
    {
        "name": "PrivacySelection",
        "description": "Operations with PrivacySelection.",
    },
    {
        "name": "SentimentSelection",
        "description": "Operations with SentimentSelection.",
    },
    {
        "name": "Participant",
        "description": "Operations with Participant.",
    },
    {
        "name": "Evaluation Private",
        "description": "Restricted Operations with Evaluation.",
    },
]


app = FastAPI(
    title="Social Media Evaulation API",
    description="API Documentation for Social Media Evaulation Tool",
    version="0.0.1",
    openapi_tags=tags_metadata,
    docExpansion="none",
)

if Config.DEBUG:
    origins = [
        "*",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:4200",
        "http://codislabgraz.org",
        "http://codislabgraz.org:4200",
        "http://www.codislabgraz.org",
        "http://www.codislabgraz.org:4200",
        "https://codislabgraz.org",
        "https://codislabgraz.org:4200",
    ]

    app.add_middleware(GZipMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth.router)
app.include_router(survey.router)
app.include_router(survey_public.router)
app.include_router(tags.router)
app.include_router(tasks.router)
app.include_router(notifications.router)
app.include_router(privacy_selection.router)
app.include_router(sentiment_selection.router)
app.include_router(article.router)
app.include_router(participant.router)
app.include_router(evaluation_private.router)
app.include_router(evaluation_public.router)


@app.get("/ping", tags=["Server Health"])
async def ping():
    """Test if server is online

    Returns:
        string: Replies with pong to signal that the server is alive
    """
    return "pong"
