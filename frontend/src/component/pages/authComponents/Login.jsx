import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/UseAuthStore";
import {  useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
  const { login, isLoggingIng,authUser } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData); // Assuming login expects {email, password}
  };
    useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (

    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">             
              <h1 className="text-2xl font-bold mt-2">Login Account</h1>
            </div>
         </div>
         </div>
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <label className="label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <label className="label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="btn btn-neutral mt-4"
        disabled={isLoggingIng}
      >
        {isLoggingIng ? "Logging in..." : "Login"}
      
      </button>
    </form>
  </div>
  );
}

export default Login;
