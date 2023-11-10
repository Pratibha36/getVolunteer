import React from 'react'
import './alljobs.css'
import { Job } from './Job'
import { useAuthStateValue } from '../context/AuthStateProvider'
import { useEffect } from 'react'
import { useState } from 'react'

const AllJobs = () => {
  const [{ user }, authdispatch] = useAuthStateValue();
  const [resjob, setresjob] = useState([]);
  useEffect(() => {
    fetchAllJobs();
  }, [])

  const fetchAllJobs = async () => {
    try {
      const apiUrl = 'http://localhost:8000/job'; // Replace with your API URL
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
    user && user.userType === "faculty" ? (
      <div>
        <div className='myjobs'>
          <h1>
            My Posted Jobs
          </h1>
          {resjob.map((j) => {
            
            return <Job {...j}/>
          })}
        </div>
      </div>) :
      (<div className='alljobs' >
        <h1>
          All Jobs
        </h1>
        {resjob.map((j) => {
          console.log(j);
          return <Job {...j}/>
        })}
      </div>)
  )
}

export default AllJobs