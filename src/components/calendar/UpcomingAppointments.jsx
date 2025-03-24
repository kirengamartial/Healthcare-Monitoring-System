import { Clock } from "lucide-react";

const UpcomingAppointments = ({ appointments }) => {
  // Sort appointments by date and time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Appointments
      </h3>
      <div className="space-y-4">
        {sortedAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium">{appointment.patientName}</h4>
              <p className="text-sm text-gray-500">
                {appointment.time} - {appointment.type}
              </p>
              <p className="text-sm text-gray-500">{appointment.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
