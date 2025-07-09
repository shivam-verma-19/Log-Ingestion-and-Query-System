import { useState } from "react";

const LogFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({});

    const update = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <input type="text" placeholder="Search message..." className="p-2 border rounded w-full"
                    onChange={(e) => update("message", e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <select className="p-2 border rounded w-full" onChange={(e) => update("level", e.target.value)}>
                    <option value="">All Levels</option>
                    <option value="error">Error</option>
                    <option value="warn">Warn</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Resource ID</label>
                <input type="text" placeholder="Resource ID" className="p-2 border rounded w-full"
                    onChange={(e) => update("resourceId", e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input type="datetime-local" className="p-2 border rounded w-full"
                    onChange={(e) => update("timestamp_start", e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input type="datetime-local" className="p-2 border rounded w-full"
                    onChange={(e) => update("timestamp_end", e.target.value)} />
            </div>
        </div>

    );
};

export default LogFilters;
