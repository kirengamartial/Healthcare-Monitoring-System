import React from 'react';
import { Heart, Activity, Thermometer, Droplet } from 'lucide-react';

const StatsGrid = ({ vitals }) => {
  const stats = [
    { 
      title: 'Heart Rate', 
      value: `${vitals.heartRate} BPM`, 
      icon: Heart, 
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-500'
    },
    { 
      title: 'Blood Pressure', 
      value: `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`, 
      icon: Activity, 
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-500'
    },
    { 
      title: 'Temperature', 
      value: `${vitals.temperature}°F`, 
      icon: Thermometer, 
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-500'
    },
    { 
      title: 'Glucose Level', 
      value: `${vitals.glucoseLevel} mg/dL`, 
      icon: Droplet, 
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${stat.bgColor} rounded-lg`}>
              <stat.icon className={stat.textColor} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid