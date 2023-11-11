import React from 'react'
import './job.css'
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import EditCalendarTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

export const Job = () => {
  return (
    <div className='jobs'>
        <div className='job__f'>
            <img src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif' alt='noimage' />
        <h3>Teaching Assistant</h3>
        </div>
        <div className='job__prof'>
        <h4>Prof shukla, </h4>
        <p> Computer Science Department</p>
        </div>
        <div className='job__desc'>
           
            <p>As a Teaching Assistant you will be responsible for evaluating, guiding and invigilating students for Software System Labs. </p>
        </div>
        <div className='job__date'>
        <CalendarMonthTwoToneIcon/>    
        <p>Start date: 22nd Nov, 2023</p>
        <CalendarTodayTwoToneIcon/>
        <p>End date: 1st Dec, 2023</p>
        <EditCalendarTwoToneIcon/>
        <p>Posted on: 12th Nov, 2023</p>
        </div>
        <div className='job__key'>
        <p>Good Communication</p>
        <p>Data Structure & Algorithms</p>
        <p>C/C++</p>
        <p>Linux</p>
        <p>database</p>
        </div>
        <div className='job_loc'>
           <LocationOnTwoToneIcon/> <p>Calicut, Kerala</p>
        </div>
        
    </div>
  )
}
