import express from "express";
import { applyForJob, getAllApplications } from "../controller/ApplicationController.js";

const Applicationrouter = express.Router();

Applicationrouter.post("/applications", applyForJob); // Apply for a job
Applicationrouter.get("/applications", getAllApplications); // Fetch all applications

export default Applicationrouter;
