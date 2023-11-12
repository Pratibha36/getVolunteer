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
  let jobstatus; 
  if(props.applicationStatus=="pending"){
    jobstatus= <p style={{color:"#F05537",fontWeight:"bold"}}>PENDING FOR APPROVAL</p>
  }else if(props.applicationStatus=="rejected"){
    jobstatus= <p style={{color:"red",fontWeight:"bold"}}>APPLICATION REJECTED</p>
  }else if(props.applicationStatus=="accepted"){
    jobstatus= <p style={{color:"green",fontWeight:"bold"}}>APPLICATION APPROVED</p>
  } else if(props.applicationStatus=="withdrawn"){
    jobstatus= <p style={{color:"gray",fontWeight:"bold"}}>YOU HAVE WITHDRAWN</p>
  }

  const jobcard = (<div className='jobs'>
    <div className='job__f'>
      <img src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif' alt='noimage' />
      <h3>{props.heading}</h3>
    </div>
    <div className='job__date' style={{display:"flex",justifyContent:"space-between"}}>
      <p>Posted on: {isoToDate(props.postDate)}</p>
      <div>
        <p>{jobstatus}</p>
      </div>
    
    </div>
    <div className='job_loc'>
      <LocationOnTwoToneIcon /> <p>{props.location}</p>
      {user && user.userType==="faculty" && <button style={{marginLeft:"400px",borderRadius:"25px", backgroundColor:"#f39b31", color:"white",fontWeight:"bold",
    border:"1px solid #f39b31", height:"30px",textDecoration:"none",cursor:"pointer"}}>View Applied Student</button>}
    </div>

  </div>)

  return (
          <div><Link to={`/appliedstudents/${props._id}/#student` } style={{ textDecoration: 'none' }}>{jobcard}</Link></div>
         )
    

}
