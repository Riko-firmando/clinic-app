import { useState } from "react";
import Popup from "../../components/Popup2";
import PatientForm from "./patientForm";
import Button from "../../components/Button";
import { useMutation } from "@apollo/client/react";
import { CREATE_PATIENT, GET_PATIENTS } from "../../graphql/queries";

const requiredFields = [
  "name",
  "email",
  "phone",
  "age",
  "gender",
  "blood_type",
  "address",
];

const AddPatientPopup = ({ isOpen, onClose }) => {
  const [form, setFOrm] = useState({});
  // 1. Inisialisasi Mutasi
  const [addPatient, { loading }] = useMutation(CREATE_PATIENT, {
    // 2. Beritahu Apollo untuk menarik data terbaru setelah berhasil tambah
    refetchQueries: [
      {
        query: GET_PATIENTS,
        variables: {
          name: "", // atau query state
          page: 1,
          limit: 5,
        },
      },
    ],
    onCompleted: () => {
      alert("Pasien berhasil ditambahkan!");
      setFOrm({});
      onClose();
    },
  });

  const isFormValid = requiredFields.every(
    (field) => form[field] && String(form[field]).trim() !== "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }
    // 3. Jalankan fungsi mutasi dengan variabel
    addPatient({
      variables: form,
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      className="p-3"
      closeButton
    >
      <h2 className="text-xl font-semibold mb-5">Tambah Pasien</h2>
      <PatientForm
        form={form}
        onChange={(e) => setFOrm({ ...form, [e.target.name]: e.target.value })}
      />
      <div className="flex gap-2 mt-10">
        <Button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className="w-full"
        >
          Simpan
        </Button>
      </div>
    </Popup>
  );
};

export default AddPatientPopup;
