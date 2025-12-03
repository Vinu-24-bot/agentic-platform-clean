// client/src/components/LiveCursors.tsx

import React from "react";
import { usePresence } from "@/hooks/usePresence";

// Random color for each user cursor
function getColor(id: string) {
  const colors = [
    "#ff6b6b",
    "#6bc5ff",
    "#ffd36b",
    "#9d6bff",
    "#6bff85",
    "#ff6bea",
  ];
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return colors[sum % colors.length];
}

export default function LiveCursors() {
  const { remoteCursors } = usePresence();

  return (
    <>
      {Object.values(remoteCursors).map((cursor) => (
        <div
          key={cursor.id}
          style={{
            position: "fixed",
            left: cursor.x + 10,
            top: cursor.y + 10,
            zIndex: 9999,
            pointerEvents: "none",
            transition: "transform 0.05s linear",
          }}
        >
          {/* Cursor Dot */}
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: getColor(cursor.id),
              boxShadow: "0 0 8px rgba(0,0,0,0.3)",
            }}
          />

          {/* Label */}
          <div
            style={{
              marginTop: 3,
              padding: "2px 6px",
              borderRadius: 6,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: 10,
              fontWeight: "bold",
              backdropFilter: "blur(4px)",
              width: "max-content",
            }}
          >
            user-{cursor.id.slice(0, 4)}
          </div>
        </div>
      ))}
    </>
  );
}
