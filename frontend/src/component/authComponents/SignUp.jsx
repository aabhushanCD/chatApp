import React from "react";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-amber-950 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <form className="space-y-4">
          {/* Full Name */}
          <label className="input input-bordered flex items-center gap-2">
            <span className="text-gray-500">👤</span>
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              required
            />
          </label>

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <span className="text-gray-500">📧</span>
            <input type="email" className="grow" placeholder="Email" required />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <span className="text-gray-500">🔒</span>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              required
            />
          </label>

          {/* Submit Button */}
          <button className="btn btn-primary w-full">Sign Up</button>

          {/* Already have an account */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
