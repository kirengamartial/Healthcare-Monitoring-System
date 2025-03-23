import { Globe } from "lucide-react";

const PreferencesSettings = ({ preferences, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Globe className="text-blue-600" size={24} />
        <h2 className="text-lg font-semibold">Preferences</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Language</label>
          <select
            value={preferences.language}
            onChange={(e) => onChange("language", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Theme</label>
          <select
            value={preferences.theme}
            onChange={(e) => onChange("theme", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Time Format
          </label>
          <select
            value={preferences.timeFormat}
            onChange={(e) => onChange("timeFormat", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="12h">12-hour</option>
            <option value="24h">24-hour</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Date Format
          </label>
          <select
            value={preferences.dateFormat}
            onChange={(e) => onChange("dateFormat", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;
