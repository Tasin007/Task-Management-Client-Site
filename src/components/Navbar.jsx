import  { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '', photo: '' }); // Define userProfile and setUserProfile here
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.displayName || '',  // Fallback to email if displayName is not available
        photo: user.photoURL,
      });
    }
  }, [user]);

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("User Logout successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <header className="bg-purple-950 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 lg:px-8" aria-label="Global">
          <div className="flex justify-between items-center py-6 md:justify-start space-x-20 lg:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <NavLink to="/" aria-label="Home">
                <span className="sr-only">Schedula</span>
                <img
                  className="h-8 w-auto sm:h-10 pl-9"
                  src="/src/assets/Favicon.png"
                  alt="Logo"
                />
                <h1 className="text-xl text-white inline-block ml-2">
                Schedula
                </h1>
              </NavLink>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <NavLink
                to="/"
                className="whitespace-nowrap text-base font-medium text-white hover:text-red-500"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className="ml-8 whitespace-nowrap text-base font-medium text-white hover:text-red-500"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/userprofile"
                className="ml-8 whitespace-nowrap text-base font-medium text-white hover:text-red-500"
              >
                User Profile
              </NavLink>
              <div className="ml-8 relative">
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-white hover:text-red-500 cursor-pointer"
                />
              </div>
              {user ? (
                <div className="ml-8 relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <img
                      className="h-8 w-8 rounded-full ring-2 ring-white"
                      src={user.photoURL}
                      alt="User"
                    />
                    
                  </div>
                  <div
                    className={`${
                      isProfileMenuOpen ? "block" : "hidden"
                    } absolute top-0 right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="block px-4 py-2 text-xs text-black">
                      {user.displayName}
                    </div>
                    
                    <div
                      className="block px-4 py-2 text-xs text-black hover:text-red-500 cursor-pointer"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="ml-8 whitespace-nowrap text-base font-medium text-white hover:text-red-500"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden bg-white`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-50"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-50"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/userprofile"
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-50"
              >
                User Profile
              </NavLink>
            </div>
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.photoURL}
                    alt="User"
                  />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.displayName}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="block w-full text-left px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-50"
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
