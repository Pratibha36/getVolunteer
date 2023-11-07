import React, { useState } from 'react'
import nitclogo from '../assets/nitclogo.png'
import './header.css'
import Login from './Login';
import { useStateValue } from './StatePovider';
const Header = ({ role, isAuthenticated, onLogout }) => {
  const [{openloginmodal},dipatch]=useStateValue();
  const toggleLogin = () => {
    if(openloginmodal){
      dipatch({
          type:"CLOSE_LOGIN_MODAL"
        })
  }else{
      dipatch({
          type:"OPEN_LOGIN_MODAL"
        })
  }
  };
  const userLinks = (
    <ul  className='header__nav'>
    <l1>Home</l1>
    <li>Jobs</li>
    <l1 onClick={toggleLogin}>Log in</l1>
    <Login/>
  </ul>
  );
  const facultyLinks = (
    <ul  className='header__nav'>
      <li>Home</li>
      <li>Post Jobs</li>
      <li>Applied Students</li>
      <li>Logout</li>
    </ul>
  );
  const studentLinks = (
    <ul  className='header__nav'>
      <li>Home</li>
      <li>Notification</li>
      <li>Applied Jobs</li>
      <li>Logout</li>
    </ul>
  );
  let links;
  if (role === 'faculty') {
    links = facultyLinks;
  } else if (role === 'student') {
    links = studentLinks;
  } else {
    links = userLinks;
  }
  return (
    <div>
      <div className="header">
        <div className='header__icons'>
        <img className='header__logo' src={nitclogo} alt='nitclogo'/>
        <h1>Volunteer app</h1>
        </div>
        <div>  
          <div className='header__item'>
        {links}
        </div>
        </div>
        </div>  
    </div>
  )
}

export default Header