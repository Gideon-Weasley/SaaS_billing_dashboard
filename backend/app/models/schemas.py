from pydantic import BaseModel
from datetime import datetime

class UsageCreate(BaseModel):
    units_used: int

class UsageSummary(BaseModel):
    month: str
    total_units: int

class ManualBillingRequest(BaseModel):
    user_id: int

class UnsubscribeRequest(BaseModel):
    user_id: int
    reason: str