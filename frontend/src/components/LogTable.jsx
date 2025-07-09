const levelColor = {
    error: "border-l-4 border-red-500 bg-red-50",
    warn: "border-l-4 border-yellow-400 bg-yellow-50",
    info: "border-l-4 border-blue-400 bg-blue-50",
    debug: "border-l-4 border-gray-400 bg-gray-50",
};

const LogTable = ({ logs }) => {
    return (
        <div className="space-y-4">
            {logs.map((log, idx) => (
                <div
                    key={idx}
                    className={`p-4 rounded-md border-l-4 shadow-sm ${levelColor[log.level]} transition duration-300`}
                >
                    <div className="font-semibold text-gray-800 mb-1">
                        <span className="uppercase">[{log.level}]</span>{" "}
                        {new Date(log.timestamp).toLocaleString()}
                    </div>
                    <p className="text-gray-700">{log.message}</p>
                    <div className="text-xs text-gray-500 mt-2">
                        Resource: {log.resourceId} | Trace: {log.traceId} | Commit: {log.commit}
                    </div>
                </div>
            ))}
        </div>

    );
};

export default LogTable;
