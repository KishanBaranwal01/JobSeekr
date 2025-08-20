import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel", // ✅ Ensure correct reference (model name should match)
            required: true
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobModel",
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

const ApplicationModel = mongoose.model("Application", applicationSchema); // ✅ Ensure correct model name
export default ApplicationModel;
