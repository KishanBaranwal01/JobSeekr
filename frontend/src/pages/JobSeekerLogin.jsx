import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobSeekerLogin = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState("seeker"); 
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const backendUrl = import.meta.env.VITE_BACKEND_LINKKS || "http://localhost:3000";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true); 

        const apiUrl = `${backendUrl}/api/auth${role === "provider" ? "provider" : ""}/${isSignup ? "signup" : "login"}`;

        try {
            const { data } = await axios.post(apiUrl, formData);
            setMessage(data.message);
            localStorage.setItem("token", data.token); 

            navigate(role === "seeker" ? "/seeker-profile" : "/recruiter-profile");
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
            console.error("Login/Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        {isSignup ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p className="text-blue-100 mt-1">
                        {role === "seeker" ? "Find your dream job" : "Hire top talent"}
                    </p>
                </div>

                {/* Role Selection */}
                <div className="flex border-b border-gray-200">
                    <button
                        className={`flex-1 py-3 font-medium ${role === "seeker" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                        onClick={() => setRole("seeker")}
                    >
                        Job Seeker
                    </button>
                    <button
                        className={`flex-1 py-3 font-medium ${role === "provider" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                        onClick={() => setRole("provider")}
                    >
                        Job Provider
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignup && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isSignup ? "Creating Account..." : "Logging In..."}
                                </span>
                            ) : isSignup ? "Sign Up" : "Login"}
                        </button>

                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.includes("wrong") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                {message}
                            </div>
                        )}
                    </form>

                    <div className="mt-4 text-center">
                        <button 
                            onClick={() => setIsSignup(!isSignup)} 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerLogin;