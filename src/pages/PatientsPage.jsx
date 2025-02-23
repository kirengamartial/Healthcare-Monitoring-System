// src/pages/Patients.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

const PatientsPage = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample initial patients data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      age: 45,
      gender: "Female",
      contact: "+1 234-567-8900",
      email: "sarah.j@email.com",
      status: "Critical",
      lastVisit: "2024-02-20",
      doctor: "Dr. Smith"
    },
    {
      id: 2,
      name: "Michael Brown",
      age: 32,
      gender: "Male",
      contact: "+1 234-567-8901",
      email: "michael.b@email.com",
      status: "Stable",
      lastVisit: "2024-02-21",
      doctor: "Dr. Wilson"
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    status: 'Stable',
    doctor: ''
  });

  const handleCreatePatient = (e) => {
    e.preventDefault();
    const patient = {
      ...newPatient,
      id: Date.now(),
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, patient]);
    setShowCreateModal(false);
    setNewPatient({
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: '',
      status: 'Stable',
      doctor: ''
    });
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="p-4">Patient Name</th>
                <th className="p-4">Age</th>
                <th className="p-4">Gender</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                {/* <th className="p-4">Last Visit</th> */}
                <th className="p-4">Doctor</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm text-blue-600 font-medium">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{patient.age}</td>
                  <td className="p-4">{patient.gender}</td>
                  <td className="p-4">{patient.contact}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      patient.status === 'Critical' 
                        ? 'bg-red-100 text-red-600' 
                        : patient.status === 'Recovery'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  {/* <td className="p-4">{patient.lastVisit}</td> */}
                  <td className="p-4">{patient.doctor}</td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Patient Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
            <form onSubmit={handleCreatePatient} className="space-y-4">
              <input
                type="text"
                placeholder="Patient Name"
                className="w-full p-2 border rounded-lg"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Age"
                  className="p-2 border rounded-lg"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  required
                />
                <select
                  className="p-2 border rounded-lg"
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full p-2 border rounded-lg"
                value={newPatient.contact}
                onChange={(e) => setNewPatient({...newPatient, contact: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                value={newPatient.email}
                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Doctor"
                className="w-full p-2 border rounded-lg"
                value={newPatient.doctor}
                onChange={(e) => setNewPatient({...newPatient, doctor: e.target.value})}
                required
              />
              <select
                className="w-full p-2 border rounded-lg"
                value={newPatient.status}
                onChange={(e) => setNewPatient({...newPatient, status: e.target.value})}
                required
              >
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
                <option value="Recovery">Recovery</option>
              </select>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;