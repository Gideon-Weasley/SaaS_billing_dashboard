from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.usage import router as usage_router
from app.routes.invoices import router as invoices_router
from app.services.scheduler import start_scheduler
from app.services.billing_service import router as billing_router
from app.routes.unsubscribe import router as unsubscribe_router
from fastapi import WebSocket, WebSocketDisconnect
from app.ws.usage_ws import manager

from app.routes.auth import router as auth_router
app = FastAPI(title="SaaS Usage & Billing Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usage_router)
app.include_router(invoices_router)
app.include_router(billing_router)
app.include_router(unsubscribe_router)
app.include_router(auth_router)
start_scheduler()


@app.get("/")
def root():
    return {
        "status": "running",
        "service": "SaaS Billing Backend"
    }

@app.websocket("/ws/usage")
async def usage_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            message = await websocket.receive()
            if message["type"] == "websocket.disconnect":
                break
    finally:
        manager.disconnect(websocket)



