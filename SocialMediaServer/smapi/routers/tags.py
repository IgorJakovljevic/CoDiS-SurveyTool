from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/tags",
    tags=["Tags"]
)


@router.get("/{id}", response_model=schemas.Preview.Tag)
async def get_tag(id: int, current_user: schemas.Preview.User = Depends(get_current_user),) -> schemas.Preview.Tag:
    """Retrieves Tag from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Tag: Tag with id
    """
    return datasource.Tag.get(id)


@router.delete("/{id}", response_model=bool)
async def delete_tag(id: int, current_user: schemas.Preview.User = Depends(get_current_user),) -> bool:
    """Deletes Tag from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Tag: Tag with id
    """
    return datasource.Tag.delete(id)


@router.get("/", response_model=List[schemas.Preview.Tag])
async def get_tags(skip: int = 0, limit: int = 100) -> List[schemas.Preview.Tag]:
    """Retrieves Tags from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.Tag]: List of Tags
    """
    return datasource.Tag.get_all(skip, limit)


@router.post("/", response_model=schemas.Preview.Tag)
async def create_tag(tag: schemas.Tag, current_user: schemas.Preview.User = Depends(get_current_user),) -> schemas.Preview.Tag:
    """Create a new Tag

    Returns:
        schemas.Tag: Created Tag
    """
    return datasource.Tag.insert(tag)


@router.put("/", response_model=schemas.Preview.Tag)
async def create_tag(tag: schemas.Preview.Tag, current_user: schemas.Preview.User = Depends(get_current_user),) -> schemas.Preview.Tag:
    """Update a Tag

    Returns:
        schemas.Tag: Updated Tag
    """
    return datasource.Tag.update(tag)
