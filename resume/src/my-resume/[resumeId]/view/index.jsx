import React from 'react';
import { Download, Share2, CheckCircle } from 'lucide-react';

const ViewResume = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          
          <div className="px-6 py-10 sm:px-10 sm:py-16">
            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Congrats! Your AI Resume is ready!
            </h2>
            
            {/* Subheading */}
            <p className="mt-3 text-xl text-center text-gray-500">
              You can download and share your resume with potential employers
            </p>
            
            {/* Resume preview placeholder */}
            {/* <div className="mt-10 mx-auto max-w-sm bg-gray-100 rounded-lg p-2">
              <div className="border-2 border-dashed border-gray-300 rounded bg-white p-6 h-64">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div> */}
            
            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-8 rounded-full text-white text-lg font-medium shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </button>
              
              <button className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-8 rounded-full text-white text-lg font-medium shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Share2 className="h-5 w-5 mr-2" />
                Share Resume
              </button>
            </div>
            
            {/* Extra info */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Your resume has been optimized with AI to highlight your skills and experience
            </p>
          </div>
          
          {/* Bottom gradient decoration */}
          <div className="h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        </div>
      </div>
    </div>
  );
};

export default ViewResume;