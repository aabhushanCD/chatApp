import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import SignUp from "../pages/authComponents/SignUp";
import Login from "../pages/authComponents/Login";

import Error from "../error";
import { useAuthStore } from "../store/UseAuthStore";
import Home from "../pages/Home";
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/error" />;
};
function AllRoutes() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}

export default AllRoutes;
