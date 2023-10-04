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
import { useDispatch, useSelector } from "react-redux";
import { overwriteJobsData } from './redux/jobsSlice'
import { overwriteUserData } from './redux/userSlice'
import { overwriteUserJwt, overwriteAdminJwt } from "./redux/jwtSlice";
import { RootState } from "./redux/store";

const App: React.FC = () => {

  // State for loading indicator
  const [loading, setLoading] = useState<boolean>(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Redux setup
  const dispatch = useDispatch();
  const jwts = useSelector((state: RootState) => state.jwt)

  // UseEffect to initialize user JWT from local storage
  useEffect(() => {
    dispatch(overwriteUserJwt(localStorage.getItem('modernJobPortal_jwt')));
    dispatch(overwriteAdminJwt(localStorage.getItem('modernJobPortal_AdminJwt')));
  }, [])

  // UseEffect to fetch user data and jobs when user JWT changes
  useEffect(() => {
    if (!isUserUrl) {
      return
    }
    if (jwts.userJwt) {
      getJobs().then(data => dispatch(overwriteJobsData(data)));
    }
    if (jwts.userJwt && isUserUrl) {
      getUserData(jwts.userJwt)
        .then(data => {
          dispatch(overwriteUserData(data))
          setIsUserAuthenticated(true);
        })
        .catch(() => setLoading(false))
    } else {
      // Delay setting loading to false by a couple of hundred milliseconds
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [jwts.userJwt]);

  // UseEffect to validate admin JWT
  useEffect(() => {
    if (!isAdminUrl) {
      return
    }
    if (jwts.adminJwt) {
      getJobs().then(data => dispatch(overwriteJobsData(data)));
    }
    if (jwts.adminJwt && isAdminUrl) {
      validateAdminJwt(jwts.adminJwt)
        .then(() => setIsAdminAuthenticated(true))
        .catch(() => setLoading(false))
    } else {
      // Delay setting loading to false by a couple of hundred milliseconds
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [jwts.adminJwt]);


  // Check if the current URL is for user pages
  const isUserUrl = ['/search', '/applications', '/shortlist', '/profile', '/applicantInterviews', '/applicantInterviews/room'].includes(window.location.pathname);
  // Check if the current URL is for admin pages
  const isAdminUrl = [
    '/admin/dashboard',
    '/admin/job-management',
    '/admin/user-management',
    '/admin/user-management/view'
  ].some(url => window.location.pathname.startsWith(url));


  // Determine the component to render while loading
  const loadingComponent = loading ? <Loading /> : <BadLogin isAdminUrl={isAdminUrl} />;

  return (
    <>
      {isUserAuthenticated && <SideNavBar />}
      {isAdminAuthenticated && <AdminSideNavBar />}

      <Routes>
        <Route
          path="/search"
          element={isUserAuthenticated
            ? <SearchJobs />
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
            ? <Shortlist />
            : loadingComponent
          }
        />
        <Route
          path="/applications"
          element={isUserAuthenticated
            ? <Applications />
            : loadingComponent
          }
        />
        <Route
          path="/profile"
          element={isUserAuthenticated
            ? <Profile />
            : loadingComponent
          }
        />
        <Route
          path="/applicantInterviews"
          element={isUserAuthenticated
            ? <InterviewDashboard />
            : loadingComponent
          }
        />
        <Route
          path="/applicantInterviews/room"
          element={isUserAuthenticated || isAdminAuthenticated
            ? <InterviewRoom isAdmin={isAdminAuthenticated} />
            : loadingComponent
          }
        />
        <Route path="/login" element={<Landing />} />
        <Route path="/sign-up" element={<Landing />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLanding />} />
        <Route
          path="/admin/dashboard"
          element={isAdminAuthenticated
            ? <AdminDashboard />
            : loadingComponent
          }
        />
        <Route
          path="/admin/job-management"
          element={isAdminAuthenticated
            ? <JobManagement />
            : loadingComponent
          }
        />
        <Route
          path="/admin/job-management/job"
          element={isAdminAuthenticated
            ? <ViewJob />
            : loadingComponent
          }
        />
        <Route
          path="/admin/job-management/job/applicant"
          element={isAdminAuthenticated
            ? <ViewApplicant />
            : loadingComponent
          }
        />

        <Route
          path="/admin/job-management/create-job"
          element={isAdminAuthenticated
            ? <CreateJob />
            : loadingComponent
          }
        />

        <Route path='*' element={<NotFound />} /> {/* Catch-all route */}
      </Routes>

    </>
  );
};

export default App;
