import { Monitor } from "lucide-react";

const MonitoringSettings = ({ monitoring, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Monitor className="text-blue-600" size={24} />
        <h2 className="text-lg font-semibold">Monitoring Thresholds</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(monitoring).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm text-gray-700 mb-1 capitalize">
              {key.split(/(?=[A-Z])/).join(" ")}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonitoringSettings;
