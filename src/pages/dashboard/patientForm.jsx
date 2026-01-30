import Input from "@/components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";

const genders = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
];

const bloodTypes = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "AB", label: "AB" },
  { value: "O", label: "O" },
];

const PatientForm = ({ form, onChange }) => {
  return (
    <div className="space-y-3">
      <Input
        name="name"
        value={form.name}
        onChange={onChange}
        label="Nama"
        placeholder="Tulis Nama Pasien..."
        mandatory
      />
      <Input
        name="email"
        value={form.email}
        onChange={onChange}
        label="Email"
        placeholder="Tulis Email Pasien..."
        mandatory
      />
      <Input
        name="phone"
        value={form.phone}
        onChange={onChange}
        label="Telephone"
        placeholder="Tulis Telephone Pasien..."
        mandatory
      />
      <Input
        name="age"
        value={form.age}
        onChange={onChange}
        label="Umur"
        placeholder="Tulis Umur Pasien..."
        mandatory
      />
      <Select
        options={genders}
        name="gender"
        value={form.gender}
        onChange={onChange}
        label="Jenis Kelamin"
        placeholder="Pilih Jenis Kelamin"
        mandatory
      />
      <Select
        options={bloodTypes}
        name="blood_type"
        value={form.blood_type}
        onChange={onChange}
        label="Golongan Darah"
        placeholder="Pilih Golongan Darah"
        mandatory
      />
      <Input
        name="address"
        value={form.address}
        onChange={onChange}
        label="Alamat"
        placeholder="Tulis Alamat Pasien..."
        mandatory
      />
    </div>
  );
};

export default PatientForm;
