import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateLocal } from "../../utils/helper";

const daysHeader = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const Calendar = ({
  appointments = [],
  selectedDate,
  onSelectDate,
  year,
  month, // 1 - 12
  onPrevMonth,
  onNextMonth,
}) => {
  const appointmentMap = appointments.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const generateDays = () => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month - 1, d);
      days.push({
        date,
        day: d,
        dateString: formatDateLocal(date),
      });
    }

    return days;
  };

  const calendarDays = generateDays();

  return (
    <div className=" bg-white rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">
          {monthNames[month - 1]} {year}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={onPrevMonth}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-2 text-center text-sm text-gray-500">
        {daysHeader.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          if (!day) return <div key={index} />;

          const hasAppointment = appointmentMap[day.dateString];
          const isSelected = selectedDate === day.dateString;

          return (
            <button
              key={day.dateString}
              onClick={() => onSelectDate(day.dateString)}
              className={`
                relative w-14 h-14 rounded text-sm
                ${
                  isSelected
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {day.day}

              {hasAppointment && (
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-100 border border-blue-400 rounded" />
          Hari dipilih
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Ada Jadwal Konsultasi
        </div>
      </div>
    </div>
  );
};

export default Calendar;
