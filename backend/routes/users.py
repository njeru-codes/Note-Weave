from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.responses import JSONResponse, RedirectResponse
from motor.motor_asyncio  import AsyncIOMotorDatabase 
from ..config.database import get_db
from ..schemas.user import LoginUser, RegisterUser, RegisterResponse
from ..schemas.token import GoogleToken
from ..utils.passwords import hash_password,verify_password
from ..utils.token import create_access_token
from ..config.config import settings
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import requests




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
    

@router.get('/google')
async def google_login():
    google_client_id = settings.GOOGLE_CLIENT_ID
    redirect_uri = settings.REDIRECT_URI
    auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        "?response_type=code"
        f"&client_id={google_client_id}"
        f"&redirect_uri={redirect_uri}"
        "&scope=profile email openid"
        "&access_type=offline"
        "&prompt=consent"
    )
    return JSONResponse(
        status_code=200,
        content={"redirect_url": auth_url}
    )


@router.post("/google/callback")
async def google_callback(response: Response, token: GoogleToken, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        redirect_uri = settings.REDIRECT_URI

        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            "code": token.credential,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        }

        token_response = requests.post(token_url, data=token_data)
        token_response.raise_for_status()  # Raise an error for bad status codes
        token_json = token_response.json()

        if "error" in token_json:
            raise HTTPException(status_code=400, detail=f"Failed to exchange code: {token_json['error']}")

        # Step 2: Extract and verify the ID token
        id_token_str = token_json.get("id_token")
        if not id_token_str:
            raise HTTPException(status_code=400, detail="No ID token in token response")

        id_info = id_token.verify_oauth2_token(
            id_token_str,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )

        # Step 3: Extract user info
        email = id_info.get("email")
        name = id_info.get("name")
        google_id = id_info.get("sub")

        # Step 4: Check if user exists or create new user
        existing_user = await db.users.find_one({"email": email})
        if not existing_user:
            user_data = {
                "email": email,
                "name": name,
                "google_id": google_id,
                "password": hash_password("google-auth"),
            }
            result = await db.users.insert_one(user_data)
            user_id = str(result.inserted_id)
        else:
            user_id = str(existing_user["_id"])

        # Step 5: Create custom JWT token
        access_token = create_access_token({"id": user_id, "email": email})

        return JSONResponse(
            status_code=200,
            content={"message": "Login successful with Google", "X-weaver-key": access_token},
            headers={"X-weaver-key": access_token}
        )

    except ValueError as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid Google token")
    except requests.RequestException as e:
        print(e)
        raise HTTPException(status_code=400, detail=f"Failed to exchange code: {str(e)}")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")


