import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import API from "../Services/API";

function StatCard({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-2xl shadow-lg">
      <p className="text-sm text-gray-200">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/user/status");
        setStats(data);
      } catch (err) {
        console.error("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatMonthly = (data = []) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months.map((month, index) => {
      const found = data.find((item) => item._id === index + 1);
      return {
        name: month,
        value: found ? found.total : 0,
      };
    });
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!stats) return <div className="p-6 text-red-500">Failed to load data</div>;

  // Convert object to array for Pie chart & list
  const verifiedList = Object.entries(stats.verifiedPropertiesByType || {}).map(
    ([key, value]) => ({ _id: key, count: value })
  );

  const verifiedTotal = stats.totalVerifiedProperties || 0;

  const COLORS = ["#9333ea", "#a855f7", "#c084fc", "#d8b4fe"];

  return (
    <div className="p-4 md:p-6 bg-gray-950 min-h-screen text-white space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUser || 0} />
        <StatCard title="Total Properties" value={stats.totalProperty || 0} />
        <StatCard title="Contact Requests" value={stats.totalContactForm || 0} />
        <StatCard title="Verified Properties" value={verifiedTotal} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Property Growth</h2>
          <ResponsiveContainer height={250}>
            <BarChart data={formatMonthly(stats.monthlyProperty)}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="mb-4 text-lg font-semibold">User Growth</h2>
          <ResponsiveContainer height={250}>
            <BarChart data={formatMonthly(stats.monthlyUser)}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Contact Requests</h2>
          <ResponsiveContainer height={250}>
            <BarChart data={formatMonthly(stats.monthlyContactForm)}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#c084fc" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Verified Property Types</h2>
          {verifiedList.length === 0 ? (
            <p className="text-gray-400">No data</p>
          ) : (
            <ResponsiveContainer height={250}>
              <PieChart>
                <Pie
                  data={verifiedList}
                  dataKey="count"
                  nameKey="_id"
                  outerRadius={90}
                  label
                >
                  {verifiedList.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Verified Breakdown */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h2 className="mb-4 text-lg font-semibold">Verified Property Breakdown</h2>
        {verifiedList.length === 0 ? (
          <p className="text-gray-400">No verified properties</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {verifiedList.map((item, i) => (
              <div key={i} className="bg-purple-700/20 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-300">{item._id}</p>
                <h3 className="text-xl font-bold">{item.count}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}