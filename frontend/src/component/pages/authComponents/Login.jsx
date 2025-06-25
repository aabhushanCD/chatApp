import React, { useState } from "react";
import { useAuthStore } from "../../store/UseAuthStore";

function Login() {
  const { login, isLoggingIng } = useAuthStore();
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

  return (
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend className="fieldset-legend">Login</legend>

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
  );
}

export default Login;
