import express from 'express'
import dotenv from 'dotenv';
import connectDB from './database/database.js';
import jobSeekerRouter from './routes/jobSeekerRoute.js';
import RecruiterRouter from './routes/recruiterRoute.js';
import cors from "cors";
import jobRoute from './routes/jobRoute.js';
import Applicationrouter from './routes/applicationRoutes.js';
import LoginRouter from './routes/LoginRoute.js';
import ProviderRouter from './routes/ProviderRoute.js';
import path from 'path'

dotenv.config();
const app = express();
app.use(
    cors({
      origin: process.env.FRONTEND_URL, // Allow frontend URL from .env
      credentials: true, // Allow cookies/session
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    })
  );
  const PORT = process.env.PORT || 5000;
app.use(express.json()); 
app.use('/api/user',jobSeekerRouter)
app.use('/api/recruiter',RecruiterRouter)
app.use('/api/job',jobRoute)
app.use('/api/apply',Applicationrouter)
app.use('/api/auth',LoginRouter)
app.use('/api/authprovider',ProviderRouter)

// Sample Route
// app.get('/', (req, res) => {
//     res.send('Database Server is Running');
// });

const __dirname=path.resolve();

app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
// Start Server
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`);
});
