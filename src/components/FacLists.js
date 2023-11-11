import React from 'react'
import './job.css'
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import EditCalendarTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { useAuthStateValue } from '../context/AuthStateProvider';
import { useStateValue } from './StatePovider';
import { Link, useLocation } from 'react-router-dom';
import {isoToDate} from '../funtions/Function'
import { useState,useEffect } from 'react';
import parse from 'html-react-parser';


export const FacLists = (props) => {
  const [{ user }, authdispatch] = useAuthStateValue();
  const [{ openloginmodal }, dispatch] = useStateValue();
  const location = useLocation();
  const [path, setpath] = useState([]);

  useEffect(() => {
    const pathname = location.pathname;
    // Split the pathname to get the last part (appliedstudents in this case)
    const lastPathSegment = pathname.split('/').pop();
    setpath(lastPathSegment) // Output: "appliedstudents"
  }, [location]);

  const jobcard = (<div className='jobs'>
    <div className='job__f'>
      <img src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif' alt='noimage' />
      <h3>{props.heading}</h3>
    </div>
    <div className='job__desc'>
      {parse(props.description)}
    </div>
    <div className='job__date'>
      <p>Posted on: {isoToDate(props.postDate)}</p>
    </div>
    <div className='job_loc'>
      <LocationOnTwoToneIcon /> <p>{props.location}</p>
      <button style={{marginLeft:"400px",borderRadius:"25px", backgroundColor:"#f39b31", color:"white",fontWeight:"bold",
    border:"1px solid #f39b31", height:"30px",textDecoration:"none",cursor:"pointer"}}>View Applied Student</button>
    </div>

  </div>)

  return (
          <div><Link to={path=="appliedstudents"?`/viewjob/${props._id}/#student`:`/viewjob/${props._id}/#selectedstudent` } style={{ textDecoration: 'none' }}>{jobcard}</Link></div>
         )
    

}
