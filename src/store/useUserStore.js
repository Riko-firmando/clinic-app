import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  role: null,

  setUser: (user) =>
    set({
      user,
      role: user?.role ?? null,
    }),

  clearUser: () =>
    set({
      user: null,
      role: null,
    }),
}));
