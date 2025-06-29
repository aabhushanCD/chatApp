import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignUp from "../pages/authComponents/SignUp";
import Login from "../pages/authComponents/Login";
import Error from "../error";
import { useAuthStore } from "../store/UseAuthStore";

import ProfilePage from "../pages/ProfilePage";

import DashBoard from "../chatComponents/DashBoard";
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/error" />;
};
function AllRoutes() {

  return (
    <Routes>
      <Route path="/" element={<DashBoard/>} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default AllRoutes;
