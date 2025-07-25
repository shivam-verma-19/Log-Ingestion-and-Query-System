# 🧰 Log Ingestion and Querying System

A full-stack developer assignment built with **Node.js + Express** (backend) and **React + Vite** (frontend). This app allows structured log ingestion, filtering, search, and real-time updates with charting — all persisted in a local JSON file.

---

## 🚀 Features

✅ Log ingestion via REST API  
✅ Full-text and multi-field filtering (level, resourceId, timestamp, etc.)  
✅ Reverse-chronological sorting  
✅ Real-time updates via WebSocket  
✅ Chart of log levels using Recharts  
✅ Fully Dockerized for local dev or deployment

---

## 📦 Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Backend     | Node.js, Express, Zod, Socket.IO        |
| Frontend    | React, Vite, Socket.IO Client, Recharts |
| Persistence | JSON file (`logs.json`)                 |
| DevOps      | Docker, Docker Compose                  |

---

## 📁 Folder Structure

```
project-root/
├── backend/
│   ├── routes/
|   |──── logs.js
│   ├── db/logs.json
│   ├── server/utils
│   ├────── filterLogs.js
│   ├────── filterLogs.test.js
|   |──── jest.config.js
│   ├── server.js
│   ├── Dockerfile
├── frontend/
│   ├── src/components/
│   ├── App.jsx, main.jsx, index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── Dockerfile
├── docker-compose.yml
├── README.md
```

---

## 🔧 Getting Started (Locally with Docker)

### 1. Clone the Repo

```bash
git clone <your-repo-url>
cd project-root
```

### 2. Start the App

```bash
docker-compose up --build
```

### 3. Access the UI

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001/api/logs](http://localhost:3001/api/logs)

---

## 🧪 API Reference

### POST `/api/logs`

Ingests a single log entry

```json
{
  "level": "error",
  "message": "Database failed",
  "resourceId": "server-1",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": { "parentResourceId": "server-5678" }
}
```

### GET `/api/logs`

Retrieves logs with optional filters:

- `level`, `message`, `resourceId`, `traceId`, `spanId`, `commit`
- `timestamp_start`, `timestamp_end`

Example:

```
GET /api/logs?level=error&resourceId=server-1
```

---

## 📊 Frontend UI Overview

| Component  | Description                              |
| ---------- | ---------------------------------------- |
| Filter Bar | Filter by message, level, resource, time |
| Log List   | Logs with severity color-coding          |
| Analytics  | Bar chart of log level distribution      |
| Real-Time  | Auto updates when new logs are posted    |

---

## 🐳 Docker Summary

### Build and Run All Services

```bash
docker-compose up --build
```

### Individual Services

```bash
docker-compose build backend
```

---

## 🔐 Notes

- No external DB used (file-based persistence only)
- All filtering is in-memory using JS Array methods
- No authentication or authorization in this version

---

### ✅ Unit Tests

- Jest tests added for backend log filtering logic.
- Run tests with:

```bash
cd server
npm test
```

## ✅ Bonus Features Implemented

- [x] Real-time WebSocket log updates
- [x] Log analytics chart
- [x] Full Docker + Compose setup
- [x] Unit Test Cases

---

## 📃 License

ISC License
