import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './alljobs.css'
import { useAuthStateValue } from '../context/AuthStateProvider';
import { FacLists } from './FacLists';
import { useLocation } from 'react-router-dom';

export const JobListing = () => {
    const [{ user }, authdispatch] = useAuthStateValue();
    const [resjob, setresjob] = useState([]);
  
    useEffect(() => {
      fetchAllJobs();
    }, [])

    const fetchAllJobs = async () => {
        try {
          const apiUrl = (user.userType==="student")?'http://localhost:8000/application_student':'http://localhost:8000/job'; // Replace with your API URL
          // Use the fetch API with async/await
          const response = await fetch(apiUrl, {
            method: "GET",
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          console.log(responseData)
          setresjob(responseData);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
  return (
    <div>
        <div className='myjobs'>
        <h2 style={{color:"#013AA7",}}>My Jobs!</h2>
            {resjob.map((job)=>{
                return <FacLists {...job}/>
            })}
        </div>
    </div>
  )
}
