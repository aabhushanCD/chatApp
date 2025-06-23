import React from "react";
import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
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
  signup: async (data) => {
    try {
      const res = await axiosInstance("/auth/signUp", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      set({ res });
    } catch (error) {
      console.error("Error in useAuthStore/signup", error);
    }
  },
}));
