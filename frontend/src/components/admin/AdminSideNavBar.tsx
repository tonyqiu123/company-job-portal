import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import desktopLogo from  'src/assets/images/desktopLogo.svg';
import profile from  'src/assets/images/profile.svg';
import experienceIcon from  'src/assets/images/experienceIcon.svg';
import analytics from  'src/assets/images/analytics.svg';

const AdminSideNavBar: React.FC = () => {



  const location = useLocation();
  return (
    <div className="sideNav column">
      <div className="sideNav-top column">
        <Link to="/admin/analytics" className="sideNav-logo column">
          <img id="desktopLogo" src={desktopLogo} />
        </Link>
        <div className="hr"></div>
        <Link
          to="/admin/analytics"
          className="sideNav-top-link row"
          id={location.pathname === '/admin/analytics' ? 'activeNavLink' : ''}
        >
          <img src={analytics} />
          <p>Analytics</p>
        </Link>
        <Link
          to="/admin/job-management"
          className="sideNav-top-link row"
          id={location.pathname === '/admin/job-management' ? 'activeNavLink' : ''}
        >
          <img src={experienceIcon} />
          <p>Job Management</p>
        </Link>
        <Link
          to="/admin/user-management"
          className="sideNav-top-link row"
          id={location.pathname === '/admin/user-management' ? 'activeNavLink' : ''}
        >
          <img src={profile} />
          <p>User Management</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminSideNavBar
