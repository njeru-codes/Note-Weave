from jose import jwt, JWTError
from ..config.config import settings
from datetime import datetime , timedelta
from fastapi import status, HTTPException


def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta( minutes=120 )
    to_encode.update( {"exp": expire } )
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm='HS256' )


def verify_access_token(token: str):
    credentials_exception = HTTPException(
        status_code= status.HTTP_401_UNAUTHORIZED,
        detail= "could not validate credentials", headers={"WWW-Authenticate": "Bearer "}
    )
    try:
        payload =jwt.decode(token, settings.SECRET_KEY )
        user_id:str = payload.get("id")
        if id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return {
        "id": user_id
    }