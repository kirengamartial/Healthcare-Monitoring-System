import { Shield } from "lucide-react";

const SecuritySettings = ({ security, onChange }) => {
  return (
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
            checked={security.twoFactorAuth}
            onChange={(e) => onChange("twoFactorAuth", e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={security.sessionTimeout}
            onChange={(e) => onChange("sessionTimeout", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Auto Logout on Inactivity</label>
          <input
            type="checkbox"
            checked={security.autoLogout}
            onChange={(e) => onChange("autoLogout", e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
