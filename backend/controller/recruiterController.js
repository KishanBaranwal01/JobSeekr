
import JobModel from "../model/JobModel.js";
import RecruiterModel from "../model/recruiterModel.js";

export const recruiterRegister = async (req, res) => {
    const { name,company ,email,mobile,} = req.body;
    if (!mobile) {
        return res.status(400).json({ error: "Mobile number is required" });
    }
    const recruiter = new RecruiterModel({ name,company,email,mobile, })
    await recruiter.save()
    return res.json({ success: true, recruiter })
}

export const updateRecruiter = async (req, res) => {
    const updatedData = req.body;
    const { id } = req.params;
    try {
        const updateUser = await RecruiterModel.findByIdAndUpdate(id, updatedData,{ new: true })
        console.log(updateUser)

        if (!updateUser) {
            return res.status(404).json({ success: false, message: "recruiter not found" });
        }
        return res.json({
            success: true,
            recruiter: updateUser
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const DeleteRecruiter=async (req, res) => {
    try {
        await RecruiterModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetAllRecruiter = async (req, res) => {
    try {
        const recruiters = await RecruiterModel.find().populate("jobs");
         console.log(recruiters)
        if (!recruiters.length) {
            return res.status(404).json({ success: false, message: "No recruiters found" });
        }

        res.json({ success: true, recruiters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const deleteRecruiterWithJobs = async (req, res) => {
    try {
        const { recruiterId } = req.params;

        // Find the recruiter
        const recruiter = await RecruiterModel.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }

        // Delete all jobs associated with the recruiter
        await JobModel.deleteMany({ _id: { $in: recruiter.jobs } });

        // Delete the recruiter
        await RecruiterModel.findByIdAndDelete(recruiterId);

        res.json({ success: true, message: "Recruiter and all associated jobs deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

