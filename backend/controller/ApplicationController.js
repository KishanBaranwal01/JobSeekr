import ApplicationModel from "../model/ApplicationModel.js";
import JobModel from "../model/JobModel.js";
// import UserModel from "../model/JobSeekerModel.js";
import mongoose from "mongoose";
import LoginModel from "../model/loginSignup.js";
// import ApplicationModel from './../model/ApplicationModel';


export const applyForJob = async (req, res) => {
    try {
        const { candidateId, jobId } = req.body;

        console.log("Received Data:", req.body); // ✅ Debugging log

        // ✅ Validate candidateId
        if (!candidateId || !mongoose.Types.ObjectId.isValid(candidateId)) {
            return res.status(400).json({ success: false, message: "Invalid or missing candidateId." });
        }

        // ✅ Validate jobId
        if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ success: false, message: "Invalid or missing jobId." });
        }

        // ✅ Check if the job exists
        const job = await JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: `Job with ID ${jobId} not found.` });
        }

        // ✅ Check if the candidate exists
        const candidate = await LoginModel.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ success: false, message: `Candidate with ID ${candidateId} not found. Please register first.` });
        }

        // ✅ Check if candidate has already applied
        const existingApplication = await ApplicationModel.findOne({ candidateId, jobId });
        if (existingApplication) {
            return res.status(400).json({ success: false, message: "You have already applied for this job." });
        }

        // ✅ Create new job application
        const newApplication = await ApplicationModel.create({ candidateId, jobId });

        // ✅ Populate job & candidate details in response
        const populatedApplication = await ApplicationModel.findById(newApplication._id)
            .populate("candidateId") // Fetch only name & email
            .populate("jobId"); // Fetch job title & company

        res.status(201).json({
            success: true,
            message: "Job application submitted successfully!",
            application: populatedApplication,
        });

    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// ✅ Fetch all applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await ApplicationModel.find().populate("candidateId jobId");
        res.json({ success: true, applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
