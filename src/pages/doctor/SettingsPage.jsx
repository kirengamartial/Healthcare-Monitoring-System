import { useState, useEffect } from "react";
import { Bell, Shield, Monitor, Globe, Mail } from "lucide-react";
import { toast } from "react-hot-toast";
import authService from "../../services/authService";
import PreferencesSettings from "../../components/settings/PreferenceSettings";
import MonitoringSettings from "../../components/settings/MonitoringSettings";
import NotificationsSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";

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
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Notifications Settings */}
        <NotificationsSettings
          notifications={settings.notifications}
          onChange={(field, value) =>
            handleChange("notifications", field, value)
          }
        />

        {/* Monitoring Thresholds */}
        <MonitoringSettings
          monitoring={settings.monitoring}
          onChange={(field, value) => handleChange("monitoring", field, value)}
        />

        {/* Preferences */}
        <PreferencesSettings
          preferences={settings.preferences}
          onChange={(field, value) => handleChange("preferences", field, value)}
        />

        {/* Security Settings */}
        <SecuritySettings
          security={settings.security}
          onChange={(field, value) => handleChange("security", field, value)}
        />
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
    </>
  );
};

export default SettingsPage;
