import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import desktopLogo from 'src/assets/images/desktopLogo.svg';
import experienceIcon from 'src/assets/images/experienceIcon.svg';
import dashboard from 'src/assets/images/dashboard.svg';

const AdminSideNavBar: React.FC = () => {



  const location = useLocation();
  return (
    <div className="sideNav column">
      <div className="sideNav-top column">
        <Link to="/admin/dashboard" className="sideNav-logo column">
          <img id="desktopLogo" src={desktopLogo} />
        </Link>
        <div className="hr"></div>
        <Link
          to="/admin/dashboard"
          className="sideNav-top-link row"
          id={location.pathname === '/admin/dashboard' ? 'activeNavLink' : ''}
        >
          <img src={dashboard} />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/admin/job-management"
          className="sideNav-top-link row"
          id={location.pathname.startsWith('/admin/job-management') ? 'activeNavLink' : ''}
        >
          <img src={experienceIcon} />
          <p>Job Management</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminSideNavBar
