import { Clock } from "lucide-react";

const UpcomingAppointments = () => {
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      time: "09:00 AM",
      date: "2024-03-20",
      type: "Check-up",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      time: "10:30 AM",
      date: "2024-03-20",
      type: "Follow-up",
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      time: "02:00 PM",
      date: "2024-03-21",
      type: "Consultation",
    },
    {
      id: 4,
      patientName: "Martial Ishimwe",
      time: "06:00 PM",
      date: "2024-03-21",
      type: "Consultation",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Appointments
      </h3>
      <div className="space-y-4">
        {appointments.map((appointment) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
