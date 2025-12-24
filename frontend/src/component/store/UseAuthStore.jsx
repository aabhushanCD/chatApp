import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const BASE_URL = "https://chatapp-bfw9.onrender.com";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  loginData: {},
  signupData: {},
  onlineUsers: [],
  socket: null,
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
      get().connectSocket();
    } catch (error) {
      console.error("Error in useAuthStore/checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signUp", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      set({ res, isSigningUp: false });
      toast.success("SignUp Successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error in useAuthStore/signup", error);
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIng: true });
      const res = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      set({ isLoggingIng: false, authUser: res.data.user });
      toast.success("Logged in Successfully");
      get().connectSocket();
    } catch (error) {
      set({ isLoggingIng: false });
      console.error("Error in useAuthStore/login", error);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logOut", {
        userId: useAuthStore.getState().authUser?._id,
      });
      get().disconnectSocket();
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
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
