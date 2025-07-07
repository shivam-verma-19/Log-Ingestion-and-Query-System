import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import logsRoutes from "./routes/logs.js";
import fs from "fs/promises";
import path from "path";

const app = express();
const server = createServer(app);

// ✅ WebSocket setup with CORS
const io = new Server(server, {
  cors: {
    origin: "*", // change to specific domain if deployed
    methods: ["GET", "POST"]
  }
});

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Inject io into all incoming requests (so routes can use req.io.emit)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Routes
app.use("/api", logsRoutes);

// ✅ Health check endpoint
app.get("/", (req, res) => res.send("Log Ingestion API Running"));

// ✅ Create logs.json file if it doesn't exist
const ensureLogFile = async () => {
  const filePath = path.join("db", "logs.json");
  try {
    await fs.mkdir("db", { recursive: true });
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]");
  }
};

// ✅ Socket.IO connection event
io.on("connection", (socket) => {
  console.log("🟢 WebSocket connected");

  socket.on("disconnect", () => {
    console.log("🔴 WebSocket disconnected");
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
ensureLogFile().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
