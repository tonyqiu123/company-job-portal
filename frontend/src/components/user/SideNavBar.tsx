import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import desktopLogo from 'src/assets/images/desktopLogo.svg';
import search from 'src/assets/images/search.svg';
import applications from 'src/assets/images/applications.svg';
import shortlist from 'src/assets/images/shortlist.svg';
import profile from 'src/assets/images/profile.svg';
import signOut from 'src/assets/images/sign-out.svg';
import interview from 'src/assets/images/interview.svg';

const SideNavBar: React.FC = () => {


  const handleSignOut = () => {
    localStorage.removeItem('modernJobPortal_jwt');
    window.location.href = '/login';
  };

  const location = useLocation();
  return (
    <div className="sideNav column">
      <div className="sideNav-top column">
        <Link to="/search" className="sideNav-logo column">
          <img id="desktopLogo" src={desktopLogo} />
        </Link>
        <div className="hr"></div>
        <Link
          to="/search"
          className="sideNav-top-link row"
          id={location.pathname === '/search' ? 'activeNavLink' : ''}
        >
          <img src={search} />
          <p>Search</p>
        </Link>
        <Link
          to="/shortlist"
          className="sideNav-top-link row"
          id={location.pathname === '/shortlist' ? 'activeNavLink' : ''}
        >
          <img src={shortlist} />
          <p>Shortlist</p>
        </Link>
        <Link
          to="/applications"
          className="sideNav-top-link row"
          id={location.pathname === '/applications' ? 'activeNavLink' : ''}
        >
          <img src={applications} />
          <p>Applications</p>
        </Link>
        <Link
          to="/applicantInterviews"
          className="sideNav-top-link row"
          id={location.pathname === '/applicantInterviews' || location.pathname === '/applicantInterviews/room' ? 'activeNavLink' : ''}
        >
          <img src={interview} />
          <p>Interviews</p>
        </Link>
        <Link
          to="/profile"
          className="sideNav-top-link row"
          id={location.pathname === '/profile' ? 'activeNavLink' : ''}
        >
          <img src={profile} />
          <p>Profile</p>
        </Link>
      </div>

      <div className="sideNav-socials row">
        <a className="sideNav-top-link row" onClick={handleSignOut}>
          <img src={signOut} />
          <p>Sign Out</p>
        </a>
      </div>
    </div>
  );
}

export default SideNavBar
