from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime



class Note(BaseModel):
    title: str =Field(..., min_length=1, max_length=100)
    content: str =Field(..., min_length=1)


class NewNote(Note):
    pass


class UpdateNote(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    content: Optional[str] = Field(None, min_length=1)

class NoteOut(BaseModel):
    id: str =Field( ..., alias="_id")
    title: str
    content: str
    created_at: datetime
    updated_at: Optional[datetime] = None


    