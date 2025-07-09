import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

const LogChart = ({ logs }) => {
    const counts = logs.reduce((acc, log) => {
        acc[log.level] = (acc[log.level] || 0) + 1;
        return acc;
    }, {});

    const data = ["error", "warn", "info", "debug"].map((level) => ({
        level,
        count: counts[level] || 0
    }));

    return (
        <div className="my-6 p-4 bg-blue-50 rounded-md shadow">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="level" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#4299e1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LogChart;
