import React, { Children, useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./component/store/UseAuthStore";
import { Loader } from "lucide-react";
import {Toaster} from "react-hot-toast"
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./component/route/AllRoutes";
import Navbar from "./component/pages/Navbar";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,dark } = useAuthStore();

// useEffect(() => {
//   if (dark) {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }
// }, [dark]);

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
  <>
  
      
    <BrowserRouter>
    <Navbar></Navbar>
    
      <AllRoutes />
        <Toaster
    position="top-center"
    reverseOrder={false}
   />
    </BrowserRouter>
  
  </>
  );
};

export default App;
