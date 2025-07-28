import { useEffect, useState } from "react";
import LogFilters from "./components/LogFilters.jsx";
import LogTable from "./components/LogTable.jsx";
import LogChart from "./components/LogChart.jsx";
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
        const handleNewLog = () => {
            fetchLogs(filters);
        };

        socket.on("new_log", handleNewLog);
        return () => socket.off("new_log", handleNewLog);
    }, [filters]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-10">

                {/* Title */}
                <div className="flex items-center space-x-4 mb-6">
                    <img src="/bar-chart.png" alt="Chart Icon" className="w-10 h-10" />
                    <h1 className="text-3xl font-extrabold text-gray-800">Log Viewer Dashboard</h1>
                </div>


                {/* Filters */}
                <section>
                    <LogFilters onFilterChange={setFilters} />
                </section>

                {/* Chart */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span role="img" aria-label="chart">📊</span> Log Level Distribution
                    </h2>
                    <LogChart logs={logs} />
                </section>

                {/* Logs */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span role="img" aria-label="log">📋</span> Log Results
                    </h2>
                    <LogTable logs={logs} />
                </section>

            </div>
        </div>
    );
};

export default App;
