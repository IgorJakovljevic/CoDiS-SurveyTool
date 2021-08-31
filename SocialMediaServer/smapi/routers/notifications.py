from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/notifications",
    dependencies=[Depends(get_current_user)],
    tags=["Notifications"],
)


@router.get("/{id}", response_model=schemas.Preview.Notification)
async def get_notification(id: int) -> schemas.Preview.Notification:
    """Retrieves Notification from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Notification: Notification with id
    """
    return datasource.Notification.get(id)


@router.delete("/{id}", response_model=bool)
async def delete_notification(id: int) -> bool:
    """Deletes Notification from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Notification: Notification with id
    """
    return datasource.Notification.delete(id)


@router.get("/", response_model=List[schemas.Preview.Notification])
async def get_notifications(
    skip: int = 0, limit: int = 100
) -> List[schemas.Preview.Notification]:
    """Retrieves Notifications from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.Notification]: List of Notifications
    """
    return datasource.Notification.get_all(skip, limit)


@router.post("/", response_model=schemas.Preview.Notification)
async def create_notification(
    notification: schemas.Notification,
) -> schemas.Preview.Notification:
    """Create a new  Notification

    Returns:
        schemas.Notification: Created Notification
    """
    return datasource.Notification.insert(notification)


@router.put("/", response_model=schemas.Preview.Notification)
async def update_notification(
    notification: schemas.Preview.Notification,
) -> schemas.Preview.Notification:
    """Update a Notification

    Returns:
        schemas.Notification: Updated Notification
    """
    return datasource.Notification.update(notification)
