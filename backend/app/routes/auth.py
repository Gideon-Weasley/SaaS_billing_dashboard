from fastapi import APIRouter, HTTPException
from app.models.schemas import RegisterUser
from app.utils.security import verify_password
from app.db.session import get_db_connection
from app.utils.security import hash_password
from app.models.schemas import Authentication
router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register(user: RegisterUser):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT id FROM users WHERE email = %s",
        (user.email,)
    )
    if cur.fetchone():
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail="User already exists")

    password_hash = hash_password(user.password)

    cur.execute(
        """
        INSERT INTO users (email,plan_id, password_hash)
        VALUES (%s, %s, %s)
        RETURNING id
        """,
        (user.email, user.plan_id, password_hash)
    )

    user_id = cur.fetchone()["id"]
    conn.commit()
    cur.close()
    conn.close()

    return {"message": "User created", "user_id": user_id}


@router.post("/login")
def login(details: Authentication):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT id, password_hash FROM users WHERE email = %s",
        (details.email,)
    )
    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(details.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user_id": user["id"]
    }
