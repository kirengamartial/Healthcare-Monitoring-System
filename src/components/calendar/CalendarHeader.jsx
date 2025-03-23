/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarHeader = ({ selectedDate, onDateChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    onDateChange(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    onDateChange(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold">
          {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
