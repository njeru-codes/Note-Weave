from fastapi import Request, HTTPException, status
from .token import verify_access_token


def get_token_from_cookie(request: Request, cookie_name: str = "X-weaver-key") -> str:
    token = request.cookies.get(cookie_name)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated: Missing cookie token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token


async def  get_current_user(request: Request):
    token = get_token_from_cookie(request)
    user = verify_access_token(token)
    return user