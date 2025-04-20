import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center pt-14 pb-50">
      <div className="text-5xl font-bold text-black pt-36">
        Build your Resume
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {" "}
          with AI
        </span>
      </div>
      <div className="pt-3 text-lg text-gray-700">
        Effortlessly craft and stand out with our AI-powered Resume Builder
      </div>

      <div className="flex justify-center space-x-4 mt-10">
        <Link to="/signup">
          <button className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 py-2 px-4 focus:outline-none hover:from-indigo-700 hover:to-purple-700 rounded-lg text-base shadow-md transition-all duration-300 cursor-pointer">
            Get Started
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


        <Link to='/templates'>
        <button className="inline-flex items-center border-1 border-black bg-white text-black py-2 px-4 focus:outline-none rounded-lg text-base shadow-md transition-all duration-300 cursor-pointer hover:bg-gray-100">
          Templates
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
      </div>
    </div>
  );
};

export default Home;
