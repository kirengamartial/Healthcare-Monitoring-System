import React, { useState, useEffect } from 'react';
import StatsGrid from '../components/dashboard/StatsGrid';
import HeartRateChart from '../components/dashboard/HeartRateChart';
import PatientDistribution from '../components/dashboard/PatientDistribution';
import RecentPatients from '../components/dashboard/RecentPatients';
import { generateHealthData, generateTimeSeriesData } from '../utils/healthDataGenerator';

const Dashboard = () => {
  const [vitals, setVitals] = useState(generateHealthData());
  const [heartRateData, setHeartRateData] = useState(generateTimeSeriesData());
  
  const patientDistribution = [
    { name: 'Critical', value: 15, color: '#EF4444' },
    { name: 'Stable', value: 45, color: '#10B981' },
    { name: 'Recovery', value: 40, color: '#3B82F6' }
  ];

  const patients = [
    { id: 1, name: "Sarah Johnson", status: "Critical", time: "10:30 AM" },
    { id: 2, name: "Michael Brown", status: "Stable", time: "11:45 AM" },
  ];

  useEffect(() => {
    // Update vitals every 3 seconds
    const vitalsInterval = setInterval(() => {
      setVitals(generateHealthData());
    }, 3000);

    // Update chart data every 10 seconds
    const chartInterval = setInterval(() => {
      setHeartRateData(generateTimeSeriesData());
    }, 3000);

    return () => {
      clearInterval(vitalsInterval);
      clearInterval(chartInterval);
    };
  }, []);

  return (
    <div>
      <StatsGrid vitals={vitals} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <HeartRateChart data={heartRateData} />
        <PatientDistribution data={patientDistribution} />
      </div>

      <RecentPatients patients={patients} />
    </div>
  );
};

export default Dashboard;