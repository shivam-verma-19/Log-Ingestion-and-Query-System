import { useState } from "react";

const LogFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({});

    const update = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input type="text" placeholder="Search message..." className="p-2 border rounded"
                onChange={(e) => update("message", e.target.value)} />

            <select className="p-2 border rounded" onChange={(e) => update("level", e.target.value)}>
                <option value="">All Levels</option>
                <option value="error">Error</option>
                <option value="warn">Warn</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
            </select>

            <input type="text" placeholder="Resource ID" className="p-2 border rounded"
                onChange={(e) => update("resourceId", e.target.value)} />

            <input type="datetime-local" className="p-2 border rounded"
                onChange={(e) => update("timestamp_start", e.target.value)} />

            <input type="datetime-local" className="p-2 border rounded"
                onChange={(e) => update("timestamp_end", e.target.value)} />
        </div>
    );
};

export default LogFilters;
