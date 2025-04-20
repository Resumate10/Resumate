import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // Check if user is logged in by looking for userData in localStorage
  const isLoggedIn = !!localStorage.getItem('userData');

  return (
    <header className="text-gray-600 body-font bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm w-full">
      <div className="container px-5 py-5 mx-auto flex flex-wrap flex-col md:flex-row items-center max-w-full">
        <Link to='/'>
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-md"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              RESUMATE
            </span>
          </div>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to={isLoggedIn ? '/dashboard' : '/signup'}>
            <button className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 py-2 px-4 focus:outline-none hover:from-indigo-700 hover:to-purple-700 rounded-lg text-base mt-4 md:mt-0 shadow-md transition-all duration-300 cursor-pointer">
              {isLoggedIn ? 'Dashboard' : 'Get Started'}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;