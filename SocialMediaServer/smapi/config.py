import os


class Config:
    """App configuration."""

    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")
    SALT = os.getenv("SALT", "12")
    DEBUG = os.getenv("DEBUG", True)

    SQLALCHEMY_DATABASE_URI = None
    if DB_USER and DB_PASSWORD and DB_HOST and DB_PORT and DB_NAME:
        SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
