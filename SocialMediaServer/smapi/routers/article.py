from typing import List
from smapi.database import datasource
from smapi.database import schemas
from smapi.routers.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/articles", dependencies=[Depends(get_current_user)], tags=["Articles"]
)


@router.get("/{id}", response_model=schemas.Preview.Article)
async def get_article(id: int) -> schemas.Preview.Article:
    """Retrieves Article from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Article: Article with id
    """
    return datasource.Article.get(id)


@router.get("/", response_model=List[schemas.Preview.Article])
async def get_articles(
    skip: int = 0, limit: int = 100
) -> List[schemas.Preview.Article]:
    """Retrieves Articles from Database

    Args:
        skip (int, optional): [description]. Defaults to 0.
        limit (int, optional): [description]. Defaults to 100.

    Returns:
        List[schemas.Article]: List of Articles
    """
    return datasource.Article.get_all(skip, limit)


@router.delete("/{id}", response_model=bool)
async def delete_article(id: int) -> bool:
    """Deletes Article from Database

    Args:
        id (int):  Object Id

    Returns:
        schemas.Article: Article with id
    """
    return datasource.Article.delete(id)


@router.post("/", response_model=schemas.Preview.Article)
async def create_article(article: schemas.Article) -> schemas.Preview.Article:
    """Create a new  Article

    Returns:
        schemas.Article: Created Article
    """
    return datasource.insert_article(article)


@router.put("/", response_model=schemas.Preview.Article)
async def update_article(article: schemas.Preview.Article) -> schemas.Preview.Article:
    """Create a new  Article

    Returns:
        schemas.Article: Created Article
    """

    return datasource.insert_article(article)
