import React,  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'src/css/shared/login.css'
import Signup from 'src/components/user/Signup';
import Login from 'src/components/user/Login';
import desktopLogo from 'src/assets/images/desktopLogo.svg'

interface LandingProps {
  setStoredJwt: (jwt: string | null) => void;
}

const Landing: React.FC<LandingProps> = ({ setStoredJwt }) => {

  const [currentImg, setCurrentImg] = useState(0);
  const location = useLocation();


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg(currentImg => (currentImg + 1) % 4);
    }, 11000);
    return () => clearInterval(interval);
  }, []);




  return (


    <div className='landing row'>
      <img src={desktopLogo} />
      <div className='landing-left'>
        <div className='landing-left-child column'>
          {location.pathname === '/login' ? <Login setStoredJwt={setStoredJwt} /> : <Signup setStoredJwt={setStoredJwt} />}
        </div>
      </div>
      <div className='landing-right column'>
        <div className='loadingBar'></div>
        <div className='landing-right-imgCont'>
          <img style={{ opacity: currentImg === 0 ? 1 : 0, backgroundColor: '#002D62' }} src="" />
          <img style={{ opacity: currentImg === 1 ? 1 : 0, backgroundColor: '#97233F' }} src="" />
          <img style={{ opacity: currentImg === 2 ? 1 : 0, backgroundColor: '#17B169' }} src="" />
          <img style={{ opacity: currentImg === 3 ? 1 : 0, backgroundColor: '#1d1160' }} src="" />
          <p style={{ opacity: currentImg === 0 ? 1 : 0 }}>Tony's Web Designs is a web design agency in North America specializing in 0 → 1 website solutions.</p>
          <p style={{ opacity: currentImg === 1 ? 1 : 0 }}>Tony's Web Designs is expanding its line of products to include web app development in May 2023.</p>
          <p style={{ opacity: currentImg === 2 ? 1 : 0 }}>In August 2022, Tony's Web Designs completed its first project with a client, Friend Accounting.</p>
          <p style={{ opacity: currentImg === 3 ? 1 : 0 }}>Tony's Web Designs was founded in Toronto in July 2022.</p>
        </div>
      </div>
    </div>

  )
};


export default Landing