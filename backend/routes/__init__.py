from fastapi import APIRouter
from .notes import router as notes_router
from .users import router as users_router



router = APIRouter()


router.include_router(notes_router)
router.include_router(users_router)