import React from "react";
import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSiningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in useAuthStore/checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
