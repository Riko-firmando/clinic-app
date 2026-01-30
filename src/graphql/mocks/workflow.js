export let workflow = {
  id: "1",
  name: "Workflow Klinik",
  steps: [
    {
      id: "1",
      title: "Registrasi",
      order: 1,
      desc: "Pendaftaran pasien dan pengisian data",
    },
    {
      id: "2",
      title: "Pemeriksaan",
      order: 2,
      desc: "Pemeriksaan oleh dokter",
    },
    { id: "3", title: "Obat", order: 3, desc: "Pengambilan obat di apotek" },
    { id: "4", title: "Pembayaran", order: 4, desc: "Pembayaran di kasir" },
  ],
};
