import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import logsRoutes from "./routes/logs.js";
import fs from "fs/promises";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

// Inject io into all requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API routes
app.use("/api", logsRoutes);

// Health check
app.get("/", (req, res) => res.send("Log Ingestion API Running"));

// Ensure db/logs.json exists
const ensureLogFile = async () => {
  const filePath = path.join("db", "logs.json");
  try {
    await fs.mkdir("db", { recursive: true });
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]");
  }
};

io.on("connection", (socket) => {
  console.log("🟢 WebSocket connected");
});

const PORT = process.env.PORT || 3001;
ensureLogFile().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
