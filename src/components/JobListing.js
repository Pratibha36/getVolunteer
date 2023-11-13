import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './alljobs.css'
import './joblisting.css'
import { useAuthStateValue } from '../context/AuthStateProvider';
import { FacLists } from './FacLists';
import { useLocation } from 'react-router-dom';
import { Pagination } from './Pagination';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StatePovider';

export const JobListing = () => {
    const [{ user }, authdispatch] = useAuthStateValue();
    const [{ openloginmodal, iserror, errorMessage }, dipatch] = useStateValue();
    const [resjob, setresjob] = useState([]);
    const [curentPage,setCurrentPage]=useState(1);
    const [postPerPage,setPostPerPage]=useState(4);
    const lastPostIndex=curentPage*postPerPage;
    const firstPostIndex=lastPostIndex-postPerPage;
    const currentPost=resjob.slice(firstPostIndex,lastPostIndex);
    const navigate = useNavigate();
  
  
    useEffect(() => {
      // if(!user)navigate("/");
      fetchAllJobs();
    }, [user])

    const fetchAllJobs = async () => {
        try {
          const apiUrl = (user.userType==="student")?'http://localhost:8000/application_student':'http://localhost:8000/job'; // Replace with your API URL
          // Use the fetch API with async/await
          const response = await fetch(apiUrl, {
            method: "GET",
            credentials: 'include'
          });
          const responseData = await response.json();
          if (!response.ok) {
            dipatch({
              type: "SHOW_ERROR",
              payload: responseData
            })
            // throw new Error('Network response was not ok');
          }
          else{
          console.log(responseData)
          setresjob(responseData);
          }
    
        } catch (error) {
          dipatch({
            type: "SHOW_ERROR",
            payload: {'error':`Error fetching data: ${error.message}`}
          })
          console.error('Error fetching data:', error);
        }
      }
    
  return (
    user?<div className={iserror && "blur"}>
        <div className='myjobs'>
        <Pagination totalPosts={resjob.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={curentPage} />
        <h2 style={{color:"#013AA7",}}>My Jobs!</h2>
            {currentPost .map((job)=>{
                return <FacLists {...job}/>
            })}
        </div>
    </div>:null
  )
}
