import express from 'express'
import { Login, Signup } from '../controller/ProviderController.js';

const ProviderRouter=express.Router();

ProviderRouter.post('/signup',Signup)

ProviderRouter.post('/login',Login)

export default ProviderRouter