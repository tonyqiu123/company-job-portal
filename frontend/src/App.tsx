import SearchJobs from "src/pages/user/SearchJobs";
import Applications from "src/pages/user/Applications";
import Shortlist from "src/pages/user/Shortlist";
import Profile from "src/pages/user/Profile";
import Landing from "src/pages/user/Landing";
import BadLogin from "src/components/shared/BadLogin";
import Loading from "src/components/user/Loading";
import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getUserData, getJobs, validateAdminJwt } from "src/util/apiFunctions";
import SideNavBar from "src/components/user/SideNavBar";
import AdminSideNavBar from "src/components/admin/AdminSideNavBar";
import { JobInterface, UserInterface } from "./util/interfaces";
import AdminLanding from "src/pages/admin/AdminLanding";
import AdminDashboard from "src/pages/admin/Dashboard";
import JobManagement from "src/pages/admin/JobManagement";
import ViewJob from "src/pages/admin/ViewJob";
import NotFound from "src/pages/shared/NotFound";
import ViewApplicant from "src/pages/admin/ViewApplicant";
import CreateJob from "./pages/admin/CreateJob";
import Demo from "./pages/shared/demo";
import InterviewRoom from "src/pages/user/InterviewRoom";
import InterviewDashboard from "./pages/user/InterviewDashboard";


const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [jobData, setJobData] = useState<JobInterface[]>([]);
  const [userJwt, setUserJwt] = useState<string | null>(localStorage.getItem('modernJobPortal_jwt'));
  const [adminJwt, setAdminJwt] = useState<string | null>(localStorage.getItem('modernJobPortal_AdminJwt'));
  const [userData, setUserData] = useState<UserInterface>({});



  useEffect(() => {
    // if applicant/admin has jwt in their localstorage, fetch job data
    if (userJwt) {
      getJobs().then(data => setJobData(data));
    }
    if (!isUserUrl) {
      return
    }
    if (userJwt && isUserUrl) {
      getUserData(userJwt)
        .then(data => {
          setUserData(data);
          setIsUserAuthenticated(true);
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [userJwt]);


  useEffect(() => {
    if (!isAdminUrl) {
      return
    }
    if (adminJwt && isAdminUrl) {
      validateAdminJwt(adminJwt)
        .then(() => setIsAdminAuthenticated(true))
        .catch(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [adminJwt]);


  const isUserUrl = ['/search', '/applications', '/shortlist', '/profile', '/applicantInterviews', '/applicantInterviews/room'].includes(window.location.pathname)
  const isAdminUrl = [
    '/admin/dashboard',
    '/admin/job-management',
    '/admin/user-management',
    '/admin/user-management/view'
  ].some(url => window.location.pathname.startsWith(url));

  const loadingComponent = loading ? <Loading /> : <BadLogin isAdminUrl={isAdminUrl} />;

  return (
    <>
      {isUserAuthenticated && <SideNavBar />}
      {isAdminAuthenticated && <AdminSideNavBar />}

      <Routes>
        <Route
          path="/search"
          element={isUserAuthenticated
            ? <SearchJobs userJwt={userJwt || ''} jobData={jobData} userData={userData} setUserData={setUserData} />
            : loadingComponent
          }
        />
        <Route
          path="/demo"
          element={<Demo />}
        />
        <Route
          path="/shortlist"
          element={isUserAuthenticated
            ? <Shortlist userJwt={userJwt || ''} jobData={jobData} userData={userData} setUserData={setUserData} />
            : loadingComponent
          }
        />
        <Route
          path="/applications"
          element={isUserAuthenticated
            ? <Applications userJwt={userJwt || ''} jobData={jobData} userData={userData} setUserData={setUserData} />
            : loadingComponent
          }
        />
        <Route
          path="/profile"
          element={isUserAuthenticated
            ? <Profile setUserData={setUserData} userJwt={userJwt || ''} userData={userData} />
            : loadingComponent
          }
        />
        <Route
          path="/applicantInterviews"
          element={isUserAuthenticated
            ? <InterviewDashboard userJwt={userJwt || ''} jobData={jobData} userData={userData} setUserData={setUserData} />
            : loadingComponent
          }
        />
        <Route
          path="/applicantInterviews/room"
          element={isUserAuthenticated
            ? <InterviewRoom />
            : loadingComponent
          }
        />
        <Route path="/login" element={<Landing setUserJwt={setUserJwt} />} />
        <Route path="/sign-up" element={<Landing setUserJwt={setUserJwt} />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLanding setAdminJwt={setAdminJwt} />} />
        <Route
          path="/admin/dashboard"
          element={isAdminAuthenticated
            ? <AdminDashboard adminJwt={adminJwt || ''} />
            : loadingComponent
          }
        />
        <Route
          path="/admin/job-management"
          element={isAdminAuthenticated
            ? <JobManagement adminJwt={adminJwt || ''} />
            : loadingComponent
          }
        />
        <Route
          path="/admin/job-management/job"
          element={isAdminAuthenticated
            ? <ViewJob adminJwt={adminJwt || ''} />
            : loadingComponent
          }
        />
        <Route
          path="/admin/job-management/job/applicant"
          element={isAdminAuthenticated
            ? <ViewApplicant adminJwt={adminJwt || ''} />
            : loadingComponent
          }
        />

        <Route
          path="/admin/job-management/create-job"
          element={isAdminAuthenticated
            ? <CreateJob adminJwt={adminJwt || ''} />
            : loadingComponent
          }
        />

        <Route path='*' element={<NotFound />} /> {/* Catch-all route */}
      </Routes>

    </>
  );
};

export default App;
