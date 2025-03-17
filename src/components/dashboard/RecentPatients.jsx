import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RecentPatients = ({ limit = 5 }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecentPatients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/patients`
      );

      if (!response.ok) throw new Error("Failed to fetch patients");

      const data = await response.json();
      const sortedPatients = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPatients(sortedPatients.slice(0, limit));
    } catch (error) {
      toast.error(error.message || "Failed to fetch recent patients");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRecentPatients();
  }, [fetchRecentPatients, limit]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
        <button
          onClick={() => navigate(`/patients`)}
          className="text-blue-600 text-sm hover:text-blue-700"
        >
          View All
        </button>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-4">Patient Name</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm text-gray-600">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="font-medium">{patient.name}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      patient.status === "Critical"
                        ? "bg-red-100 text-red-600"
                        : patient.status === "Recovery"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/patients/${patient._id}`)}
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
  );
};

export default RecentPatients;
