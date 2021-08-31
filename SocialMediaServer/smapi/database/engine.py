from smapi.config import Config
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


engine = create_engine(
    Config.SQLALCHEMY_DATABASE_URI
)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

Base = declarative_base()
