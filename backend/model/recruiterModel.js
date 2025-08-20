import mongoose, { Schema } from "mongoose";

const recruiterSchema = new Schema({
    name: { type: String,  },
    company: { type: String },
    email: { type: String, unique: true },
    mobile: { type: String, required: true, unique: true }, 
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobModel" }] // Referencing JobModel
}, { timestamps: true });


const RecruiterModel = mongoose.model("RecruiterModel", recruiterSchema);
export default RecruiterModel;
