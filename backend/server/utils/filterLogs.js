export function filterLogs(logs, filters) {
    return logs.filter((log) => {
        const {
            level,
            message,
            resourceId,
            traceId,
            spanId,
            commit,
            timestamp_start,
            timestamp_end,
        } = filters;

        return (
            (!level || log.level === level) &&
            (!message || log.message.toLowerCase().includes(message.toLowerCase())) &&
            (!resourceId || log.resourceId === resourceId) &&
            (!traceId || log.traceId === traceId) &&
            (!spanId || log.spanId === spanId) &&
            (!commit || log.commit === commit) &&
            (!timestamp_start || new Date(log.timestamp) >= new Date(timestamp_start)) &&
            (!timestamp_end || new Date(log.timestamp) <= new Date(timestamp_end))
        );
    });
}
