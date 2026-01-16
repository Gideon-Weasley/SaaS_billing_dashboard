from pydantic import BaseModel, EmailStr
from datetime import datetime

class UsageCreate(BaseModel):
    u_id:int
    units_used: int

class UsageSummary(BaseModel):
    month: str
    total_units: int

class ManualBillingRequest(BaseModel):
    user_id: int

class UnsubscribeRequest(BaseModel):
    user_id: int
    reason: str

class Authentication(BaseModel):
    email: EmailStr
    password: str

class RegisterUser(BaseModel):
    email: EmailStr
    password: str
    plan_id: int