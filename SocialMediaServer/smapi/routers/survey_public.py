from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

from fastapi import Depends, HTTPException, status

router = APIRouter(prefix="/public/surveys", tags=["Surveys"])


@router.get("/{id}", response_model=schemas.Preview.Survey)
async def get_public_survey(id: int) -> schemas.Preview.Survey:
    """Retrieves Public Survey from Database

    Args:
        id (int):  Object Id

    Returns:
        List[schemas.Survey]: Surveys with id
    """
    survey = datasource.get_public_survey(id)
    if survey is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="SURVEY Not Found"
        )
    return survey


@router.get("/ab/{id}", response_model=schemas.Preview.ABSurvey)
async def get_ab_survey(id: int) -> schemas.Preview.ABSurvey:
    """Returns a AB Survey

    Returns:
        schemas.Preview.ABSurvey: ABSurvey
    """
    return datasource.get_ab_survey(id)
