
import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  loginData:{},
  signupData:{},
   dark: localStorage.getItem("theme") === "dark",
  setDark: () => {
    set((state) => {
      const newDark = !state.dark;

      // Update HTML class
      const root = document.documentElement;
      if (newDark) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return { dark: newDark };
    });
  },
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
      set({ isSigningUp : true });
      const res = await axiosInstance.post("/auth/signUp", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      set({ res, isSigningUp : false });
       
    } catch (error) {
      console.error("Error in useAuthStore/signup", error);
    }
  },

  login: async (data) => {
    try {
     set({ isLoggingIng : true });
      const res = await axiosInstance.post("/auth/login",{
        email:data.email,
        password:data.password,
      })
     set({ isLoggingIng : false,
      authUser: res.data.user,
      });
    
    } catch (error) {
       
     set({ isLoggingIng:false })
     console.error("Error in useAuthStore/login", error);
    }
    
  },

    logout: async () => {
    try {
      await axiosInstance.post("/auth/logOut", {
        userId: useAuthStore.getState().authUser?._id,
      });
    } catch (error) {
      console.error("Error in useAuthStore/logout", error);
    } finally {
      set({ authUser: null });
    }
  },
 updateProfile: async (formData) => {
  try {
    set({ isUpdatingProfile: true });
    const res = await axiosInstance.put("/auth/update-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    set({ authUser: res.data.updateUser, isUpdatingProfile: false });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    set({ isUpdatingProfile: false });
  }
},
}));
  