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

export const Job = () => {
  const [{user},authdispatch]=useAuthStateValue();
  const [{openloginmodal},dispatch]=useStateValue();
  const jobcard=(<div className='jobs'>
  <div className='job__f'>
      <img src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif' alt='noimage' />
  <h3>Java Developer</h3>
  </div>
  <div className='job__prof'>
  <h4>Prof shukla, </h4>
  <p> Computer Science professor</p>
  </div>
  <div className='job__desc'>
     
      <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
  </div>
  <div className='job__date'>
  <CalendarMonthTwoToneIcon/>    
  <p>Start date: 12th July, 2023</p>
  <CalendarTodayTwoToneIcon/>
  <p>End date: 12th July, 2023</p>
  <EditCalendarTwoToneIcon/>
  <p>Posted on: 12th July, 2023</p>
  </div>
  <div className='job__key'>
  <p>keywords</p>
  <p>Java</p>
  <p>hibernate</p>
  <p>sql</p>
  <p>database</p>
  </div>
  <div className='job_loc'>
     <LocationOnTwoToneIcon/> <p>Delhi NCR</p>
  </div>
  
</div>)

  return (<div>
    {user?<div><Link to="/viewjob/1234">{jobcard}</Link></div>:<div onClick={()=>{dispatch({type:"OPEN_LOGIN_MODAL"})}}>{jobcard}</div>}
    </div>
  )

}
