import PatientCard from "./PatientCard";
import PatientTable from "./PatientTable";

const Dashboard = () => {
  return (
    <div className="bg-white rounded-xl p-5">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="mb-5">Kelola data pasien klinik Anda</p>
      <div className="hidden lg:block">
        <PatientTable />
      </div>
      <div className="lg:hidden">
        <PatientCard />
      </div>
    </div>
  );
};

export default Dashboard;
