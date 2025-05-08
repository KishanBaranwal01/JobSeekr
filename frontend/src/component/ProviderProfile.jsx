import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContext from "./context/ContextApi";

const ProviderProfile = () => {
  const { value, setValue } = useContext(MyContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [recruiterId, setRecruiterId] = useState(null);
  const [jobData, setJobData] = useState({
    title: "",
    skill: "",
    experience: "",
    location: "",
    maxCTC: "",
    noticePeriod: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!value) {
      console.error("❌ recruiterId is null or undefined!");
      setMessage("❌ Recruiter ID is missing! Please refresh the page.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/job/${value}`,
        { ...jobData, value },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Job Created:", response.data);

      setMessage("✅ Job Created Successfully!");
      setJobData({ title: "", skill: "", experience: "", location: "", maxCTC: "", noticePeriod: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Job Posting Error:", error.response?.data || error.message);
      setMessage(`❌ Error: ${error.response?.data?.message || "Failed to create job."}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Recruiter Dashboard</h1>
          <p className="text-indigo-100 mt-1">Manage job postings and candidates</p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex flex-wrap gap-4 border-b border-gray-200">
          <button 
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Create New Job
          </button>
          <button 
            onClick={() => navigate(`/job-list/${value}`)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            View Posted Jobs
          </button>
        </div>

        {/* Job Creation Form */}
        {showForm && (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Job Posting</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Senior React Developer"
                      value={jobData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                    <input
                      type="text"
                      name="skill"
                      placeholder="e.g. JavaScript, React, Node.js"
                      value={jobData.skill}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      placeholder="Minimum years required"
                      value={jobData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="City or Remote"
                      value={jobData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max CTC (LPA)</label>
                    <input
                      type="number"
                      name="maxCTC"
                      placeholder="Maximum offered salary"
                      value={jobData.maxCTC}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period (Days)</label>
                    <input
                      type="number"
                      name="noticePeriod"
                      placeholder="Maximum notice period"
                      value={jobData.noticePeriod}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                  >
                    Post Job Opportunity
                  </button>
                </div>
              </form>
            </div>
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

export default ProviderProfile;