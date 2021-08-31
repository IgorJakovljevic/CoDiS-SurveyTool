from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/participant",
    dependencies=[Depends(get_current_user)],
    tags=["Participant"],
)


@router.get("/{id}", response_model=schemas.Participant)
async def get_participant(id: int) -> schemas.Participant:
    """Retrieves Participant from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Participant: Participant with id
    """
    return datasource.Participant.get(id)


@router.delete("/{id}", response_model=bool)
async def delete_participan(id: int) -> bool:
    """Deletes Participant from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Participant: Participant with id
    """
    return datasource.Participant.delete(id)


@router.get("/", response_model=List[schemas.Participant])
async def get_participants(
    skip: int = 0, limit: int = 100
) -> List[schemas.Participant]:
    """Retrieves Participants from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.Notification]: List of Participants
    """
    return datasource.Participant.get_all(skip, limit)
