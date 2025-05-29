from fastapi import Request, HTTPException, status
from .token import verify_access_token


def get_token_from_header(request: Request, header_name: str = "X-weaver-key") -> str:
    token = request.headers.get(header_name)
    if not token:
        print("failed to auth")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated: Missing token in headers",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token


async def get_current_user(request: Request):
    token = get_token_from_header(request)
    user = verify_access_token(token)
    print("user passes test")
    return user
