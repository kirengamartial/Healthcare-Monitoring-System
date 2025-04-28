import React from 'react'

const UpcomingAppointmentsByNurse = ({ appointments, onAppointmentClick }) => {
    // Sort appointments by date and time
    const sortedAppointments = [...appointments].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });
  
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        {sortedAppointments.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments</p>
        ) : (
          <div className="space-y-3">
            {sortedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onAppointmentClick(appointment)}
              >
                <div className="font-medium">{appointment.patientName}</div>
                <div className="text-sm text-gray-600">
                  {appointment.date} at {appointment.time}
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.type} • Created by {appointment.createdBy}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default UpcomingAppointmentsByNurse
