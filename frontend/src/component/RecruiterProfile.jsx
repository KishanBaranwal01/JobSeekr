import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContext from "./context/ContextApi";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const {value, setValue} = useContext(MyContext);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await axios.post("http://localhost:3000/api/recruiter/recruiterjob", profileData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Profile Created Successfully!");
      setProfileData({ name: "", company: "", email: "", mobile: "" });
      setShowForm(false);
      setValue(data.recruiter._id);
      setTimeout(() => navigate(`/profil-provider/${data.recruiter._id}`), 1500);
    } catch (error) {
      console.error("Profile Creation Error:", error.response?.data || error.message);
      setMessage(`❌ Error: ${error.response?.data?.error || "Failed to create profile."}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Recruiter Profile</h1>
          <p className="text-blue-100 mt-1">Create your professional profile</p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex flex-wrap gap-4 justify-center border-b border-gray-200">
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Create Profile
          </button>
          <button 
            onClick={() => navigate(`/allrecruiter`)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Find Recruiters
          </button>
        </div>

        {/* Profile Creation Form */}
        {showForm && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Recruiter Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  value={profileData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="professional@email.com"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Phone number"
                  value={profileData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`p-4 mx-6 mb-6 rounded-lg ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            <p className="font-medium text-center">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;