import { filterLogs } from "./filterLogs.js";

const mockLogs = [
    {
        level: "error",
        message: "Database connection failed",
        resourceId: "db01",
        timestamp: "2025-07-01T10:00:00Z",
        traceId: "t1",
        spanId: "s1",
        commit: "c123",
        metadata: {},
    },
    {
        level: "info",
        message: "User logged in",
        resourceId: "auth-service",
        timestamp: "2025-07-02T12:00:00Z",
        traceId: "t2",
        spanId: "s2",
        commit: "c124",
        metadata: {},
    },
    {
        level: "warn",
        message: "Cache miss",
        resourceId: "cache-service",
        timestamp: "2025-07-03T15:00:00Z",
        traceId: "t3",
        spanId: "s3",
        commit: "c125",
        metadata: {},
    },
];

describe("filterLogs", () => {
    test("returns all logs when no filters are applied", () => {
        const result = filterLogs(mockLogs, {});
        expect(result).toHaveLength(3);
    });

    test("filters by level", () => {
        const result = filterLogs(mockLogs, { level: "error" });
        expect(result).toHaveLength(1);
        expect(result[0].level).toBe("error");
    });

    test("filters by message content (case-insensitive)", () => {
        const result = filterLogs(mockLogs, { message: "user" });
        expect(result).toHaveLength(1);
        expect(result[0].message).toContain("User");
    });

    test("filters by resourceId", () => {
        const result = filterLogs(mockLogs, { resourceId: "cache-service" });
        expect(result).toHaveLength(1);
        expect(result[0].resourceId).toBe("cache-service");
    });

    test("filters by traceId and spanId", () => {
        const result = filterLogs(mockLogs, { traceId: "t1", spanId: "s1" });
        expect(result).toHaveLength(1);
        expect(result[0].traceId).toBe("t1");
        expect(result[0].spanId).toBe("s1");
    });

    test("filters by commit", () => {
        const result = filterLogs(mockLogs, { commit: "c124" });
        expect(result).toHaveLength(1);
        expect(result[0].commit).toBe("c124");
    });

    test("filters by timestamp_start", () => {
        const result = filterLogs(mockLogs, { timestamp_start: "2025-07-02T00:00:00Z" });
        expect(result).toHaveLength(2);
    });

    test("filters by timestamp_end", () => {
        const result = filterLogs(mockLogs, { timestamp_end: "2025-07-02T00:00:00Z" });
        expect(result).toHaveLength(1);
    });

    test("filters by timestamp range", () => {
        const result = filterLogs(mockLogs, {
            timestamp_start: "2025-07-01T00:00:00Z",
            timestamp_end: "2025-07-02T23:59:59Z",
        });
        expect(result).toHaveLength(2);
    });

    test("filters by multiple fields combined", () => {
        const result = filterLogs(mockLogs, {
            level: "warn",
            message: "cache",
            resourceId: "cache-service",
        });
        expect(result).toHaveLength(1);
    });

    test("returns empty array if no log matches", () => {
        const result = filterLogs(mockLogs, {
            level: "debug",
            message: "something nonexistent",
        });
        expect(result).toHaveLength(0);
    });
});
