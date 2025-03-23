import { Bell } from "lucide-react";

const NotificationsSettings = ({ notifications, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="text-blue-600" size={24} />
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-gray-700 capitalize">
              {key.split(/(?=[A-Z])/).join(" ")}
            </label>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(key, e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSettings;
