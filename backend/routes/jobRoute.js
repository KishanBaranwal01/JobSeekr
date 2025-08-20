import express from 'express'
import { createJob, GetAllJobs, updateJob,DeleteJobs, search } from '../controller/JobController.js';

const jobRoute=express.Router();

jobRoute.post('/:recruiterId',createJob)

jobRoute.put('/:jobId',updateJob)

jobRoute.get('/allJobs',GetAllJobs)

jobRoute.delete('/:id',DeleteJobs)

jobRoute.get('/search',search)

export default jobRoute

