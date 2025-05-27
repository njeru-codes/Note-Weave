from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.responses import JSONResponse
from motor.motor_asyncio  import AsyncIOMotorDatabase 
from ..config.database import get_db
from ..utils.auth  import get_current_user
from ..schemas.note import NewNote, NoteOut, UpdateNote
from datetime import datetime
from bson import ObjectId

router = APIRouter(
    tags=["Notes"],
    prefix='/notes'
)



# get all notes
@router.get('/', response_model=list[NoteOut])
async def get_all_notes(current_user=Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_db) ):
    try:
        cursor = db.notes.find({"owner_id": str(current_user["id"])})
        notes = await cursor.to_list(length=None)

        for note in notes:
            note['_id'] = str(note['_id'])
        return notes
    except Exception as error:
        raise HTTPException(status_code=500, detail="internal server error")
    
# get single note
@router.get("/{note_id}", response_model=NoteOut)
async def get_single_note(note_id: str, current_user=Depends(get_current_user),  db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        try:
            object_id = ObjectId(note_id)
        except Exception:
            return JSONResponse(status_code=400, content={"detail": "Invalid note ID format"})
        
        note = await db.notes.find_one({ "_id": object_id, "owner_id": str(current_user["id"]) })
        if not note:
            return JSONResponse(status_code=400, content={"detail": "Note not found"})
        
        note['_id'] = str(note['_id'])
        return note
    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail="internal server error")


# create new note
@router.post('/')
async def create_new_note(new_note:NewNote, current_user=Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        note_data ={
            "title": new_note.title,
            "content": new_note.content,
            "created_at": datetime.now(),
            "updated_at": None,
            "owner_id": str(current_user["id"])
        }
        await db.notes.insert_one(note_data)
        note_data['_id'] = str(note_data['_id'])
        return note_data
    except Exception as error:
        raise HTTPException(status_code=500, detail="internal server error")
    

# update note
@router.put("/{note_id}", response_model=NoteOut)
async def update_note(note_id: str, updated_note:UpdateNote, current_user=Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        try:
            object_id = ObjectId(note_id)
        except Exception:
            return JSONResponse(status_code=400, content={"detail": "Invalid note ID format"})
        
        update_fields = updated_note.model_dump(exclude_unset=True)
        if not update_fields:
            return JSONResponse(status_code=400, content={"detail":"No data provided for update"})

        result = await db.notes.update_one(
            {"_id": object_id, "owner_id": str(current_user["id"])},
            {"$set": update_fields}
        )
        if result.matched_count == 0:
            return JSONResponse(status_code=404, content={"detail":"Note not found or unauthorized"} )
        updated_note = await db.notes.find_one({"_id": object_id})
        updated_note['_id'] = str(updated_note['_id'])
        return updated_note
    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail="internal server error")
    

# delete note
@router.delete("/{note_id}")
async def delete_note(note_id: str, current_user=Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        try:
            object_id = ObjectId(note_id)
        except Exception:
            return JSONResponse(status_code=400, content={"detail": "Invalid note ID format"})
        
        result = await db.notes.delete_one( {"_id": object_id, "owner_id": str(current_user["id"]) })
        if result.deleted_count == 0:
            return JSONResponse(status_code=400, content={"detail":"Note not found or unauthorized"})
        
        return {"message": "Note deleted successfully"}
    except Exception as error:
        raise HTTPException(status_code=500, detail="internal server error")