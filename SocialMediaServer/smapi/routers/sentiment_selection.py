from typing import List

from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/sentimentSelection",
    tags=["SentimentSelection"],
)


@router.get("/{id}", response_model=schemas.Preview.SentimentSelection)
async def get_sentiment_selection(id: int, current_user: schemas.Preview.User = Depends(get_current_user),) -> schemas.Preview.SentimentSelection:
    """Retrieves SentimentSelection from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.SentimentSelection: SentimentSelection with id
    """
    return datasource.SentimentSelection.get(id)


@router.delete("/{id}", response_model=bool)
async def delete_sentiment_selection(id: int, current_user: schemas.Preview.User = Depends(get_current_user),) -> bool:
    """Deletes SentimentSelection from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.SentimentSelection: SentimentSelection with id
    """
    return datasource.SentimentSelection.delete(id)


@router.get("/", response_model=List[schemas.Preview.SentimentSelection])
async def get_privacy_selections(
    skip: int = 0, limit: int = 100
) -> List[schemas.Preview.Notification]:
    """Retrieves SentimentSelection from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.Notification]: List of SentimentSelection
    """
    return datasource.SentimentSelection.get_all(skip, limit)


@router.post("/", response_model=schemas.Preview.SentimentSelection)
async def create_sentiment_selection(
    sentimentSelection: schemas.SentimentSelection,
    current_user: schemas.Preview.User = Depends(get_current_user),
) -> schemas.Preview.SentimentSelection:
    """Create a new  SentimentSelection

    Returns:
        schemas.SentimentSelection: Created SentimentSelection
    """
    return datasource.SentimentSelection.insert(sentimentSelection)


@router.put("/", response_model=schemas.Preview.SentimentSelection)
async def create_sentiment_selection(
    sentimentSelection: schemas.Preview.SentimentSelection,
    current_user: schemas.Preview.User = Depends(get_current_user),
) -> schemas.Preview.SentimentSelection:
    """Update a SentimentSelection

    Returns:
        schemas.SentimentSelection: Updated SentimentSelection
    """
    return datasource.SentimentSelection.update(sentimentSelection)
