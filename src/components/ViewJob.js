import React from 'react'
import './viewjob.css'
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useEffect } from 'react';
import { useState } from 'react';
import {isoToDate} from '../funtions/Function'

const ViewJob = ({}) => {
    const htmlelem="<h1>hi<h1>"
    const [jobDetails,setJobDetails]=useState(null);
    const [facultyDetails,setFacultyDetails]=useState(null);
    const[applied,setapplied]=useState(false);
    const jobId=87704710;
    useEffect(()=>{
        fetchJobWithId();
        // fetchFacultyDetails();
    },[])

    const fetchFacultyDetails=async(facultyId)=>{
      const response=await fetch('http://localhost:8000/user/'+facultyId,{
        credentials:'include'
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData=await response.json();
      if(response.ok){
        setFacultyDetails(responseData);
      }
      
    }
    const checkapplied=async()=>{
      try {
           const response = await fetch('http://localhost:8000/application/applied/'+jobId, {
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
    const applyToJob=async()=>{
        try {
             const response = await fetch('http://localhost:8000/application', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                jobId:jobId
              }),
              credentials: 'include'    
            });
            // console.log(response)
            if (response.ok) {
              const data = await response.json();
            } else {
              const errorData = await response.json();
              // console.log(errorData)
            }
          } catch (error) { 
            console.log(error)
            }

    }
    const fetchJobWithId=async()=>{
      try{
      const apiUrl = 'http://localhost:8000/job/'+jobId; // Replace with your API URL
      // Use the fetch API with async/await
      const response = await fetch(apiUrl,{
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setJobDetails(responseData);
      fetchFacultyDetails(responseData.facultyId)

      
    } catch (error) {
      console.error('Error fetching data:', error);
    }


    }
  return (
    jobDetails && facultyDetails &&
    <div className='viewjob'>
    <div className='viewjob__items'>
        <div className='viewjobcard'>
            <div className='view_jobimgadj'>
            <div>
                <p className='viewjobcard__heading'>
                    {jobDetails.heading}
                </p>
                <p className='viewjob__person'>{facultyDetails.name}</p>
                <div className='viewjob__date'>
                <CalendarMonthTwoToneIcon/> 
                <p style={{paddingRight:'90px'}}>Job Start date: {isoToDate(jobDetails.startingDate)}</p><pre/>
                <CalendarTodayTwoToneIcon/>
                <p >Job End date: {isoToDate(jobDetails.endingDate)}</p>
                </div>
                <div className='viewjob__date'>
                <DateRangeIcon/>
                <p style={{paddingRight:'30px'}}>Registration Start date: {isoToDate(jobDetails.registrationStartingDate)}</p>
                <CalendarTodayTwoToneIcon/>
                <p>Registration End date: {isoToDate(jobDetails.registrationEndingDate)}</p>
                </div>
                <div className='viewjob_loc'>
                <LocationOnTwoToneIcon/> <p>{jobDetails.location}</p>
                </div>
            </div>
                <img alt='job logo' src='https://img.naukimg.com/logo_images/groups/v1/6015371.gif'/>
            </div>
            <hr/>
            <div className='viewjob__details'>
                <p style={{paddingRight:"10px"}}><span style={{color:"rgb(101, 99, 99)"}}>Posted on:</span> {isoToDate(jobDetails.postDate)} </p>
                <p style={{paddingRight:"10px"}}><span style={{color:"rgb(101, 99, 99)"}}>Openings:</span> 10</p>
                <p style={{paddingRight:"10px"}}><span style={{color:"rgb(101, 99, 99)"}}>Applicants:</span> {jobDetails.applicant}</p>
                <button className='viewjob__button' onClick={applyToJob}>Apply Now</button>
            </div>
        </div>
        <div className='viewjobcard_desc'>
            <p>{jobDetails.description}</p>
            <div dangerouslySetInnerHTML={{ __html: htmlelem }} />
        </div> 
        </div>       
    </div>
  )
}

export default ViewJob