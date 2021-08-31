from typing import List
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
from smapi.database import datasource
from smapi.database import schemas
from fastapi import APIRouter

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


router = APIRouter(prefix="/auth")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> schemas.Preview.User:
    user = datasource.get_user_by_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@router.get("/users", response_model=List[schemas.Preview.User], tags=["Auth"])
async def get_users(
    current_user: schemas.Preview.User = Depends(get_current_user),
) -> List[schemas.Preview.User]:
    return datasource.User.get_all()


@router.post("/participant", response_model=schemas.ParticipantSimple, tags=["Auth"])
async def signup_participant() -> schemas.ParticipantSimple:
    return datasource.create_participant()


@router.post("/signup", response_model=schemas.Preview.User, tags=["Auth"])
async def signup(user: schemas.User) -> schemas.Preview.User:
    return datasource.create_user(user)


@router.post("/token", response_model=schemas.AuthToken, tags=["Auth"])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = datasource.get_user_by_username(form_data.username)
    if user == None:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")

    hashed_password = datasource.hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")

    return {"access_token": hashed_password, "token_type": "bearer", "user_id": user.id}
