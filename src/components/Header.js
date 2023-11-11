import React, { useEffect, useState } from 'react'
import nitclogo from '../assets/nitclogo.png'
import './header.css'
import Login from './Login';
import { useStateValue } from './StatePovider';
import { useAuthStateValue } from '../context/AuthStateProvider';
import { Link } from 'react-router-dom';
const Header = ({ role, isAuthenticated, onLogout }) => {
  const [{openloginmodal},dipatch]=useStateValue();
  const [{user},authdispatch]=useAuthStateValue();
  console.log(user)
  useEffect(()=>{
    fetchuser();
  },[])
  const fetchuser=async ()=>{
    try {
      // Define the URL of the API you want to make a GET request to
      const apiUrl = 'http://localhost:8000/myself'; // Replace with your API URL

      // Use the fetch API with async/await
      const response = await fetch(apiUrl,{
        credentials: 'include'
      });

      if (!response.ok) {
        console.log('user is null')
        throw new Error('Network response was not ok');
       
      }

      const responseData = await response.json();
      if(response.ok){
        authdispatch({
          type:"LOGIN",
          payload:responseData
        })
        
      }
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
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
  const logout=()=>{
    logoutuser();
    authdispatch({
      type:'LOGOUT'
    })
  }
  const logoutuser=async()=>{
    try {
      const apiUrl = 'http://localhost:8000/logout'
      // Use the fetch API with async/await
      const response = await fetch(apiUrl,{
        method:"GET",
        credentials: 'include'
      });

      if (!response.ok) {
        console.log('error in log out')
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if(response.ok){
        console.log(responseData)
        window.location.href = '/'
      }
     
    } catch (error) {
      console.error('Error in logout:', error);
    }     
  }
  const userLinks = (
    <ul  className='header__nav'>
    <li><Link className='header__li' to="/">Home</Link></li>
    <li>Jobs</li>
    <l1 onClick={toggleLogin}>Log in</l1>
    <Login/>
  </ul>
  );
  const facultyLinks = (
    <ul  className='header__nav'>
      <li><Link className='header__li' to="/">Home</Link></li>
      <li><Link className='header__li' to={"/postjob"}>Post Jobs</Link></li>
      <li><Link className='header__li' to={"/appliedstudents"}>Applied Students</Link></li>
      <li><Link className='header__li' to={"/approvedstudents"}>Approved Students</Link></li>
      <li onClick={logout}>Logout</li>
    </ul>
  );
  const studentLinks = (
    <ul  className='header__nav'>
      <li><Link className='header__li' to="/">Home</Link></li>
      <li>Notification</li>
      <li><Link className='header__li' to={"/"}>Applied Jobs</Link></li>
      <li onClick={logout}>Logout</li>
    </ul>
  );
  let links;
  if (user && user.userType === 'faculty') {
    links = facultyLinks;
  } else if (user && user.userType === 'student') {
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