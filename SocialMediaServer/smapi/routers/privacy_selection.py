from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/privacySelection",
    tags=["PrivacySelection"],
)


@router.get("/{id}", response_model=schemas.Preview.PrivacySelection)
async def get_privacy_selection(id: int, current_user: schemas.Preview.User = Depends(get_current_user), ) -> schemas.Preview.PrivacySelection:
    """Retrieves PrivacySelection from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.PrivacySelection: PrivacySelection with id
    """
    return datasource.PrivacySelection.get(id)


@router.delete("/{id}", response_model=bool)
async def delete_privacy_selection(id: int, current_user: schemas.Preview.User = Depends(get_current_user), ) -> bool:
    """Deletes PrivacySelection from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.PrivacySelection: PrivacySelection with id
    """
    return datasource.PrivacySelection.delete(id)


@router.get("/", response_model=List[schemas.Preview.PrivacySelection])
async def get_privacy_selections(
    skip: int = 0, limit: int = 100
) -> List[schemas.Preview.Notification]:
    """Retrieves PrivacySelection from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.Notification]: List of PrivacySelection
    """
    return datasource.PrivacySelection.get_all(skip, limit)


@router.post("/", response_model=schemas.Preview.PrivacySelection)
async def create_privacy_selection(
    privacySelection: schemas.PrivacySelection,
    current_user: schemas.Preview.User = Depends(get_current_user),
) -> schemas.Preview.PrivacySelection:
    """Create a new  PrivacySelection

    Returns:
        schemas.PrivacySelection: Created PrivacySelection
    """
    return datasource.PrivacySelection.insert(privacySelection)


@router.put("/", response_model=schemas.Preview.PrivacySelection)
async def create_privacy_selection(
    privacySelection: schemas.Preview.PrivacySelection,
    current_user: schemas.Preview.User = Depends(get_current_user),
) -> schemas.Preview.PrivacySelection:
    """Update a PrivacySelection

    Returns:
        schemas.PrivacySelection: Updated PrivacySelection
    """
    return datasource.PrivacySelection.update(privacySelection)
