import { useQuery } from "@apollo/client/react";
import Popup from "../../components/Popup2";
import { useClinicStore } from "../../store/useClinicStore";
import { GET_PATIENT_DETAIL } from "../../graphql/queries";
import { getInitialName } from "../../utils/helper";
import { Locate, LocateIcon, Mail, PhoneCall } from "lucide-react";
import { isEmpty } from "lodash";

const PatientDetailPopup = ({ isOpen, onClose }) => {
  const patientId = useClinicStore((state) => state.selectedPatientId);

  const { data } = useQuery(GET_PATIENT_DETAIL, {
    variables: { id: patientId },
  });
  const patient = data?.patient || {};
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center text-2xl text-[#EEFBF8] bg-[#1D9D86] rounded-full w-15 h-15">
              {getInitialName(patient.name)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{patient.name}</h3>
              <div className="text-sm space-x-1">
                <span>{patient.age} tahun</span>
                <span>•</span>
                <span>{patient.gender}</span>
                <span>•</span>
                <span>Golongan darah {patient.blood_type}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold mb-3">Informasi Kontak :</h3>
            <div>
              <div className="flex items-center gap-2">
                <PhoneCall size={15} className="text-gray-600" />
                <div className="text-sm text-gray-600">Nomor Telephone</div>
              </div>
              <span className="text-sm pl-6"> {patient.phone}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-gray-600" />
                <div className="text-sm text-gray-600">Email</div>
              </div>
              <span className="text-sm pl-6"> {patient.email}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <LocateIcon size={15} className="text-gray-600" />
                <div className="text-sm text-gray-600">Alamat</div>
              </div>
              <span className="text-sm pl-6"> {patient.address}</span>
            </div>
          </div>
          {!isEmpty(patient.visits) && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Kunjungan :</h3>
              <ul className="list-disc list-inside">
                {patient?.visits.map((visit) => (
                  <li key={visit.id}>
                    <span>
                      {visit.date} || {visit.complaint} || {visit.doctor}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default PatientDetailPopup;
