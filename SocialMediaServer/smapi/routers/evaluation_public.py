from typing import List
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
from smapi.database import datasource
from smapi.database import schemas
from fastapi import APIRouter


router = APIRouter(prefix="/evaluation/public", tags=["Evaluation Public"])


async def get_participant(hash_code: str) -> schemas.ParticipantSimple:
    user = datasource.get_participant(hash_code)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Participant Credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@router.post("/submit", response_model=bool)
async def submit_evaluation(
    evaluation: schemas.Evaluation
) -> bool:
    return datasource.submit_evaluation(evaluation)
