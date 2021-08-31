from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/evaluation/private", dependencies=[Depends(get_current_user)], tags=["Evaluation Private"]
)


@router.get("/{id}", response_model=schemas.Evaluation)
async def get_evaluation(id: int) -> schemas.Evaluation:
    """Retrieves Evaluation from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Evaluation: Evaluation with id
    """
    return datasource.get_evaluation(id)


@router.delete("/{id}", response_model=bool)
async def delete_evaluation(id: int) -> bool:
    """Deletes Evaluation from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Evaluation: Evaluation with id
    """
    return datasource.Evaluation.delete(id)


@router.get("/survey/{id}", response_model=List[schemas.Preview.EvaluationSimple])
async def get_survey_evaluations(id: int, skip: int = 0, limit: int = 100) -> List[schemas.Preview.EvaluationSimple]:
    """Retrieves EvaluationSimple from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.EvaluationSimple]: List of EvaluationSimple
    """
    return datasource.get_survey_evaluations(id, skip, limit)


@router.get("/", response_model=List[schemas.Preview.EvaluationSimple])
async def get_evaluations(skip: int = 0, limit: int = 100) -> List[schemas.Preview.EvaluationSimple]:
    """Retrieves EvaluationSimple from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.EvaluationSimple]: List of EvaluationSimple
    """
    return datasource.Evaluation.get_all(skip, limit)
