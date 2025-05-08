import express from 'express'
import { Login, Signup } from '../controller/LoginController.js';

const LoginRouter=express.Router();

LoginRouter.post('/signup',Signup)

LoginRouter.post('/login',Login)

export default LoginRouter