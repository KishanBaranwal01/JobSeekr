import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeekerProfile = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const [profileData, setProfileData] = useState({
    name: "",
    skill: "",
    location: "",
    experience: "",
    ctc: "",
    noticePeriod: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/user/createjob", profileData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Profile Created Successfully!");
      setProfileData({ name: "", skill: "", location: "", experience: "", ctc: "", noticePeriod: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Profile Creation Error:", error.response?.data || error.message);
      setMessage(`❌ Error: ${error.response?.data?.message || "Failed to create profile."}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Job Seeker Dashboard</h1>
          <p className="text-blue-100 mt-1">Manage your professional profile</p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-200">
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Create Profile
          </button>
          <button 
            onClick={() => navigate("/alljobseeker")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Find Profiles
          </button>
          <button 
            onClick={() => navigate("/alljobs")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            View All Jobs
          </button>
          <button 
            onClick={() => navigate("/allappliedjob")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Applied Jobs
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Create Your Professional Profile</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={profileData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Skill</label>
                    <input
                      type="text"
                      name="skill"
                      placeholder="e.g. React, Node.js"
                      value={profileData.skill}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="City, Country"
                      value={profileData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      placeholder="0"
                      value={profileData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current CTC (LPA)</label>
                    <input
                      type="number"
                      name="ctc"
                      placeholder="0.00"
                      value={profileData.ctc}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period (Days)</label>
                    <input
                      type="number"
                      name="noticePeriod"
                      placeholder="30"
                      value={profileData.noticePeriod}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`p-4 mx-6 mb-6 rounded-lg ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            <p className="font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekerProfile;