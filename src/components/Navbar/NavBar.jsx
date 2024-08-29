import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaVideo, FaUserCircle, FaFacebookMessenger, FaCog, FaQuestionCircle, FaMoon, FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import image from '../../assets/image.png';


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => { 
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="navbar">
      <img src={image} alt="Social Sphere" className="logo" height={'130px'} width={'200px'}  style={{marginLeft: '70px'}} />
        <div className="nav-item-style">
        <div className="navbar-item">
          <NavLink to={'/'}>
            <FaHome className="navbar-icon" />
          </NavLink>
        </div>
        <div className="navbar-item">
          <NavLink to={'/reels'}>
            <FaVideo className="navbar-icon" />
          </NavLink>
        </div>
        <div className="navbar-item">
          <NavLink to={'/chats'}>
            <FaFacebookMessenger className="navbar-icon" />
          </NavLink>
        </div>
       
        </div>
        <div className="user-circle-style" onClick={toggleSidebar}>
          <FaUserCircle className="navbar-icon" />
        </div>
      </nav>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-profile">
          <FaUserCircle className="profile-icon" />
          <span>User</span>
        </div>
        <ul className="sidebar-menu">
          <li><FaCog /> Settings & privacy</li>
          <li><FaQuestionCircle /> Help & support</li>
          <li><FaMoon /> Display & accessibility</li>
          <li><FaExclamationCircle /> Give feedback</li>
          <li onClick={handleLogout}><FaSignOutAlt /> Log out</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
