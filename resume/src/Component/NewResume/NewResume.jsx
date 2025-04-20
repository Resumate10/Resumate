import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const NewResume = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">My Resumes</h2>
          <p className="text-lg text-gray-700">
            Start creating your AI Resume for your next Job
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link
            to="/ResumeData"
            className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-full mb-5 shadow-md">
              <Plus size={30} className="text-white" />
            </div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-medium text-lg">
              Create New Resume
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NewResume;
