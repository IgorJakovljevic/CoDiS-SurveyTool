from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/surveys", dependencies=[Depends(get_current_user)], tags=["Surveys"]
)


@router.get("/{id}", response_model=schemas.Preview.Survey)
async def get_survey(id: int) -> schemas.Preview.Survey:
    """Retrieves Survey from Database

    Args:
        id (int):  Object Id

    Returns:
        List[schemas.Survey]: Surveys with id
    """
    return datasource.get_survey(id)


@router.delete("/{id}", response_model=bool)
async def delete_survey(id: int) -> bool:
    """Deletes Survey from Database

    Args:
        id (int):  Object Id

    Returns:
        List[schemas.Survey]: Surveys with id
    """
    return datasource.Survey.delete(id)


@router.get("/", response_model=List[schemas.Preview.Survey])
async def get_surveys(skip: int = 0, limit: int = 100) -> List[schemas.Preview.Survey]:
    """Retrieves Surveys from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.Survey]: List of Surveys
    """
    return datasource.Survey.get_all(skip, limit)


@router.post("/", response_model=schemas.Preview.Survey)
async def create_survey(survey: schemas.Survey) -> schemas.Preview.Survey:
    """Create a new  Survey

    Returns:
        schemas.Survey: Created Survey
    """
    return datasource.insert_survey(survey)


@router.put("/", response_model=schemas.Preview.Survey)
async def update_survey(survey: schemas.Preview.Survey) -> schemas.Preview.Survey:
    """Update a Survey

    Returns:
        schemas.Survey: Updated Survey
    """
    return datasource.insert_survey(survey)


@router.post("/public", response_model=bool)
async def set_is_public_survey(id: int, isPublic: bool) -> bool:
    """Sets is public attribute of a  Survey

    Returns:
        schemas.Survey: Created Survey
    """
    return datasource.set_survey_privacy(id, isPublic)


@router.post("/AB", response_model=schemas.Preview.ABSurvey)
async def create_ab_survey(ab_survey: schemas.ABSurvey) -> schemas.Preview.ABSurvey:
    """Create a new AB Survey

    Returns:
        schemas.Preview.ABSurvey: Created ABSurvey
    """
    return datasource.ABSurvey.insert(ab_survey)
