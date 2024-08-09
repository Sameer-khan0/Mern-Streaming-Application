import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "../../redux/user/userFunction";
import UserAvatar from "../assets/Images/userav.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(GetUser());
  }, [dispatch]);

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <span className="text-gray-800 text-xl font-bold">
              Social Stream
            </span>
          </div>
          <div className="hidden pl-5 lg:flex lg:flex-grow lg:items-center lg:w-auto">
            <a href="#" className="text-gray-800 hover:text-gray-600 mr-4">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600 mr-4">
              Stream
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Board
            </a>
          </div>
          <div className="flex items-center w-[50%] md:w-auto justify-between ">
            {user ? (
              <div className="ml-4 flex items-center">
                <img
                  src={UserAvatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-800 ml-2 md:text-lg text-sm font-semibold ">
                  {user.username}
                </span>
              </div>
            ) : (
              <div className="ml-4 flex ">
                <Link to="/authentication">
                  <button className="text-gray-800 md:text-lg text-xs bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg mr-2">
                    Sign
                  </button>
                </Link>
                <Link to="/authentication">
                  <button className="text-gray-800 md:text-lg text-xs bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">
                    Login
                  </button>
                </Link>
              </div>
            )}
            <button
              onClick={toggleNavbar}
              className={`lg:hidden text-gray-800 hover:text-gray-600 focus:outline-none transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 14.5858L20.4142 13.1716C20.8047 12.781 20.8047 12.1481 20.4142 11.7574L11.7574 3.1006C11.3668 2.71 10.7339 2.71 10.3433 3.1006L1.6866 11.7574C1.296 12.148 1.296 12.7809 1.6866 13.1716L3.1008 14.5858C3.4915 14.9765 4.1245 14.9765 4.5152 14.5858L12 7.1006L19.4848 14.5858C19.8755 14.9765 20.5085 14.9765 20.8992 14.5858Z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.9 14H4.1C3.6 14 3.1 13.6 3.1 13C3.1 12.4 3.6 12 4.1 12H19.9C20.4 12 20.9 12.4 20.9 13C20.9 13.6 20.4 14 19.9 14ZM19.9 18H4.1C3.6 18 3.1 17.6 3.1 17C3.1 16.4 3.6 16 4.1 16H19.9C20.4 16 20.9 16.4 20.9 17C20.9 17.6 20.4 18 19.9 18ZM3.1 8C3.1 7.4 3.6 7 4.1 7H19.9C20.4 7 20.9 7.4 20.9 8C20.9 8.6 20.4 9 19.9 9H4.1C3.6 9 3.1 8.6 3.1 8Z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive navbar links */}
      {isOpen && (
        <div className="lg:hidden bg-white py-4">
          <a
            href="#"
            className="block text-gray-800 hover:text-gray-600 px-4 py-2"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-800 hover:text-gray-600 px-4 py-2"
          >
            Stream
          </a>
          <a
            href="#"
            className="block text-gray-800 hover:text-gray-600 px-4 py-2"
          >
            Board
          </a>
          {user ? (
            <span className="block text-gray-800 px-4 py-2">
              Welcome, {user.username}
            </span>
          ) : (
            <>
              <a
                href="#"
                className="block text-gray-800 hover:text-gray-600 px-4 py-2"
              >
                Sign In
              </a>
              <a
                href="#"
                className="block text-gray-800 hover:text-gray-600 px-4 py-2"
              >
                Login
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
