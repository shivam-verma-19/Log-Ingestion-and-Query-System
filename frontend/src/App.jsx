import React, { useEffect, useState } from "react";
import LogFilters from "./components/LogFilters.jsx";
import LogTable from "./components/Logtable.jsx";
import LogChart from "./components/LogChart";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const App = () => {
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchLogs = async (filterQuery = {}) => {
        const queryParams = new URLSearchParams(filterQuery).toString();
        const res = await fetch(`http://localhost:3001/api/logs?${queryParams}`);
        const data = await res.json();
        setLogs(data);
    };

    useEffect(() => {
        fetchLogs(filters);
    }, [filters]);

    useEffect(() => {
        socket.on("new-log", () => {
            fetchLogs(filters);
        });
        return () => socket.disconnect();
    }, [filters]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Log Viewer</h1>
            <LogFilters onFilterChange={setFilters} />
            <LogChart logs={logs} />
            <LogTable logs={logs} />
        </div>
    );
};

export default App;
