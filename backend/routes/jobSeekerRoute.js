import express from 'express'
import {createJobSeeker,updateProfile,DeleteJob, AllJobSeeker} from '../controller/JobSeekerController.js';
// import { DeleteJob } from './../controller/JobSeekerController';

const jobSeekerRouter=express.Router();

jobSeekerRouter.post('/createjob',createJobSeeker)

jobSeekerRouter.put('/:id',updateProfile)

jobSeekerRouter.delete('/:id',DeleteJob)

jobSeekerRouter.get('/',AllJobSeeker)

export default jobSeekerRouter