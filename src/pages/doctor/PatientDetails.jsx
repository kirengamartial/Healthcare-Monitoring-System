import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Activity, Thermometer, Droplet } from 'lucide-react';
import { patientService } from '../../services/patientService';
import { toast } from 'react-hot-toast';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vitals, setVitals] = useState({
    heartRate: '75',
    bloodPressureSystolic: '120',
    bloodPressureDiastolic: '80',
    temperature: '98.6',
    glucoseLevel: '100'
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const data = await patientService.getPatientById(id);
        setPatient(data);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch patient details');
        navigate('/patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, navigate]);

  // Simulate updating vitals every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: Math.floor(70 + Math.random() * 20).toString(),
        bloodPressureSystolic: Math.floor(110 + Math.random() * 30).toString(),
        bloodPressureDiastolic: Math.floor(70 + Math.random() * 20).toString(),
        temperature: (97 + Math.random() * 3).toFixed(1),
        glucoseLevel: Math.floor(90 + Math.random() * 30).toString()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient) {
    return <div className="p-8 text-center text-gray-500">Patient not found</div>;
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
            <p className="text-gray-500">Patient ID: {patient._id}</p>
          </div>
          <span className={`ml-auto px-4 py-2 rounded-full text-sm ${
            patient.status === 'Critical' 
              ? 'bg-red-100 text-red-600' 
              : patient.status === 'Recovery'
              ? 'bg-yellow-100 text-yellow-600'
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
              { label: 'Contact', value: patient.contact },
              { label: 'Email', value: patient.email },
              { label: 'Doctor', value: patient.doctor },
              { label: 'Last Visit', value: new Date(patient.lastVisit).toLocaleDateString() }
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

      {/* Back to Patients Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/patients')}
          className="px-4 py-2 text-blue-600 hover:text-blue-700"
        >
          ← Back to Patients List
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;