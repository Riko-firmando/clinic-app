import { Timer, User } from "lucide-react";

const AppointmentList = ({ date, appointments }) => {
  return (
    <div className="w-full lg:w-[320px] bg-white rounded-xl p-5">
      <h3 className="font-semibold mb-4">
        Jadwal –{" "}
        {new Date(date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
        })}
      </h3>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <div className="text-4xl mb-2">🕒</div>
          Tidak ada appointment
        </div>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a) => (
            <li key={a.id} className="border rounded-xl border-gray-200 p-3">
              <div className="flex items-center gap-1 mb-1">
                <User size={15} />
                <p className="font-medium">{a.patientName}</p>
              </div>
              <div className="flex items-center gap-1">
                <Timer size={15} />
                <p className="text-sm text-gray-500">
                  {a.time} • {a.doctor}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;
