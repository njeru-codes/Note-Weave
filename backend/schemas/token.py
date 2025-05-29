
from pydantic import BaseModel


class GoogleToken(BaseModel):
    credential: str