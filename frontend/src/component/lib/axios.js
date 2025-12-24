import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-bfw9.onrender.com/api",
  withCredentials: true,
});
