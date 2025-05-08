import JobModel from "../model/JobModel.js";
import RecruiterModel from "../model/recruiterModel.js";

// import { useParams } from 'react-router-dom';

export const createJob = async (req, res) => {
    try {
        const { recruiterId } = req.params ; // ✅ Ensure recruiterId is taken from params
        console.log(recruiterId)
        const { title, skill, experience, location, maxCTC, noticePeriod } = req.body;

        if (!recruiterId) {
            return res.status(400).json({ success: false, message: "Recruiter ID is required" });
        }

        // Check if recruiter exists
        const recruiter = await RecruiterModel.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }

        // Create a new job
        const newJob = await JobModel.create({ title, skill, experience, location, maxCTC, noticePeriod, recruiterId });

        // Push the job into the recruiter's jobs array
        recruiter.jobs.push(newJob._id);
        await recruiter.save();

        res.status(201).json({ success: true, message: "Job created successfully", job: newJob });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateJob = async (req, res) => {
    try {
        const { jobId } = req.params; 
        const updatedData = req.body; // Get updated job details from request body

        const updatedJob = await JobModel.findByIdAndUpdate(jobId, updatedData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.json({ success: true,user: updatedJob });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const GetAllJobs = async (req, res) => {
    try {
        const recruiters = await JobModel.find();
         console.log(recruiters)
        if (!recruiters.length) {
            return res.status(404).json({ success: false, message: "No recruiters found" });
        }

        res.json({ success: true, recruiters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const DeleteJobs=async (req, res) => {
    try {
        await JobModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const search= async (req, res) => {
    try {
        const { experience, skill, location } = req.query;

        let filter = {};

        // ✅ Experience filtering
        if (experience) {
            filter.experience = { $gte: Number(experience) };
        }

        // ✅ Exact match for skill
        if (skill) {
            const skillRegex = new RegExp(`\\b${skill.trim()}\\b`, "i");
            filter.skill = skillRegex;
        }

        // ✅ Exact match for location
        if (location) {
            filter.location = { $regex: new RegExp(`^${location.trim()}$`, "i") };
        }

        const jobs = await JobModel.find(filter);

        if (jobs.length === 0) {
            return res.status(404).json({ success: false, message: "No matching jobs found." });
        }

        res.status(200).json({ success: true, jobs });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

