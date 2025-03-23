import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlyAdmissions = () => {
  const admissionData = [
    { month: "Jan", count: 45 },
    { month: "Feb", count: 52 },
    { month: "Mar", count: 48 },
    { month: "Apr", count: 58 },
    { month: "May", count: 50 },
    { month: "Jun", count: 55 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Monthly Admissions
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={admissionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyAdmissions;
