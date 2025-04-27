import { useState } from "react";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import UpcomingAppointments from "../../components/calendar/UpcomingAppointments";
import AppointmentModal from "../../components/calendar/AppointmentModal";
import CalendarHeader from "../../components/calendar/CalendarHeader";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([
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
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...newAppointment,
        id: Math.max(...prev.map((a) => a.id), 0) + 1,
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          New Appointment
        </button>
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
          />
        </div>
        <UpcomingAppointments appointments={appointments} />
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSave={handleAddAppointment}
      />
    </div>
  );
};

export default CalendarPage;
