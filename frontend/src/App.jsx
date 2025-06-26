import React, { Children, useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./component/store/UseAuthStore";
import { Loader } from "lucide-react";

import { BrowserRouter, Navigate } from "react-router-dom";
import AllRoutes from "./component/route/AllRoutes";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin"></Loader>
        </div>
      </>
    );
  }
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default App;
