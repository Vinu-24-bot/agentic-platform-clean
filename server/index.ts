import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

// ⭐ WebSocket Server
import { WebSocketServer } from "ws";

const app = express();
const httpServer = createServer(app);

// Extend Node IncomingMessage
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Logger utility
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

// ------------------------------------------
// ⭐ REALTIME WEBSOCKET SERVER
// ------------------------------------------

const wss = new WebSocketServer({
  server: httpServer,
  path: "/realtime", // Important: avoids conflict with Vite WS
});

interface ClientInfo {
  id: string;
  ws: any;
}

const clients: Record<string, ClientInfo> = {};

function broadcast(obj: any) {
  const msg = JSON.stringify(obj);
  Object.values(clients).forEach((c) => {
    try {
      c.ws.send(msg);
    } catch (_) {}
  });
}

wss.on("connection", (ws) => {
  const id = Math.random().toString(36).substring(2, 10);

  clients[id] = { id, ws };

  broadcast({ type: "user-join", id });

  ws.send(
    JSON.stringify({
      type: "init",
      clients: Object.keys(clients),
    })
  );

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());

      if (msg.type === "cursor-move") {
        broadcast({
          type: "cursor-update",
          id,
          x: msg.x,
          y: msg.y,
        });
      }
    } catch (err) {
      console.error("WS error:", err);
    }
  });

  ws.on("close", () => {
    delete clients[id];
    broadcast({ type: "user-leave", id });
  });
});

// ------------------------------------------
// MAIN SERVER ENTRY
// ------------------------------------------
(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Static vs DEV
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // PORT from Render
  const port = parseInt(process.env.PORT || "5000", 10);

  // ⭐ FIX FOR RENDER → MUST bind to 0.0.0.0 (NOT 127.0.0.1)
  httpServer.listen(
    {
      port,
      host: "0.0.0.0", // REQUIRED for Render deployment
      reusePort: false,
    },
    () => {
      log(`serving on http://0.0.0.0:${port}`);
      console.log("🌐 WebSocket server: READY");
    }
  );
})();
