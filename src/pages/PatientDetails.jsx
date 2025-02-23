import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { generateHealthData, generateTimeSeriesData } from '../utils/healthDataGenerator';
import { Heart, Activity, Thermometer, Droplet } from 'lucide-react';
import HeartRateChart from '../components/dashboard/HeartRateChart';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [vitals, setVitals] = useState(generateHealthData());
  const [heartRateData, setHeartRateData] = useState(generateTimeSeriesData());

  // Simulate fetching patient data
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setPatient({
      id: parseInt(id),
      name: "Sarah Johnson",
      age: 45,
      gender: "Female",
      contact: "+1 234-567-8900",
      email: "sarah.j@email.com",
      status: "Critical",
      lastVisit: "2024-02-20",
      doctor: "Dr. Smith",
      bloodType: "A+",
      height: "5'6\"",
      weight: "140 lbs",
      allergies: "Penicillin",
      medications: ["Lisinopril", "Metformin"]
    });
  }, [id]);

  useEffect(() => {
    const vitalsInterval = setInterval(() => {
      setVitals(generateHealthData());
    }, 3000);

    const chartInterval = setInterval(() => {
      setHeartRateData(generateTimeSeriesData());
    }, 10000);

    return () => {
      clearInterval(vitalsInterval);
      clearInterval(chartInterval);
    };
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Patient Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xl text-blue-600 font-medium">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-500">Patient ID: {patient.id}</p>
          </div>
          <span className={`ml-auto px-4 py-2 rounded-full text-sm ${
            patient.status === 'Critical' 
              ? 'bg-red-100 text-red-600' 
              : 'bg-green-100 text-green-600'
          }`}>
            {patient.status}
          </span>
        </div>
      </div>

      {/* Patient Info and Vitals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Patient Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
          <div className="space-y-3">
            {[
              { label: 'Age', value: patient.age },
              { label: 'Gender', value: patient.gender },
              { label: 'Blood Type', value: patient.bloodType },
              { label: 'Height', value: patient.height },
              { label: 'Weight', value: patient.weight },
              { label: 'Contact', value: patient.contact },
              { label: 'Email', value: patient.email },
              { label: 'Doctor', value: patient.doctor }
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-500">{item.label}:</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Vitals */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                title: 'Heart Rate',
                value: `${vitals.heartRate} BPM`,
                icon: Heart,
                color: 'red'
              },
              { 
                title: 'Blood Pressure',
                value: `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`,
                icon: Activity,
                color: 'blue'
              },
              { 
                title: 'Temperature',
                value: `${vitals.temperature}°F`,
                icon: Thermometer,
                color: 'orange'
              },
              { 
                title: 'Glucose Level',
                value: `${vitals.glucoseLevel} mg/dL`,
                icon: Droplet,
                color: 'purple'
              }
            ].map((vital, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-${vital.color}-100`}>
                    <vital.icon className={`w-6 h-6 text-${vital.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{vital.title}</p>
                    <p className="text-lg font-semibold">{vital.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

 

      {/* Medical History - Now with better spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Medications</h2>
          <div className="space-y-4">
            {patient.medications.map((medication, index) => (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-700">{medication}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Allergies</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-700">{patient.allergies}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;