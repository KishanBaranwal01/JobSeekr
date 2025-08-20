import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobConnector() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Main Container */}
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 relative z-10 backdrop-blur-sm">
        {/* Header */}
        <div className="bg-blue-700 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">JOB CONNECTOR</h1>
          <p className="text-blue-100 mt-1">Connect to opportunities</p>
        </div>
        
        {/* Content Area */}
        <div className="p-8">
          {/* Main Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 mb-6"
            onClick={() => setShowOptions(!showOptions)}
          >
            {showOptions ? 'Hide Options' : 'Get Started'}
          </button>

          {/* Options Panel */}
          {showOptions && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center mb-4">
                <p className="text-gray-600">I want to:</p>
              </div>
              
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200"
                onClick={() => navigate("/jobseeker-login")}
              >
                Find Jobs (Job Seeker)
              </button>
              
              <button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200"
                onClick={() => navigate("/jobprovider-login")}
              >
                Post Jobs (Job Provider)
              </button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 bg-opacity-70 p-4 text-center text-sm text-gray-600">
          Connecting talent with opportunity
        </div>
      </div>
    </div>
  );
}