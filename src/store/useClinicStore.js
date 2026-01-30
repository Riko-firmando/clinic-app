import { create } from "zustand";

export const useClinicStore = create((set) => ({
  // State
  searchTerm: "",
  currentPage: 1,
  selectedPatientId: null,

  // Actions (Fungsi untuk mengubah state)
  setSearchTerm: (text) =>
    set({
      searchTerm: text,
      currentPage: 1, // Reset ke halaman 1 setiap kali user mencari nama baru
    }),

  setCurrentPage: (page) =>
    set({
      currentPage: page,
    }),

  setSelectedPatient: (id) =>
    set({
      selectedPatientId: id,
    }),

  resetStore: () =>
    set({
      searchTerm: "",
      currentPage: 1,
      selectedPatientId: null,
    }),
}));
