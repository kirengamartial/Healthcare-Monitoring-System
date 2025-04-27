import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Search, Bell, User, Calendar, Activity, Users, Filter, RefreshCw } from 'lucide-react';
import patientService from '../../services/patientService';

const NurseDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [refreshRate, setRefreshRate] = useState('off');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [healthMetrics, setHealthMetrics] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Status distribution data
  const statusData = [
    { name: 'Critical', value: 0, color: '#EF4444' },
    { name: 'Attention', value: 0, color: '#F59E0B' },
    { name: 'Stable', value: 0, color: '#10B981' },
    { name: 'Recovery', value: 0, color: '#3B82F6' }
  ];

  // Mock data for vitals summary
  const getVitalsSummary = () => {
    return {
      criticalHeartRate: patients.filter(p => p.healthData?.heartRate > 100 || p.healthData?.heartRate < 50).length,
      criticalBloodPressure: patients.filter(p => 
        p.healthData?.bloodPressure?.systolic > 140 || 
        p.healthData?.bloodPressure?.diastolic > 90).length,
      criticalOxygen: patients.filter(p => p.healthData?.oxygenLevel < 95).length,
      criticalGlucose: patients.filter(p => p.healthData?.glucoseLevel > 180 || p.healthData?.glucoseLevel < 70).length
    };
  };

  // Load data from API
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatientsByNurse(search);
      
      // Create mock health data for each patient
      const enrichedPatients = data.patients.map(patient => ({
        ...patient,
        status: getRandomStatus(),
        healthData: generateMockHealthData(),
        lastChecked: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString()
      }));
      
      setPatients(enrichedPatients);
      setTotalPages(data.totalPages);
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
      history: Array(24).fill().map((_, i) => ({
        time: `${i}:00`,
        heartRate: Math.floor(Math.random() * 30) + 60,
        bloodPressure: Math.floor(Math.random() * 40) + 100,
        oxygenLevel: Math.floor(Math.random() * 5) + 95
      }))
    };
  };

  // Calculate status distribution
  const calculateStatusDistribution = () => {
    const distribution = [...statusData];
    
    // Reset counts
    distribution.forEach(item => item.value = 0);
    
    // Count patients by status
    patients.forEach(patient => {
      const statusIndex = distribution.findIndex(item => item.name === patient.status);
      if (statusIndex !== -1) {
        distribution[statusIndex].value += 1;
      }
    });
    
    return distribution;
  };

  // Initial data fetch
  useEffect(() => {
    fetchPatients();
  }, [search, page, limit]);

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
    setSearch(e.target.value);
    setPage(1);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle refresh
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

  const vitals = getVitalsSummary();
  const statusDistribution = calculateStatusDistribution();

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Dashboard Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2 w-full md:w-auto">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search patients..."
              className="outline-none border-none w-full"
              value={search}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select className="outline-none border-none text-sm bg-transparent">
                <option>All Patients</option>
                <option>Critical Only</option>
                <option>Needs Attention</option>
              </select>
            </div>
            
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
            
            <div className="flex bg-white rounded-lg shadow-sm overflow-hidden">
              <button 
                className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Activity className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-gray-500 font-medium">Critical Heart Rate</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{vitals.criticalHeartRate}</span>
              <span className="text-sm text-gray-500">patients</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">Needs immediate attention</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Activity className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-gray-500 font-medium">High Blood Pressure</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{vitals.criticalBloodPressure}</span>
              <span className="text-sm text-gray-500">patients</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">Abnormal readings detected</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-gray-500 font-medium">Low Oxygen Levels</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{vitals.criticalOxygen}</span>
              <span className="text-sm text-gray-500">patients</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">Below 95% saturation</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <Activity className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-gray-500 font-medium">Glucose Alerts</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800 mr-2">{vitals.criticalGlucose}</span>
              <span className="text-sm text-gray-500">patients</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">Abnormal glucose levels</div>
          </div>
        </div>

        {/* Charts and Patient List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Patients List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Patients Overview</h3>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">{patients.length} patients</span>
                  </div>
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
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                      {patients.map(patient => (
                        <div 
                          key={patient._id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            selectedPatient?._id === patient._id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'
                          }`}
                          onClick={() => handleSelectPatient(patient)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{patient.name}</h4>
                                <p className="text-sm text-gray-500">ID: {patient._id.substring(0, 8)}</p>
                              </div>
                            </div>
                            <div className={`${getStatusColor(patient.status)} text-white text-xs px-2 py-1 rounded-full`}>
                              {patient.status}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="text-xs">
                              <span className="text-gray-500">Heart Rate:</span>
                              <span className="ml-1 font-medium text-gray-900">{patient.healthData.heartRate} bpm</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-gray-500">BP:</span>
                              <span className="ml-1 font-medium text-gray-900">
                                {patient.healthData.bloodPressure.systolic}/{patient.healthData.bloodPressure.diastolic}
                              </span>
                            </div>
                            <div className="text-xs">
                              <span className="text-gray-500">O2:</span>
                              <span className="ml-1 font-medium text-gray-900">{patient.healthData.oxygenLevel}%</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-gray-500">Temp:</span>
                              <span className="ml-1 font-medium text-gray-900">{patient.healthData.temperature}°C</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-3">
                            Last checked: {new Date(patient.lastChecked).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Patient
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Heart Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Blood Pressure
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              O2 Level
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Last Checked
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {patients.map(patient => (
                            <tr 
                              key={patient._id}
                              className={`hover:bg-gray-50 cursor-pointer ${
                                selectedPatient?._id === patient._id ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => handleSelectPatient(patient)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="ml-4">
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {patient.healthData.heartRate} bpm
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {patient.healthData.bloodPressure.systolic}/{patient.healthData.bloodPressure.diastolic}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {patient.healthData.oxygenLevel}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(patient.lastChecked).toLocaleTimeString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 flex items-center justify-between border-t">
                      <div className="text-sm text-gray-500">
                        Showing page {page} of {totalPages}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 1}
                          className={`px-3 py-1 rounded ${
                            page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page === totalPages}
                          className={`px-3 py-1 rounded ${
                            page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Right Column - Charts */}
          <div className="space-y-6">
            {/* Patient Distribution Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {statusDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
 
          </div>
        </div>
        
        {/* Selected Patient Details */}
        {selectedPatient && healthMetrics && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPatient.name}</h3>
                  <p className="text-sm text-gray-500">Patient ID: {selectedPatient._id}</p>
                </div>
              </div>
              <div className={`${getStatusColor(selectedPatient.status)} text-white px-3 py-1 rounded-full text-sm`}>
                {selectedPatient.status}
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Heart Rate</h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{healthMetrics.heartRate}</span>
                    <span className="ml-1 text-sm text-gray-500">bpm</span>
                  </div>
                  <div className="mt-4 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthMetrics.history}>
                        <Line type="monotone" dataKey="heartRate" stroke="#3B82F6" strokeWidth={2} dot={false} />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Blood Pressure</h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">mmHg</span>
                  </div>
                  <div className="mt-4 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthMetrics.history}>
                        <Line type="monotone" dataKey="bloodPressure" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
              
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Oxygen Level</h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{healthMetrics.oxygenLevel}</span>
                    <span className="ml-1 text-sm text-gray-500">%</span>
                  </div>
                  <div className="mt-4 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthMetrics.history}>
                        <Line type="monotone" dataKey="oxygenLevel" stroke="#10B981" strokeWidth={2} dot={false} />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Health Trends (24 Hours)</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthMetrics.history}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="time" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="heartRate" 
                          name="Heart Rate"
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="bloodPressure"
                          name="Blood Pressure" 
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="oxygenLevel"
                          name="Oxygen" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="flex items-center justify-between text-sm font-medium text-gray-500 mb-4">
                    <span>Patient Details</span>
                    <button className="text-blue-500 text-xs hover:underline">View Full Record</button>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <h5 className="text-xs text-gray-500">Full Name</h5>
                      <p className="text-sm font-medium">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-500">Patient ID</h5>
                      <p className="text-sm font-medium">{selectedPatient._id.substring(0, 8)}</p>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-500">Email</h5>
                      <p className="text-sm font-medium">{selectedPatient.email || 'Not available'}</p>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-500">Phone</h5>
                      <p className="text-sm font-medium">{selectedPatient.phone || 'Not available'}</p>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-500">Temperature</h5>
                      <p className="text-sm font-medium">{healthMetrics.temperature}°C</p>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-500">Glucose Level</h5>
                      <p className="text-sm font-medium">{healthMetrics.glucoseLevel} mg/dL</p>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-500">Respiration Rate</h5>
                      <p className="text-sm font-medium">{healthMetrics.respirationRate} bpm</p>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-500">Last Checked</h5>
                      <p className="text-sm font-medium">{new Date(selectedPatient.lastChecked).toLocaleString()}</p>
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

export default NurseDashboard;