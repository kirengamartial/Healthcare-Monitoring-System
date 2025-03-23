import { useState, useEffect } from "react";
import { Bell, Shield, Monitor, Globe, Mail } from "lucide-react";
import { toast } from "react-hot-toast";
import authService from "../services/authService";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      criticalAlerts: true,
      patientUpdates: true,
      emailNotifications: false,
      dailyReports: true,
    },
    monitoring: {
      heartRateThreshold: "100",
      bloodPressureUpperThreshold: "140",
      bloodPressureLowerThreshold: "90",
      temperatureThreshold: "101",
      glucoseUpperThreshold: "180",
      glucoseLowerThreshold: "70",
    },
    preferences: {
      language: "en",
      theme: "light",
      timeFormat: "12h",
      dateFormat: "MM/DD/YYYY",
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      autoLogout: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const user = authService.getUser();

  const handleChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Simulated API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Notifications Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-blue-600" size={24} />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-gray-700">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </label>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    handleChange("notifications", key, e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring Thresholds */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="text-blue-600" size={24} />
            <h2 className="text-lg font-semibold">Monitoring Thresholds</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.monitoring).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm text-gray-700 mb-1">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleChange("monitoring", key, e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-blue-600" size={24} />
            <h2 className="text-lg font-semibold">Preferences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) =>
                  handleChange("preferences", "language", e.target.value)
                }
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
                value={settings.preferences.theme}
                onChange={(e) =>
                  handleChange("preferences", "theme", e.target.value)
                }
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
                value={settings.preferences.timeFormat}
                onChange={(e) =>
                  handleChange("preferences", "timeFormat", e.target.value)
                }
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
                value={settings.preferences.dateFormat}
                onChange={(e) =>
                  handleChange("preferences", "dateFormat", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-blue-600" size={24} />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Two-factor Authentication</label>
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) =>
                  handleChange("security", "twoFactorAuth", e.target.checked)
                }
                className="w-4 h-4 text-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  handleChange("security", "sessionTimeout", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700">Auto Logout on Inactivity</label>
              <input
                type="checkbox"
                checked={settings.security.autoLogout}
                onChange={(e) =>
                  handleChange("security", "autoLogout", e.target.checked)
                }
                className="w-4 h-4 text-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
