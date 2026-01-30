import { useState } from "react";
import Calendar from "./Calendar";
import AppointmentList from "./AppointmentList";
import { useQuery } from "@apollo/client/react";
import { GET_APPOINTMENTS } from "../../graphql/queries";

const AppointmentPage = () => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0],
  );

  const { data, loading } = useQuery(GET_APPOINTMENTS, {
    variables: {
      month: Number(month),
      year: Number(year),
    },
  });

  const appointments = data?.appointments || [];

  const filteredAppointments = appointments.filter(
    (a) => a.date === selectedDate,
  );

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Jadwal Konsultasi</h2>
      <p className="text-gray-500 mb-4">
        Pilih tanggal untuk melihat jadwal konsultasi
      </p>
      <div className="flex gap-6 flex-col lg:flex-row">
        <Calendar
          year={year}
          month={month}
          appointments={appointments}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <AppointmentList
          date={selectedDate}
          appointments={filteredAppointments}
        />
      </div>
    </div>
  );
};

export default AppointmentPage;
