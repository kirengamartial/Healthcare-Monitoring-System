import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  LayoutDashboard, Heart, Activity, Droplet, Users, 
  Settings, LogOut, Bell, Calendar, Search,
  BarChart, Clock, Thermometer
} from 'lucide-react';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const vitals = {
    heartRate: 75,
    bloodPressure: "120/80",
    temperature: 98.6,
    glucose: 95,
    oxygenLevel: 98
  };

  const patients = [
    { id: 1, name: "Sarah Johnson", status: "Critical", time: "10:30 AM" },
    { id: 2, name: "Mike Peters", status: "Stable", time: "11:45 AM" },
    { id: 3, name: "Emma Wilson", status: "Stable", time: "12:15 PM" },
  ];

  const heartRateData = [
    { time: '00:00', value: 72 },
    { time: '04:00', value: 68 },
    { time: '08:00', value: 75 },
    { time: '12:00', value: 82 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 71 }
  ];

  const patientDistribution = [
    { name: 'Critical', value: 15, color: '#EF4444' },
    { name: 'Stable', value: 45, color: '#10B981' },
    { name: 'Recovery', value: 40, color: '#3B82F6' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">HealthMonitor</h1>
        </div>
        
        <nav className="mt-6">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Patients', icon: Users },
            { name: 'Analytics', icon: BarChart },
            { name: 'Calendar', icon: Calendar },
            { name: 'Settings', icon: Settings }
          ].map(item => (
            <button
              key={item.name.toLowerCase()}
              onClick={() => setActiveNav(item.name.toLowerCase())}
              className={`w-full flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                activeNav === item.name.toLowerCase() ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button className="w-full flex items-center gap-3 text-gray-600 hover:text-red-600">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="text-gray-600" size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">DR</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Heart Rate', value: `${vitals.heartRate} BPM`, icon: Heart, color: 'red' },
              { title: 'Blood Pressure', value: vitals.bloodPressure, icon: Activity, color: 'blue' },
              { title: 'Temperature', value: `${vitals.temperature}°F`, icon: Thermometer, color: 'orange' },
              { title: 'Glucose Level', value: `${vitals.glucose} mg/dL`, icon: Droplet, color: 'purple' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                    <stat.icon className={`text-${stat.color}-500`} size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Heart Rate Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Heart Rate Monitoring</h3>
                <select className="border rounded-lg px-3 py-1 text-sm">
                  <option>Last 24 Hours</option>
                  <option>Last Week</option>
                  <option>Last Month</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Patient Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Distribution</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={patientDistribution}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {patientDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {patientDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
              <button className="text-blue-600 text-sm hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-4">Patient Name</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Last Update</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm text-gray-600">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium">{patient.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          patient.status === 'Critical' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="text-gray-500">{patient.time}</td>
                      <td>
                        <button className="text-blue-600 hover:text-blue-700">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;