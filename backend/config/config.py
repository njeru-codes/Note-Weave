# config.py
from pydantic import Field
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from pathlib import Path


load_dotenv()


class Settings(BaseSettings):
    MONGO_URI: str = Field(..., env="MONGO_URI")
    DB_NAME: str = Field("default-db", env="DB_NAME")
    SECRET_KEY: str = Field( ..., env="SECRET_KEY")
    GOOGLE_CLIENT_ID: str = Field( ..., env="GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET: str = Field( ..., env="GOOGLE_CLIENT_SECRET")
    REDIRECT_URI: str = Field( ..., env="REDIRECT_URI")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"



settings = Settings()
