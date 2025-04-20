import { Clock } from "lucide-react";

export default function SimpleTemplatesComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center pb-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 sm:p-10">
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Clock className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Templates Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're working hard to bring you amazing resume templates. Stay tuned!
            </p>
            
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse"></div>
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse delay-100"></div>
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom decoration */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-b-lg"></div>
      </div>
    </div>
  );
}