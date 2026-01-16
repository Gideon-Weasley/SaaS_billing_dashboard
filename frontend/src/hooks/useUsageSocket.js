import { useEffect } from "react";

export default function useUsageSocket(onMessage) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/usage");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    return () => {
      socket.close();
    };
  }, [onMessage]);
}
