import { useEffect, useState } from "react";
import Popup from "../../components/Popup2";
import PatientForm from "./patientForm";
import Button from "../../components/Button";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_PATIENT_DETAIL,
  GET_PATIENTS,
  UPDATE_PATIENT,
} from "../../graphql/queries";
import { useClinicStore } from "../../store/useClinicStore";

const requiredFields = [
  "name",
  "email",
  "phone",
  "age",
  "gender",
  "blood_type",
  "address",
];

const EditPatientPopup = ({ isOpen, onClose }) => {
  const patientId = useClinicStore((state) => state.selectedPatientId);
  const { data } = useQuery(GET_PATIENT_DETAIL, {
    variables: { id: patientId },
  });
  const patient = data?.patient || {};
  const [form, setFOrm] = useState({});
  const [updatePatient, { loading }] = useMutation(UPDATE_PATIENT, {
    refetchQueries: [{ query: GET_PATIENTS }],
    onCompleted: () => {
      onClose();
    },
  });

  useEffect(() => {
    // Hanya setForm jika data patient ada dan id-nya berbeda dengan yang ada di form
    if (patient?.id && patient.id !== form.id) {
      setFOrm({ ...patient });
    }
  }, [patient, form.id]);

  const isFormValid = requiredFields.every(
    (field) => form[field] && String(form[field]).trim() !== "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePatient({
      variables: {
        id: patient.id,
        input: {
          name: form.name,
          age: Number(form.age),
          gender: form.gender,
          phone: form.phone,
          email: form.email,
          address: form.address,
          blood_type: form.blood_type,
        },
      },
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
      <h2 className="text-xl font-semibold mb-5">Edit Pasien</h2>
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

export default EditPatientPopup;
