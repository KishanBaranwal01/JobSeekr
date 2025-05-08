import React from 'react'
import JobPortal from './pages/JobPortal'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobSeekerLogin from './pages/JobSeekerLogin';
import SeekerProfile from './component/SeekerProfile';
import ProviderProfile from './component/ProviderProfile';
import RecruiterProfile from './component/RecruiterProfile';
import AllJobSeeker from './component/AllJobSeeker';
import AllRecruiterFind from './component/AllRecruiterFind';
import Jobs from './component/Jobs';
import AllAppliedJob from './component/AllAppliedJob';
import ProviderPostJob from './component/ProviderPostJob';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<JobPortal />} />
          <Route path="/jobseeker-login" element={<JobSeekerLogin />} />
          <Route path="/seeker-profile" element={<SeekerProfile />} />
          <Route path="/profil-provider/:id" element={<ProviderProfile />} />
          <Route path="/recruiter-profile" element={<RecruiterProfile/>} />
          
          <Route path="/alljobseeker" element={<AllJobSeeker/>} />
          <Route path="/allrecruiter" element={<AllRecruiterFind/>} />   
          <Route path="/alljobs" element={<Jobs/>} />
          <Route path="/allappliedjob" element={<AllAppliedJob/>} />
          <Route path="/job-list/:recruiterId" element={<ProviderPostJob/>} />






        </Routes>
      </Router>
    </>
  )
}

export default App
