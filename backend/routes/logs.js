import express from "express";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

const router = express.Router();
const LOG_FILE = path.join("db", "logs.json");

const logSchema = z.object({
    level: z.enum(["error", "warn", "info", "debug"]),
    message: z.string(),
    resourceId: z.string(),
    timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid timestamp"),
    traceId: z.string(),
    spanId: z.string(),
    commit: z.string(),
    metadata: z.record(z.any())
});

async function readLogs() {
    try {
        const data = await fs.readFile(LOG_FILE, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeLogs(logs) {
    await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
}

router.post("/logs", async (req, res) => {
    const parsed = logSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid log format", details: parsed.error.errors });
    }

    const logs = await readLogs();
    const newLog = parsed.data;
    logs.push(newLog);
    await writeLogs(logs);

    if (req.io) {
        req.io.emit("new-log", newLog);
    }

    res.status(201).json(newLog);
});

router.get("/logs", async (req, res) => {
    try {
        let logs = await readLogs();
        const {
            level, message, resourceId, timestamp_start, timestamp_end,
            traceId, spanId, commit
        } = req.query;

        if (level) logs = logs.filter(log => log.level === level);
        if (message) logs = logs.filter(log => log.message.toLowerCase().includes(message.toLowerCase()));
        if (resourceId) logs = logs.filter(log => log.resourceId === resourceId);
        if (traceId) logs = logs.filter(log => log.traceId === traceId);
        if (spanId) logs = logs.filter(log => log.spanId === spanId);
        if (commit) logs = logs.filter(log => log.commit === commit);
        if (timestamp_start) logs = logs.filter(log => new Date(log.timestamp) >= new Date(timestamp_start));
        if (timestamp_end) logs = logs.filter(log => new Date(log.timestamp) <= new Date(timestamp_end));

        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json(logs);
    } catch (e) {
        res.status(500).json({ error: "Failed to retrieve logs" });
    }
});

export default router;
