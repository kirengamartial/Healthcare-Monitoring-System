import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";

const DoctorSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/doctor/dashboard" },
    { name: "Patients", icon: Users, path: "/doctor/patients" },
    { name: "Analytics", icon: BarChart, path: "/doctor/analytics" },
    { name: "Calendar", icon: Calendar, path: "/doctor/calendar" },
    { name: "Settings", icon: Settings, path: "/doctor/settings" },
  ];

  return (
    <div className="w-16 lg:w-64 bg-white shadow-lg">
      <div className="p-6">
        <Link to='/' className=" hidden lg:flex text-2xl font-bold text-blue-600">
          HealthMonitor
        </Link>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              location.pathname === item.path &&
              "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
            }`}
          >
            <item.icon size={20} />
            <span className="hidden lg:flex">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t">
        <button className="w-full flex items-center gap-3 text-gray-600 hover:text-red-600">
          <LogOut size={20} />
          <span className="hidden lg:flex">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
