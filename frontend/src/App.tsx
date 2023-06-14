import SearchJobs from "src/pages/user/SearchJobs";
import Applications from "src/pages/user/Applications";
import Shortlist from "src/pages/user/Shortlist";
import Profile from "src/pages/user/Profile";
import Landing from "src/pages/user/Landing";
import BadLogin from "src/components/user/BadLogin";
import Loading from "src/components/user/Loading";
import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getUserData, getJobs } from "src/util/apiFunctions";
import SideNavBar from "src/components/user/SideNavBar";
import AdminSideNavBar from "src/components/admin/AdminSideNavBar";
import { JobInterface, UserInterface } from "./util/interfaces";
import AdminLanding from "src/pages/admin/AdminLanding";
import AdminAnalytics from "src/pages/admin/Analytics";
import JobManagement from "src/pages/admin/JobManagement";


const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobData, setJobData] = useState<JobInterface[]>([]);
  const [storedJwt, setStoredJwt] = useState<string | null>(localStorage.getItem('modernJobPortal_jwt'));
  const [userData, setUserData] = useState<UserInterface>({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    phone: '',
    urls: [],
    attachments: [],
    date: new Date(),
    appliedJobs: [],
    shortlisted: [],
    jobQuestionResponse: [],
  });


  useEffect(() => {
    getJobs().then(data => {
      setJobData(data);
    });
    if (storedJwt) {
      getUserData(storedJwt)
        .then(data => {
          setUserData(data);
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [storedJwt]);

  const loadingComponent = loading ? <Loading /> : <BadLogin />;
  const shouldRenderNavBar = isAuthenticated && !loading;

  const urlsThatShowUserNavBar = ['/search', '/applications', '/shortlist', '/profile']
  const urlsThatShowAdminNavBar = ['/admin/analytics', '/admin/job-management', '/admin/user-management']

  return (
    <>
      {urlsThatShowUserNavBar.includes(window.location.pathname) && shouldRenderNavBar && <SideNavBar></SideNavBar>}
      {urlsThatShowAdminNavBar.includes(window.location.pathname) && shouldRenderNavBar && <AdminSideNavBar></AdminSideNavBar>}
      <Routes>
        {/* USERS */}
        <Route
          path="/search"
          element={isAuthenticated ? (
            <SearchJobs storedJwt={storedJwt} jobData={jobData} userData={userData} setUserData={setUserData} />
          ) : (
            loadingComponent
          )}
        />
        <Route
          path="/shortlist"
          element={isAuthenticated ? (
            <Shortlist storedJwt={storedJwt} jobData={jobData} userData={userData} setUserData={setUserData} />
          ) : (
            loadingComponent
          )}
        />
        <Route
          path="/applications"
          element={isAuthenticated ? (
            <Applications storedJwt={storedJwt} jobData={jobData} userData={userData} setUserData={setUserData} />
          ) : (
            loadingComponent
          )}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? (
            <Profile setUserData={setUserData} storedJwt={storedJwt} userData={userData} />
          ) : (
            loadingComponent
          )}
        />
        <Route path="/login" element={<Landing setStoredJwt={setStoredJwt} />} />
        <Route path="/sign-up" element={<Landing setStoredJwt={setStoredJwt} />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLanding setStoredJwt={setStoredJwt} />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/job-management" element={<JobManagement />} />

      </Routes>
    </>
  );
}

export default App;
