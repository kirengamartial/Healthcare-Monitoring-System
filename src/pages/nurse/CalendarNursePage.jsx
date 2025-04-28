import { useState } from "react";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import AppointmentDetailsModal from "../../components/calendar/AppointmentDetailsModal";
import UpcomingAppointmentsByNurse from "../../components/calendar/UpcomingAppointmentsByNurse";

const CalendarNursePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      time: "09:00 AM",
      date: "2024-03-20",
      type: "Check-up",
      createdBy: "Dr. Smith"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      time: "10:30 AM",
      date: "2024-03-20",
      type: "Follow-up",
      createdBy: "Dr. Johnson"
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      time: "02:00 PM",
      date: "2024-03-21",
      type: "Consultation",
      createdBy: "Dr. Smith"
    },
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Display appointments for this date instead of opening creation modal
    const appointmentsForDate = appointments.filter(
      (appointment) => {
        const appDate = new Date(appointment.date);
        return appDate.toDateString() === date.toDateString();
      }
    );
    
    if (appointmentsForDate.length === 1) {
      // If only one appointment, show it directly
      setSelectedAppointment(appointmentsForDate[0]);
      setIsDetailsModalOpen(true);
    } else if (appointmentsForDate.length > 1) {
      // Could open a list modal here or handle differently
      // For now, let's use the upcoming appointments to select one
    }
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar (View Only)</h1>
        <div className="text-sm text-gray-500">
          Appointments are created by doctors and can be viewed here
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarHeader
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <CalendarGrid
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            appointments={appointments}
          />
        </div>
        <UpcomingAppointmentsByNurse 
          appointments={appointments} 
          onAppointmentClick={handleAppointmentClick}
        />
      </div>

      {/* Instead of the create modal, we have a details view modal */}
      {selectedAppointment && (
        <AppointmentDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default CalendarNursePage;