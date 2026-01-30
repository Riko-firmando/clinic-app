import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "../../components/Button";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PATIENTS, DELETE_PATIENT } from "../../graphql/queries";
import {
  Eye,
  Plus,
  Search,
  Trash,
  ChevronLeft,
  ChevronRight,
  Edit2,
} from "lucide-react";
import clsx from "clsx";
import { useDebounce } from "use-debounce";
import PatientDetailPopup from "./PatientDetailPopup";
import { useClinicStore } from "../../store/useClinicStore";
import AddPatientPopup from "./AddPatientPopup";
import EditPatientPopup from "./EditPatientPopup";
import { useUserStore } from "../../store/useUserStore";
import { upperCase } from "lodash";

const PatientCard = () => {
  const { role } = useUserStore();
  const limit = 6; // Diubah ke 6 agar grid 3 kolom tetap simetris (3x2)
  const [page, setPage] = useState(1);

  // State untuk search dengan Debounce
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedQuery] = useDebounce(searchTerm, 500);

  const [openDetail, setOpenDetail] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { setSelectedPatient } = useClinicStore();

  // Query dengan debouncedQuery
  const { data, loading: queryLoading } = useQuery(GET_PATIENTS, {
    variables: { name: debouncedQuery, page, limit },
  });

  const [deletePatient] = useMutation(DELETE_PATIENT, {
    refetchQueries: [
      { query: GET_PATIENTS, variables: { name: debouncedQuery, page, limit } },
    ],
  });

  // Reset page saat user mencari nama baru
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const disabledActions = upperCase(role) !== "ADMIN";
  const patients = data?.patients.items || [];

  const totalCount = data?.patients?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages || totalPages === 0;

  return (
    <div>
      <div className="flex justify-between gap-2 mb-4">
        <Input
          className="max-w-75"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari pasien..."
          prefix={
            <Search
              size={18}
              className={queryLoading ? "animate-pulse text-[#1D9D86]" : ""}
            />
          }
        />
        {!disabledActions && (
          <Button
            onClick={() => setOpenAdd(true)}
            className="flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            <span>Tambah Pasien</span>
          </Button>
        )}
      </div>

      {/* Grid Layout untuk Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">
                  {patient.name}
                </h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400 uppercase tracking-wider font-semibold">
                  ID: {patient.id.slice(-5)}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500 flex justify-between">
                  <span>Email:</span>{" "}
                  <span className="text-gray-700 font-medium">
                    {patient.email}
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex justify-between">
                  <span>Umur:</span>{" "}
                  <span className="text-gray-700 font-medium">
                    {patient.age} tahun
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex justify-between">
                  <span>Telepon:</span>{" "}
                  <span className="text-gray-700 font-medium">
                    {patient.phone}
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex justify-between">
                  <span>Gender:</span>{" "}
                  <span className="text-gray-700 font-medium">
                    {patient.gender}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedPatient(patient.id);
                  setOpenDetail(true);
                }}
                className="flex-1 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
              >
                <Eye size={14} />
                Detail
              </button>

              {!disabledActions && (
                <>
                  <button
                    onClick={() => {
                      setSelectedPatient(patient.id);
                      setOpenEdit(true);
                    }}
                    className="flex-1 py-2 text-sm text-[#1D9D86] bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm("Apakah Anda yakin ingin menghapus pasien ini?")
                      ) {
                        deletePatient({ variables: { id: patient.id } });
                      }
                    }}
                    className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1">
        <button
          className="flex items-center justify-center disabled:text-gray-300 border border-gray-200 rounded-lg w-8 h-8 hover:bg-gray-50 transition-colors"
          disabled={isPrevDisabled}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={clsx(
                "border rounded-lg text-[14px] w-8 h-8 transition-all",
                index + 1 === page
                  ? "bg-[#1D9D86] border-[#1D9D86] text-white font-bold"
                  : "bg-white border-gray-200 hover:border-[#1D9D86]",
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="flex items-center justify-center disabled:text-gray-300 border border-gray-200 rounded-lg w-8 h-8 hover:bg-gray-50 transition-colors"
          disabled={isNextDisabled}
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Popups */}
      <PatientDetailPopup
        isOpen={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedPatient(null);
        }}
      />
      <AddPatientPopup isOpen={openAdd} onClose={() => setOpenAdd(false)} />
      <EditPatientPopup
        isOpen={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setSelectedPatient(null);
        }}
      />
    </div>
  );
};

export default PatientCard;
