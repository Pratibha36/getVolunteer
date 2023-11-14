import React, { useEffect, useState } from 'react'
import nitclogo from '../assets/nitclogo.png'
import './header.css'
import Login from './Login';
import { useStateValue } from './StatePovider';
import { useAuthStateValue } from '../context/AuthStateProvider';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { includes } from 'lodash';
import { display } from '@mui/system';
import Error from './Error';
const Header = () => {
  const navigate = useNavigate()
  const [{ openloginmodal, iserror, errorMessage }, dipatch] = useStateValue();
  const [{ user }, authdispatch] = useAuthStateValue();
  useEffect(() => {
    fetchuser();
  }, [])
  useEffect(() => {
    if (user && user.userType === "student") {
      checknotification();
      const intervalId = setInterval(() => {
        checknotification();
      }, 10000);

      return () => clearInterval(intervalId);

    }
    if (user && user.userType === "admin") {
      navigate("/admin");
  }
  },[user]) 
  const checknotification=async ()=>{
    try {
      const response = await fetch("http://localhost:8000/application_student", { credentials: "include" });
      const responseData = await response.json();
      if (!response.ok) {
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
      }
      // throw new Error(`HTTP error! Status: ${response.status}`);
      else {
        responseData.map((job) => {
          if (job.notification === true) {
            displayNotification(job.notificationValue)
            setnotificationfalse(job.applicationId);
          }
        })
      }
    } catch (error) {
      dipatch({
        type: "SHOW_ERROR",
        payload: {'error':`Error fetching data: ${error.message}`}
      })
      console.error('Error fetching data:', error.message);
    }

  };
  const setnotificationfalse = async (applicationId) => {
    try {
      console.log(applicationId)
      const response = await fetch("http://localhost:8000/application/" + applicationId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification: false,
          notificationValue: ""
        }),
        credentials: "include",
      });
      // console.log(response)
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData)
      } else {
        // const errorData = await response.json();
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
        console.log(responseData);
      }
    } catch (error) {
      dipatch({
        type: "SHOW_ERROR",
        payload: {'error':`Error fetching data: ${error.message}`}
      })
    }

  }
  const displayNotification = (msg) => {
    toast(msg)
  }
  const fetchuser = async () => {
    try {
      // Define the URL of the API you want to make a GET request to
      const apiUrl = 'http://localhost:8000/myself'; // Replace with your API URL

      // Use the fetch API with async/await
      const response = await fetch(apiUrl, {
        credentials: 'include'
      });

      if (!response.ok) {
        console.log('user is null')
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (response.ok) {
        if (responseData.success === "successfully logout") navigate('/signin');
        authdispatch({
          type:"LOGIN",
          payload:responseData
        })  
        console.log(user," is the user")
        
       
      }

     
    } catch (error) {
      // dipatch({
      //   type: "SHOW_ERROR",
      //   payload: {'error':`Error fetching data: ${error.message}`}
      // })
      console.error('Error fetching data:', error);
    }

  }
  const toggleLogin = () => {
    if (openloginmodal) {
      dipatch({
        type: "CLOSE_LOGIN_MODAL"
      })
    } else {
      dipatch({
        type: "OPEN_LOGIN_MODAL"
      })
    }
  };
  const logout = () => {
    logoutuser();
    authdispatch({
      type: 'LOGOUT'
    })
  }
  const logoutuser = async () => {
    try {
      const apiUrl = 'http://localhost:8000/logout'
      // Use the fetch API with async/await
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: 'include'
      });
      const responseData=await response.json();

      if (!response.ok) {
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
        console.log('error in log out')
        // throw new Error('Network response was not ok');
      }
      else{
        console.log(responseData)
        window.location.href = '/'
      }

    } catch (error) {
      console.error('Error in logout:', error);
      dipatch({
        type: "SHOW_ERROR",
        payload: {'error':`Error in logout: ${error.message}`}
      })
    }
  }
  const userLinks = (
    <ul className='header__nav'>
      <li><Link className='header__li' to="/">Home</Link></li>
      <li><Link className='header__li' to="/">Jobs</Link></li>
      <l1 onClick={toggleLogin}>Login</l1>
      <Login />
    </ul>
  );
  const facultyLinks = (
    <ul className='header__nav'>
      <li><Link className='header__li' to="/">Home</Link></li>
      <li><Link className='header__li' to={"/postjob"}>Post Jobs</Link></li>
      <li><Link className='header__li' to={"/appliedstudents"}>Applied Students</Link></li>
      <li onClick={logout}>Logout</li>
    </ul>
  );
  const studentLinks = (
    <ul className='header__nav'>
      <li><Link className='header__li' to="/">Home</Link></li>
      <li>Notification</li>
      <li><Link className='header__li' to={"/appliedstudents"}>Applied Jobs</Link></li>
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
  const handleClose = () => {
    dipatch({
      type: "REMOVE_ERROR",
      payload: ""
    })
  }
  return (
    <div >
      <ToastContainer />
      {iserror && <Error {...errorMessage} handleClose={handleClose} />}
      <div className={`header ${iserror?"blur":""}`}>
        <div className='header__icons'>
          <img className='header__logo' src={nitclogo} alt='nitclogo' />
          <h1 class='app_name'>Get Volunteers</h1>
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