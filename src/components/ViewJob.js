import React from 'react'
import './viewjob.css'
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useEffect } from 'react';
import { useState } from 'react';

const ViewJob = () => {
    const htmlelem="<h1>hi<h1>"
    const [jobDetails,setJobDetails]=useState(null);
    const [facDetials,setFacDetails]=useState(null);
    useEffect(()=>{
        fetchJobWithId();
        fetchFacultyDetails();
    },[])
    const fetchFacultyDetails=async()=>{
      const response=await fetch('',{
        credentials:'include'
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData=await response.json();
      if(response.ok){
        setFacDetails(responseData);
      }
      
    }
    const applyToJob=async()=>{
        try {
             const response = await fetch('http://localhost:8000/jobs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/jfson',
              },
              body: JSON.stringify({
                
              }),
              credentials: 'include'    
            });
      
            if (response.ok) {
              const data = await response.json();
            } else {
              const errorData = await response.json();
            }
          } catch (error) { 
            }

    }
    const fetchJobWithId=async()=>{
      try{

      const apiUrl = 'http://localhost:8000/myself'; // Replace with your API URL
      // Use the fetch API with async/await
      const response = await fetch(apiUrl,{
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setJobDetails(responseData);

      
    } catch (error) {
      console.error('Error fetching data:', error);
    }


    }
  return (
    <div className='viewjob'>
    <div className='viewjob__items'>
        <div className='viewjobcard'>
            <div className='view_jobimgadj'>
            <div>
                <p className='viewjobcard__heading'>
                    Software Development Engineer 3
                </p>
                <p className='viewjob__person'>Prof JP Shukla</p>
                <div className='viewjob__date'>
                <CalendarMonthTwoToneIcon/> 
                <p style={{paddingRight:'90px'}}>Job Start date: 12th July,2023</p><pre/>
                <CalendarTodayTwoToneIcon/>
                <p >Job End date: 12th July,2023</p>
                </div>
                <div className='viewjob__date'>
                <DateRangeIcon/>
                <p style={{paddingRight:'30px'}}>Registration Start date: 12th July,2023</p>
                <CalendarTodayTwoToneIcon/>
                <p>Registration End date: 12th July,2023</p>
                </div>
                <div className='viewjob_loc'>
                <LocationOnTwoToneIcon/> <p>Delhi NCR</p>
                </div>
            </div>
                <img alt='job logo' src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif'/>
            </div>
            <hr/>
            <div className='viewjob__details'>
                <p style={{paddingRight:"10px"}}><span style={{color:"rgb(101, 99, 99)"}}>Posted on:</span> 12th July,2023 </p>
                <p style={{paddingRight:"10px"}}><span style={{color:"rgb(101, 99, 99)"}}>Openings:</span> 10</p>
                <p style={{paddingRight:"10px"}}><span style={{color:"rgb(101, 99, 99)"}}>Applicants:</span> 300</p>
                <button className='viewjob__button' onClick={applyToJob}>Apply Now</button>
            </div>
        </div>
        <div className='viewjobcard_desc'>
            <p>Job description</p>
            <div dangerouslySetInnerHTML={{ __html: htmlelem }} />
        </div> 
        </div>       
    </div>
  )
}

export default ViewJob