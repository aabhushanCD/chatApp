import { useAuthStore } from "../store/UseAuthStore";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { logout, authUser,setDark, dark} = useAuthStore();
  const handleDark = () => {
    setDark();
  }
  return (
    <header className="bg-base-100 border-b border-base-300 absolute  z-40 w-full top-0 ">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo or App name */}
          <div className="text-xl font-semibold">
            <Link to="/">ChatApp</Link>
          </div>

          {/* Right: User Info / Auth Buttons */}
          <div className="flex items-center gap-4"> 
            {authUser ? (
              <>
                <span className="text-sm"> Hi, {authUser.fullName} </span>
                     <Link
                    to={"/profile"}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
                > 
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  Logout
                </button>
                <button
                  className="px-3 py-1 text-sm"
                  onClick={handleDark}
                >
                  {dark ? "Light" : "Dark"}
                </button>
             
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:underline">
                  Login
                </Link>
                <Link to="/signup" className="text-sm hover:underline">
                  Sign Up
                </Link>            
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
