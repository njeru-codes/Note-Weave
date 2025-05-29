from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.responses import JSONResponse
from motor.motor_asyncio  import AsyncIOMotorDatabase 
from ..config.database import get_db
from ..schemas.user import LoginUser, RegisterUser, RegisterResponse
from ..utils.passwords import hash_password,verify_password
from ..utils.token import create_access_token


router = APIRouter(
    prefix="/auth",
    tags=["Users"]
)


@router.post('/login')
async def login_user(user: LoginUser, response: Response, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        existing_user = await db.users.find_one({"email": user.email})
        if not existing_user:
            return JSONResponse(status_code=400, content={"status_code": 400})
        if not verify_password(user.password, existing_user["password"]):
            return JSONResponse(status_code=400, content={"status_code": 400})
        user_data ={"id": str(existing_user["_id"]), }
        access_token = create_access_token(user_data)
        
        return JSONResponse(
            status_code=200,
            content ={"message": "Login successful", "X-weaver-key": access_token},
            headers={"X-weaver-key": access_token}
        )
    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail="internal server error")
    

@router.post("/register", response_model=RegisterResponse)
async def register_new_user(user: RegisterUser, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        user_dict = user.model_dump(exclude={"confirm_password"})

        hashed_password = hash_password(user_dict["password"])
        user_dict["password"] = hashed_password

        existing_user = await db.users.find_one({"email": user_dict["email"]})
        if existing_user:
            return JSONResponse(status_code=400, content={"status_code": 400})
        await db.users.insert_one(user_dict)

        return RegisterResponse(email=user.email, message="account created")
    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail="internal server error")