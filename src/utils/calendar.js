// components/Calendar.jsx
import { generateCalendarDays } from "@/utils/generateCalendarDays";

const daysHeader = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const Calendar = ({
  year,
  month,
  appointments = [],
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}) => {
  const days = generateCalendarDays(year, month);

  const appointmentMap = appointments.reduce((acc, a) => {
    acc[a.date] = true;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl p-6 border w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          {new Date(year, month - 1).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={onPrevMonth}
            className="w-9 h-9 rounded border hover:bg-gray-100"
          >
            ‹
          </button>
          <button
            onClick={onNextMonth}
            className="w-9 h-9 rounded border hover:bg-gray-100"
          >
            ›
          </button>
        </div>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 text-sm text-gray-500 mb-2">
        {daysHeader.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-6">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} />;

          const isSelected = selectedDate === day.dateString;
          const hasAppointment = appointmentMap[day.dateString];

          return (
            <button
              key={day.dateString}
              onClick={() => onSelectDate(day.dateString)}
              className={`
                relative text-sm h-10 w-10 mx-auto rounded-full
                ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
              `}
            >
              {day.day}

              {hasAppointment && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm mt-6 text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-blue-100" />
          Hari Ini
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Ada Appointment
        </div>
      </div>
    </div>
  );
};

export default Calendar;
