import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  skill: String,
  experience: Number,
  location: String,
  maxCTC: Number,
  noticePeriod: Number,
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "RecruiterModel" }});

const JobModel = mongoose.model("JobModel", jobSchema);
export default JobModel;
