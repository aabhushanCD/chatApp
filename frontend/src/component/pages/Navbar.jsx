import { useAuthStore } from "../store/UseAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo or App name */}
          <div className="text-xl font-semibold">
            <a href="/">ChatApp</a>
          </div>

          {/* Right: User Info / Auth Buttons */}
          <div className="flex items-center gap-4">
            {authUser ? (
              <>
                <span className="text-sm">Hi, {authUser.fullName}</span>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-sm hover:underline">
                  Login
                </a>
                <a href="/signup" className="text-sm hover:underline">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
