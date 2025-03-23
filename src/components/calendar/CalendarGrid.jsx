/* eslint-disable react/prop-types */
const CalendarGrid = ({ selectedDate, onDateSelect }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(selectedDate);
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingDay + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() =>
              day && onDateSelect(new Date(selectedDate.setDate(day)))
            }
            className={`
              h-12 rounded-lg text-sm
              ${!day ? "invisible" : "hover:bg-blue-50"}
              ${
                day === selectedDate.getDate()
                  ? "bg-blue-100 text-blue-600"
                  : ""
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
