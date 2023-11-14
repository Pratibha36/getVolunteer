import React from 'react'
import Student from './Student'
import './studentlist.css'
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useStateValue } from './StatePovider';

export const StudentList = ({ jobId }) => {
  const location = useLocation();
  const [path, setpath] = useState();
  const [selectedTab, setSelectedTab] = useState("pending")
  const [application, setApplication] = useState(null)
  const [ref, setRef] = useState(0)
  const [{ openloginmodal, iserror, errorMessage }, dipatch] = useStateValue();


  useEffect(() => {
    getApplication();
    if (location.hash) {
      const targetElement = document.getElementById(location.hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      const pathname = location.pathname;
      const hashValue = window.location.hash.substring(1);
      setpath(hashValue)
    }
  }, [location]);


  const getApplication = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/application_faculty/" + jobId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/jfson",
          },
          credentials: "include",
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        setApplication(responseData);
      } else {
        dipatch({
          type: "SHOW_ERROR",
          payload: responseData
        })
      }
    } catch (error) {
      dipatch({
        type: "SHOW_ERROR",
        payload: { 'error': `Error fetching data: ${error.message}` }
      })
    }
  };




  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  return (<div id="student">
    {application && <div className='studentlist'>
      <h2 style={{ color: "#013AA7", fontWeight: "bold" }}>#List of  Students!</h2>
      <div className='changestudenttab'>
        <div onClick={() => handleTabClick('pending')} className={`tabone ${selectedTab === 'pending' ? 'selectedtab' : ''}`}>
          Pending Students
        </div>
        <div onClick={() => handleTabClick('accepted')} className={`tabone ${selectedTab === 'accepted' ? 'selectedtab' : ''}`}>
          Accepted Students
        </div>
        <div onClick={() => handleTabClick('rejected')} className={`tabone ${selectedTab === 'rejected' ? 'selectedtab' : ''}`}>
          Rejected Students
        </div>
      </div>
      {
        application
          .filter((stud) => {
            return stud.status === selectedTab
          })
          .map((stud) => {
            return <Student {...stud} getApplication={getApplication} />

          })}
      {application &&
        application
          .filter((stud) => stud.status === selectedTab)
          .length === 0 && <p>No students found for the selected tab.</p>}
    </div>}
  </div>
  )
}
