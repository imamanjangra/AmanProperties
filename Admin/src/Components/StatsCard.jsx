
export default function StatsCard({ title, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-sm">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-2xl font-semibold text-white mt-2">{value}</h3>
    </div>
  );
}
