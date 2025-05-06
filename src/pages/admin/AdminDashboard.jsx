import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Activity, Stethoscope, HeartPulse, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    doctors: 0,
    nurses: 0,
    patients: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      totalUsers: 10,
      activeUsers: 10,
      inactiveUsers: 1,
      doctors: 3,
      nurses: 2,
      patients: 4
    });

    // Simulate fetching recent activities
    setRecentActivities([
      { id: 1, action: 'User Registration', user: 'John Doe', role: 'Patient', timestamp: '2023-11-15T14:32:00Z' },
      { id: 2, action: 'User Banned', user: 'Jane Smith', role: 'Patient', timestamp: '2023-11-15T13:45:00Z' },
      { id: 3, action: 'User Updated', user: 'Dr. Michael Brown', role: 'Doctor', timestamp: '2023-11-15T12:18:00Z' },
      { id: 4, action: 'User Registration', user: 'Sarah Johnson', role: 'Nurse', timestamp: '2023-11-15T10:05:00Z' },
      { id: 5, action: 'User Unbanned', user: 'Robert Wilson', role: 'Patient', timestamp: '2023-11-15T09:22:00Z' },
    ]);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <UserCheck className="h-4 w-4 text-green-500" />
              <span>{stats.activeUsers} Active</span>
            </div>
            <div className="flex items-center gap-1">
              <UserX className="h-4 w-4 text-red-500" />
              <span>{stats.inactiveUsers} Inactive</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Doctors</p>
              <p className="text-2xl font-semibold">{stats.doctors}</p>
            </div>
          </div>
         
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <HeartPulse className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nurses</p>
              <p className="text-2xl font-semibold">{stats.nurses}</p>
            </div>
          </div>
         
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <UserCog className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Patients</p>
              <p className="text-2xl font-semibold">{stats.patients}</p>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Action</th>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span>{activity.action}</span>
                    </div>
                  </td>
                  <td className="py-3">{activity.user}</td>
                  <td className="py-3">{activity.role}</td>
                  <td className="py-3 text-gray-500">{formatDate(activity.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
