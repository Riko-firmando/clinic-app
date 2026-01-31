import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PATIENTS, DELETE_PATIENT } from "../../graphql/queries";
import DropdownMenu from "../../components/DropdownMenu";
import {
  Eye,
  LucideMoreVertical,
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

const header = [
  "ID Pasien",
  "Nama",
  "Email",
  "Umur",
  "Gender",
  "Telepon",
  "Action",
];

const PatientTable = () => {
  const { role } = useUserStore();
  const limit = 5;
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedQuery] = useDebounce(searchTerm, 500);

  const { setSelectedPatient } = useClinicStore();
  const [openDetail, setOpenDetail] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data, loading: queryLoading } = useQuery(GET_PATIENTS, {
    variables: { name: debouncedQuery, page, limit },
  });

  const [deletePatient] = useMutation(DELETE_PATIENT, {
    refetchQueries: [
      { query: GET_PATIENTS, variables: { name: debouncedQuery, page, limit } },
    ],
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const disabledActions = upperCase(role) !== "ADMIN";
  const patients = data?.patients.items || [];
  const colStyle = "py-4 px-2 max-w-[200px]";

  const totalCount = data?.patients?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages || totalPages === 0;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <Input
          className="max-w-75"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari pasien..."
          prefix={
            <Search size={18} className={queryLoading ? "animate-pulse" : ""} />
          }
        />
        {!disabledActions && (
          <Button
            onClick={() => setOpenAdd(true)}
            className="flex items-center justify-center gap-2 "
          >
            <Plus size={15} />
            <span>Tambah Pasien</span>
          </Button>
        )}
      </div>

      <Table
        data={patients}
        header={header}
        renderRow={(item, index) => (
          <tr
            key={item.id || index}
            className="py-3 border-b last:border-b-0 border-gray-200"
          >
            <td className={colStyle}>{item.id}</td>
            <td className={colStyle}>
              <span className="font-medium">{item.name}</span>
            </td>
            <td className={colStyle}>{item.email}</td>
            <td className={colStyle}>{item.gender}</td>
            <td className={colStyle}>{item.age} Tahun</td>
            <td className={colStyle}>{item.phone}</td>
            <td className={`${colStyle} flex justify-center`}>
              <DropdownMenu
                label={<LucideMoreVertical size={15} />}
                items={[
                  {
                    label: "Lihat detail",
                    icon: <Eye size={18} />,
                    onClick: () => {
                      setSelectedPatient(item.id);
                      setOpenDetail(true);
                    },
                  },
                  ...(!disabledActions
                    ? [
                        {
                          label: "Edit",
                          icon: <Edit2 size={18} />,
                          onClick: () => {
                            setSelectedPatient(item.id);
                            setOpenEdit(true);
                          },
                        },
                        {
                          label: "Hapus",
                          icon: <Trash size={18} className="text-red-400" />,
                          onClick: () => {
                            if (
                              confirm(
                                "Apakah Anda yakin ingin menghapus pasien ini?",
                              )
                            ) {
                              deletePatient({
                                variables: { id: item.id },
                              });
                            }
                          },
                        },
                      ]
                    : []),
                ]}
              />
            </td>
          </tr>
        )}
      />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-4">
        <button
          className="flex items-center justify-center disabled:text-gray-300 border border-gray-200 rounded-lg w-8 h-8 transition-colors hover:bg-gray-50"
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
                "border rounded-lg text-sm w-8 h-8 transition-all",
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
          className="flex items-center justify-center disabled:text-gray-300 border border-gray-200 rounded-lg w-8 h-8 transition-colors hover:bg-gray-50"
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

export default PatientTable;
