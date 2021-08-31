from smapi.database.models import Task
from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/tasks", dependencies=[Depends(get_current_user)], tags=["Tasks"]
)


@router.get("/{id}", response_model=schemas.Preview.Task)
async def get_task(id: int) -> schemas.Preview.Task:
    """Retrieves Task from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Task: Task with id
    """
    return datasource.Task.get(id)


@router.delete("/{id}", response_model=bool)
async def delete_task(id: int) -> bool:
    """Deletes Task from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Task: Task with id
    """
    return datasource.Task.delete(id)


@router.get("/", response_model=List[schemas.Preview.Task])
async def get_tasks(skip: int = 0, limit: int = 100) -> List[schemas.Preview.Task]:
    """Retrieves Tasks from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        [type]: [description]
    """
    return datasource.Task.get_all(skip, limit)


@router.post("/", response_model=schemas.Preview.Task)
async def create_task(task: schemas.Task) -> schemas.Preview.Task:
    """Create a new task

    Args:
        text (str): Task Text

    Returns:
        schemas.Task: Created Task
    """
    return datasource.Task.insert(task)


@router.put("/", response_model=schemas.Preview.Task)
async def update_task(task: schemas.Preview.Task) -> schemas.Preview.Task:
    """Update a task

    Args:
        text (str): Task Text

    Returns:
        schemas.Task: Created Task
    """
    return datasource.Task.update(task)
