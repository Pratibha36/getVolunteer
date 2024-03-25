import React from 'react'
import './job.css'
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import EditCalendarTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { useAuthStateValue } from '../context/AuthStateProvider';
import { useStateValue } from './StatePovider';
import { Link } from 'react-router-dom';
import {isoToDate} from '../funtions/Function'
import { useState,useEffect } from 'react';

export const Job = (props) => {
  const [{ user }, authdispatch] = useAuthStateValue();
  const [{ openloginmodal }, dispatch] = useStateValue();
  // const [facultyDetails, setFacultyDetails] = useState(null);

  // useEffect(() => {
  //   // fetchJobWithId();
  //   user && fetchFacultyDetails();
  // }, [])

  // const fetchFacultyDetails = async (facultyId) => {
  //   const response = await fetch('http://localhost:8000/user/' + props.facultyId, {
  //     method:"GET",
  //     credentials: 'include'
  //   })
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const responseData = await response.json();
  //   if (response.ok) {
  //     setFacultyDetails(responseData);
  //   }

  // }
  console.log(props)
  const jobcard = (<div className='jobs'>
    <div className='job__f'>
      <img src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif' alt='noimage' />
      <h3>{props.heading}</h3>
    </div>
    <div className='job__prof'> 
      <h4>Posted By: {props.facultyName} </h4>
     </div>
    <div className='job__desc'>
      </div>
    <div className='job__date'>
      <CalendarMonthTwoToneIcon />
      <p>Start date: {isoToDate(props.startingDate)}</p>
      <CalendarTodayTwoToneIcon />
      <p>End date: {isoToDate(props.endingDate)}</p>
      <EditCalendarTwoToneIcon />
      <p>Posted on: {isoToDate(props.postDate)}</p>
    </div>
  </div>)

  return (
    <div>
      {user ? (
        <div><Link style={{textDecoration:'none'}} to={`/viewjob/${props._id}`}>{jobcard}</Link></div>
      ) : (
        <div>
        <div onClick={() => { dispatch({ type: "OPEN_LOGIN_MODAL" }) }}>{jobcard}</div>
        </div>
      )
      }
    </div>
  )

}
