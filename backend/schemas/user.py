from pydantic import BaseModel, EmailStr, Field, ValidationError, model_validator


class User(BaseModel):
    email: EmailStr
    password: str =Field( ..., min_length=8)


class LoginUser(User):
    pass


class RegisterUser(User):
    confirm_password: str = Field(..., min_length=8)

    @model_validator(mode='after')
    def passwords_match(cls, values):
        if values.password != values.confirm_password:
            raise ValueError('Passwords do not match')
        return values
    

class RegisterResponse(BaseModel):
    email: EmailStr
    message: str