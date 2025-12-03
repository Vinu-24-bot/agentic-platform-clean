// client/src/hooks/usePresence.ts

import { useEffect, useRef, useState } from "react";

// Each connected user will have:
// id   → unique user id
// x,y  → cursor position
export interface RemoteCursor {
  id: string;
  x: number;
  y: number;
}

export function usePresence() {
  const wsRef = useRef<WebSocket | null>(null);

  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, RemoteCursor>>({});

  // Track local cursor position
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Connect to WS server
    const ws = new WebSocket(`wss://agentic-backend-d65p.onrender.com/realtime`);



    wsRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        // Initial presence list
        if (msg.type === "init") {
          setConnectedUsers(msg.clients);
        }

        // User joined
        if (msg.type === "user-join") {
          setConnectedUsers((prev) => [...prev, msg.id]);
        }

        // User left
        if (msg.type === "user-leave") {
          setConnectedUsers((prev) => prev.filter((id) => id !== msg.id));
          setRemoteCursors((prev) => {
            const updated = { ...prev };
            delete updated[msg.id];
            return updated;
          });
        }

        // Cursor update
        if (msg.type === "cursor-update") {
          setRemoteCursors((prev) => ({
            ...prev,
            [msg.id]: {
              id: msg.id,
              x: msg.x,
              y: msg.y,
            },
          }));
        }
      } catch (err) {
        console.error("WS message error", err);
      }
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket disconnected");
    };

    // Cleanup
    return () => {
      ws.close();
    };
  }, []);

  // Send cursor movement to server
  useEffect(() => {
    if (!wsRef.current) return;

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setCursor({ x, y });

      wsRef.current?.send(
        JSON.stringify({
          type: "cursor-move",
          x,
          y,
        })
      );
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return {
    connectedUsers,
    remoteCursors,
    cursor,
  };
}
