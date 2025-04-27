import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Search, Calendar, Activity, User, Users, Clock, FileText, 
  Clipboard, Bell, PieChart as PieChartIcon, Filter, RefreshCw 
} from 'lucide-react';
import patientService from '../../services/patientService';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [criticalCases, setCriticalCases] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [healthMetrics, setHealthMetrics] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [refreshRate, setRefreshRate] = useState('off');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate()

  // Patient diagnosis distribution data
  const diagnosisData = [
    { name: 'Cardiovascular', value: 0, color: '#EF4444' },
    { name: 'Respiratory', value: 0, color: '#3B82F6' },
    { name: 'Neurological', value: 0, color: '#8B5CF6' },
    { name: 'Gastrointestinal', value: 0, color: '#F59E0B' },
    { name: 'Orthopedic', value: 0, color: '#10B981' }
  ];

  // Load data from API
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatients(searchTerm);
      
      // Enrich patient data with mock health metrics
      const enrichedPatients = data.map(patient => ({
        ...patient,
        diagnosis: getRandomDiagnosis(),
        status: getRandomStatus(),
        healthData: generateMockHealthData(),
        lastChecked: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString(),
        nextAppointment: getRandomAppointmentDate()
      }));
      
      setPatients(enrichedPatients);
      setRecentPatients(enrichedPatients.slice(0, 3));
      
      // Calculate metrics
      setAppointmentsToday(Math.floor(Math.random() * 5) + 3);
      setPendingReviews(Math.floor(Math.random() * 8) + 2);
      setCriticalCases(enrichedPatients.filter(p => p.status === 'Critical').length);
      
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch patients');
      setLoading(false);
    }
  };

  // Mock functions to generate data
  const getRandomStatus = () => {
    const statuses = ['Critical', 'Attention', 'Stable', 'Recovery'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomDiagnosis = () => {
    const diagnoses = [
      'Cardiovascular', 'Respiratory', 'Neurological', 'Gastrointestinal', 'Orthopedic'
    ];
    return diagnoses[Math.floor(Math.random() * diagnoses.length)];
  };

  const getRandomAppointmentDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14));
    return futureDate.toISOString();
  };

  const generateMockHealthData = () => {
    return {
      heartRate: Math.floor(Math.random() * 50) + 50, // 50-100
      bloodPressure: {
        systolic: Math.floor(Math.random() * 40) + 100, // 100-140
        diastolic: Math.floor(Math.random() * 30) + 60 // 60-90
      },
      oxygenLevel: Math.floor(Math.random() * 10) + 90, // 90-100
      temperature: (Math.random() * 2 + 36).toFixed(1), // 36-38°C
      glucoseLevel: Math.floor(Math.random() * 100) + 70, // 70-170
      respirationRate: Math.floor(Math.random() * 10) + 12, // 12-22
      cholesterol: Math.floor(Math.random() * 100) + 150, // 150-250
      history: Array(24).fill().map((_, i) => ({
        time: `${i}:00`,
        heartRate: Math.floor(Math.random() * 30) + 60,
        bloodPressure: Math.floor(Math.random() * 40) + 100,
        oxygenLevel: Math.floor(Math.random() * 5) + 95
      }))
    };
  };

  // Calculate diagnosis distribution
  const calculateDiagnosisDistribution = () => {
    const distribution = [...diagnosisData];
    
    // Reset counts
    distribution.forEach(item => item.value = 0);
    
    // Count patients by diagnosis
    patients.forEach(patient => {
      const diagnosisIndex = distribution.findIndex(item => item.name === patient.diagnosis);
      if (diagnosisIndex !== -1) {
        distribution[diagnosisIndex].value += 1;
      }
    });
    
    return distribution;
  };

  // Weekly appointment data
  const weeklyAppointmentsData = [
    { name: 'Mon', appointments: Math.floor(Math.random() * 10) + 3 },
    { name: 'Tue', appointments: Math.floor(Math.random() * 10) + 3 },
    { name: 'Wed', appointments: Math.floor(Math.random() * 10) + 3 },
    { name: 'Thu', appointments: Math.floor(Math.random() * 10) + 3 },
    { name: 'Fri', appointments: Math.floor(Math.random() * 10) + 3 },
    { name: 'Sat', appointments: Math.floor(Math.random() * 5) + 1 },
    { name: 'Sun', appointments: Math.floor(Math.random() * 2) }
  ];

  // Patient recovery progress data
  const recoveryProgressData = [
    { status: 'Critical', count: patients.filter(p => p.status === 'Critical').length },
    { status: 'Attention', count: patients.filter(p => p.status === 'Attention').length },
    { status: 'Stable', count: patients.filter(p => p.status === 'Stable').length },
    { status: 'Recovery', count: patients.filter(p => p.status === 'Recovery').length }
  ];

  // Initial data fetch
  useEffect(() => {
    fetchPatients();
  }, [searchTerm]);

  // Handle auto refresh
  useEffect(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    
    if (refreshRate !== 'off') {
      const interval = setInterval(() => {
        fetchPatients();
      }, refreshRate === 'fast' ? 30000 : 60000);
      
      setRefreshInterval(interval);
    }
    
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [refreshRate]);

  // Load selected patient details
  useEffect(() => {
    if (selectedPatient) {
      setHealthMetrics(selectedPatient.healthData);
    } else {
      setHealthMetrics(null);
    }
  }, [selectedPatient]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle refresh rate change
  const handleRefreshRateChange = (e) => {
    setRefreshRate(e.target.value);
  };

  // Handle selecting a patient
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient === selectedPatient ? null : patient);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'bg-red-500';
      case 'Attention': return 'bg-yellow-500';
      case 'Stable': return 'bg-green-500';
      case 'Recovery': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Get diagnosis color
  const getDiagnosisColor = (diagnosis) => {
    switch (diagnosis) {
      case 'Cardiovascular': return 'text-red-500';
      case 'Respiratory': return 'text-blue-500';
      case 'Neurological': return 'text-purple-500';
      case 'Gastrointestinal': return 'text-yellow-500';
      case 'Orthopedic': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const diagnosisDistribution = calculateDiagnosisDistribution();

  // Generate random time slots for today's appointments
  const todayAppointments = Array(appointmentsToday).fill().map((_, index) => {
    const hour = 8 + Math.floor(Math.random() * 9); // 8 AM to 5 PM
    const minute = Math.random() > 0.5 ? '00' : '30';
    const patientIndex = Math.floor(Math.random() * patients.length);
    return {
      time: `${hour}:${minute}`,
      patient: patients[patientIndex] || { name: 'Patient Name', diagnosis: 'General Checkup' }
    };
  }).sort((a, b) => {
    const timeA = parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
    const timeB = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
    return timeA - timeB;
  });

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <RefreshCw className="h-5 w-5 text-gray-400 mr-2" />
              <select 
                className="outline-none border-none text-sm bg-transparent"
                value={refreshRate}
                onChange={handleRefreshRateChange}
              >
                <option value="off">Auto Refresh: Off</option>
                <option value="normal">Auto Refresh: 1m</option>
                <option value="fast">Auto Refresh: 30s</option>
              </select>
            </div>
            
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select className="outline-none border-none text-sm bg-transparent">
                <option>All Patients</option>
                <option>Critical Only</option>
                <option>Recent Only</option>
              </select>
            </div>
            
            <div className="relative">
              <button className="relative bg-white p-2 rounded-full shadow-sm">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('patients')}
            >
              Patients
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-gray-500 font-medium">Total Patients</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{patients.length}</span>
              <span className="text-sm text-green-500">+3 new this week</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <Calendar className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-gray-500 font-medium">Today's Appointments</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{appointmentsToday}</span>
              <span className="text-sm text-gray-500">remaining</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Next: {todayAppointments[0]?.time || 'No appointments'} with {todayAppointments[0]?.patient.name || ''}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Activity className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-gray-500 font-medium">Critical Cases</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{criticalCases}</span>
              <span className="text-sm text-red-500">need attention</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {criticalCases > 0 ? 'Immediate review required' : 'No critical cases'}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <FileText className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-gray-500 font-medium">Pending Reviews</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{pendingReviews}</span>
              <span className="text-sm text-gray-500">reports</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Medical records awaiting your review
            </div>
          </div>
        </div>

        {/* Main Dashboard Content - Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Recent Patients */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Bar */}
              <div className="flex items-center bg-white rounded-xl shadow-sm px-4 py-3 mb-6">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search patients by name or ID..."
                  className="outline-none border-none w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              {/* Recent Patients */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
                    <button className="text-blue-500 text-sm hover:underline">
                      View All
                    </button>
                  </div>
                </div>
                
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-2 text-gray-500">Loading patients...</p>
                  </div>
                ) : error ? (
                  <div className="p-6 text-center">
                    <p className="text-red-500">{error}</p>
                    <button 
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={fetchPatients}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {recentPatients.map(patient => (
                      <div 
                        key={patient._id}
                        className="p-6 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="bg-blue-100 rounded-full p-3 mr-4">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{patient.name}</h4>
                              <p className="text-sm text-gray-500">ID: {patient._id.substring(0, 8)}</p>
                              <p className={`text-sm font-medium ${getDiagnosisColor(patient.diagnosis)}`}>
                                {patient.diagnosis}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className={`${getStatusColor(patient.status)} text-white text-xs px-2 py-1 rounded-full mb-2`}>
                              {patient.status}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(patient.lastChecked).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-gray-500">Heart Rate</p>
                            <p className="font-medium">{patient.healthData.heartRate} bpm</p>
                          </div>
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-gray-500">Blood Pressure</p>
                            <p className="font-medium">
                              {patient.healthData.bloodPressure.systolic}/{patient.healthData.bloodPressure.diastolic}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded p-2 text-center">
                            <p className="text-xs text-gray-500">O₂ Level</p>
                            <p className="font-medium">{patient.healthData.oxygenLevel}%</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Next appointment: {new Date(patient.nextAppointment).toLocaleDateString()}</span>
                          </div>
                          <button className="text-blue-500 text-sm hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {recentPatients.length === 0 && (
                      <div className="p-6 text-center text-gray-500">
                        No patients found.
                      </div>
                    )}
                  </div>
                )}
              </div>
                
              {/* Recovery Progress */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Recovery Progress</h3>
                </div>
                <div className="p-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={recoveryProgressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="status" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Bar dataKey="count" name="Patients">
                          {recoveryProgressData.map((entry, index) => {
                            const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];
                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
           
              
              {/* Patient Distribution */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Diagnoses Distribution</h3>
                </div>
                <div className="p-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={diagnosisDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {diagnosisDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {diagnosisDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Weekly Appointments */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Weekly Appointments</h3>
                </div>
                <div className="p-4">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyAppointmentsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Bar dataKey="appointments" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Patient Details Modal */}
        {selectedPatient && healthMetrics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-90vh overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-sm text-gray-500">
                      Patient ID: {selectedPatient._id.substring(0, 8)} | 
                      <span className={`ml-2 font-medium ${getDiagnosisColor(selectedPatient.diagnosis)}`}>
                        {selectedPatient.diagnosis}
                      </span>
                    </p>
                  </div>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedPatient(null)}
                >
                  &times;
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Health Metrics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Current Health Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Heart Rate</div>
                      <div className="font-medium text-lg">{healthMetrics.heartRate} bpm</div>
                      <div className="mt-1 text-xs text-gray-400">Normal range: 60-100 bpm</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Blood Pressure</div>
                      <div className="font-medium text-lg">
                        {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic} mmHg
                      </div>
                      <div className="mt-1 text-xs text-gray-400">Normal: 120/80 mmHg</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Oxygen Level</div>
                      <div className="font-medium text-lg">{healthMetrics.oxygenLevel}%</div>
                      <div className="mt-1 text-xs text-gray-400">Normal range: 95-100%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Temperature</div>
                      <div className="font-medium text-lg">{healthMetrics.temperature}°C</div>
                      <div className="mt-1 text-xs text-gray-400">Normal: 36.1-37.2°C</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Glucose Level</div>
                      <div className="font-medium text-lg">{healthMetrics.glucoseLevel} mg/dL</div>
                      <div className="mt-1 text-xs text-gray-400">Normal: 80-130 mg/dL</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Respiration Rate</div>
                      <div className="font-medium text-lg">{healthMetrics.respirationRate} /min</div>
                      <div className="mt-1 text-xs text-gray-400">Normal: 12-20 /min</div>
                    </div>
                  </div>
                </div>
                
                {/* Health History */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">24hr Health History</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthMetrics.history}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="time" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Line type="monotone" dataKey="heartRate" stroke="#EF4444" name="Heart Rate" />
                        <Line type="monotone" dataKey="bloodPressure" stroke="#3B82F6" name="Blood Pressure" />
                        <Line type="monotone" dataKey="oxygenLevel" stroke="#10B981" name="Oxygen" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-0">
                <h4 className="font-medium text-gray-900 mb-3">Patient Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Full Name</div>
                      <div className="font-medium">{selectedPatient.name}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Patient ID</div>
                      <div className="font-medium">{selectedPatient._id}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Status</div>
                      <div className="font-medium">
                        <span className={`${getStatusColor(selectedPatient.status)} text-white text-xs px-2 py-1 rounded-full`}>
                          {selectedPatient.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Diagnosis</div>
                      <div className={`font-medium ${getDiagnosisColor(selectedPatient.diagnosis)}`}>
                        {selectedPatient.diagnosis}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Last Visit</div>
                      <div className="font-medium">{new Date(selectedPatient.lastChecked).toLocaleDateString()}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Next Appointment</div>
                      <div className="font-medium">{new Date(selectedPatient.nextAppointment).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t flex justify-end gap-3">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Medical History
                </button>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Update Notes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab Content */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">All Patients</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <button onClick={() => navigate('/doctor/patients') } className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    View All Patient
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Appointment
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map(patient => (
                    <tr key={patient._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-2 mr-3">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">ID: {patient._id.substring(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`${getStatusColor(patient.status)} text-white text-xs px-2 py-1 rounded-full`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getDiagnosisColor(patient.diagnosis)}`}>
                          {patient.diagnosis}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(patient.lastChecked).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(patient.nextAppointment).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => handleSelectPatient(patient)}
                        >
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {loading && (
                <div className="p-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                  <p className="mt-2 text-gray-500">Loading patients...</p>
                </div>
              )}
              
              {!loading && patients.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No patients found.
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {patients.length} patients
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab Content */}
        {activeTab === 'appointments' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button className="text-gray-500">
                      &lt;
                    </button>
                    <h4 className="font-medium">April 2025</h4>
                    <button className="text-gray-500">
                      &gt;
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                    <div className="text-gray-500">Su</div>
                    <div className="text-gray-500">Mo</div>
                    <div className="text-gray-500">Tu</div>
                    <div className="text-gray-500">We</div>
                    <div className="text-gray-500">Th</div>
                    <div className="text-gray-500">Fr</div>
                    <div className="text-gray-500">Sa</div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array(30).fill().map((_, i) => {
                      const day = i + 1;
                      const hasAppointments = Math.random() > 0.7;
                      const isToday = day === 27; // Since current date is April 27, 2025
                      
                      return (
                        <div 
                          key={i} 
                          className={`p-2 rounded ${
                            isToday 
                              ? 'bg-blue-500 text-white font-medium' 
                              : hasAppointments 
                                ? 'border-2 border-blue-200 text-blue-500 font-medium' 
                                : 'text-gray-700'
                          } cursor-pointer hover:bg-gray-50`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="p-4 border-t">
                  <h4 className="font-medium mb-3">Appointment Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Completed</span>
                      </div>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Scheduled</span>
                      </div>
                      <span className="text-sm font-medium">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Canceled</span>
                      </div>
                      <span className="text-sm font-medium">6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Schedule New
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <h4 className="ml-2 font-medium">Sunday, April 27, 2025</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50">
                        Day
                      </button>
                      <button className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        Week
                      </button>
                      <button className="px-3 py-1 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50">
                        Month
                      </button>
                    </div>
                  </div>
                  
                  {todayAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {todayAppointments.map((appointment, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                                <Clock className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{appointment.time}</div>
                                <div className="text-gray-500 text-sm">30 minutes</div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50">
                                Reschedule
                              </button>
                              <button className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                Start Session
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-gray-100 rounded-full p-2 mr-3">
                                <User className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium">{appointment.patient.name}</div>
                                <div className={`text-sm ${getDiagnosisColor(appointment.patient.diagnosis)}`}>
                                  {appointment.patient.diagnosis}
                                </div>
                              </div>
                            </div>
                            <div className={`${getStatusColor(appointment.patient.status || 'Stable')} text-white text-xs px-2 py-1 rounded-full`}>
                              {appointment.patient.status || 'Stable'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
                        <Calendar className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-700 mb-2">No Appointments Today</h4>
                      <p className="mb-4">Enjoy your day off or schedule new appointments</p>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Schedule New Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Patient Distribution by Diagnosis</h3>
              </div>
              <div className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diagnosisDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {diagnosisDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {diagnosisDistribution.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <div className="text-sm">
                        <span className="font-medium">{item.name}</span>: {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Patient Recovery Progress</h3>
              </div>
              <div className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={recoveryProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="status" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Bar dataKey="count" name="Patients">
                        {recoveryProgressData.map((entry, index) => {
                          const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];
                          return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {recoveryProgressData.map((item, index) => {
                    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];
                    return (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-medium">{item.count}</div>
                        <div className="text-sm text-gray-500">
                          {item.status}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Appointments</h3>
              </div>
              <div className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyAppointmentsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Bar dataKey="appointments" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-7 gap-2 mt-4">
                  {weeklyAppointmentsData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="font-medium">{item.appointments}</div>
                      <div className="text-xs text-gray-500">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Patient Satisfaction</div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-blue-500">92%</span>
                        </div>
                        <div className="text-xs text-gray-500">Past 30 days</div>
                      </div>
                      <div className="overflow-hidden h-2 mt-2 rounded-full bg-gray-200">
                        <div style={{ width: "92%" }} className="bg-blue-500 h-2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Average Wait Time</div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-green-500">7.2</span>
                          <span className="text-xs text-gray-500 ml-1">minutes</span>
                        </div>
                        <div className="text-xs text-gray-500">Past 30 days</div>
                      </div>
                      <div className="overflow-hidden h-2 mt-2 rounded-full bg-gray-200">
                        <div style={{ width: "78%" }} className="bg-green-500 h-2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Treatment Success Rate</div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-purple-500">88%</span>
                        </div>
                        <div className="text-xs text-gray-500">Past 30 days</div>
                      </div>
                      <div className="overflow-hidden h-2 mt-2 rounded-full bg-gray-200">
                        <div style={{ width: "88%" }} className="bg-purple-500 h-2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Appointment Completion</div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-yellow-500">94%</span>
                        </div>
                        <div className="text-xs text-gray-500">Past 30 days</div>
                      </div>
                      <div className="overflow-hidden h-2 mt-2 rounded-full bg-gray-200">
                        <div style={{ width: "94%" }} className="bg-yellow-500 h-2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-4">Key Performance Statistics</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-500 mb-1">Total Patients</div>
                      <div className="font-bold text-xl">{patients.length}</div>
                      <div className="text-xs text-green-500">↑ 12% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-500 mb-1">Recovery Rate</div>
                      <div className="font-bold text-xl">87%</div>
                      <div className="text-xs text-green-500">↑ 5% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-500 mb-1">Follow-ups</div>
                      <div className="font-bold text-xl">32</div>
                      <div className="text-xs text-red-500">↓ 3% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-500 mb-1">Avg. Visits</div>
                      <div className="font-bold text-xl">2.4</div>
                      <div className="text-xs text-gray-500">Same as last month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;