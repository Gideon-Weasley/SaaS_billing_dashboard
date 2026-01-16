from fastapi import APIRouter, WebSocket
from app.ws_manager import connect, disconnect

router = APIRouter()

@router.websocket("/ws/usage")
async def usage_socket(websocket: WebSocket):
    await connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        disconnect(websocket)
