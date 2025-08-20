import express from 'express'
import { DeleteRecruiter, deleteRecruiterWithJobs, GetAllRecruiter, recruiterRegister, updateRecruiter } from '../controller/recruiterController.js';
const RecruiterRouter=express.Router();
console.log("recruiter")
RecruiterRouter.post('/recruiterjob',recruiterRegister)

RecruiterRouter.put('/:id',updateRecruiter)

// RecruiterRouter.delete('/:id',DeleteRecruiter)

RecruiterRouter.get('/',GetAllRecruiter)

RecruiterRouter.delete('/:recruiterId',deleteRecruiterWithJobs)


export default RecruiterRouter