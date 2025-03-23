import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VitalSignsTrends = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Vital Signs Trends
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="time" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="#EF4444"
            name="Heart Rate"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3B82F6"
            name="Temperature"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalSignsTrends;
