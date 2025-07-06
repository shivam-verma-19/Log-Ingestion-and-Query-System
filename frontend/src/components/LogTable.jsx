import React from "react";

const levelColor = {
    error: "border-l-4 border-red-500 bg-red-50",
    warn: "border-l-4 border-yellow-400 bg-yellow-50",
    info: "border-l-4 border-blue-400 bg-blue-50",
    debug: "border-l-4 border-gray-400 bg-gray-50",
};

const LogTable = ({ logs }) => {
    return (
        <div className="space-y-2">
            {logs.map((log, idx) => (
                <div key={idx} className={`p-4 rounded ${levelColor[log.level] || ""}`}>
                    <div className="font-bold">[{log.level.toUpperCase()}] {log.timestamp}</div>
                    <div className="text-sm">{log.message}</div>
                    <div className="text-xs text-gray-600 mt-1">
                        Resource: {log.resourceId} | Trace: {log.traceId} | Commit: {log.commit}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LogTable;
