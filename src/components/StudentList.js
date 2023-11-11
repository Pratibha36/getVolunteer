import React from 'react'
import Student from './Student'
import './studentlist.css'
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export const StudentList = ({ jobId }) => {
  const location = useLocation();
  const [path, setpath] = useState();
  const [selectedTab, setSelectedTab] = useState("pending")
  const [application, setApplication] = useState(null)
  const [ref, setRef] = useState(0)


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

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setApplication(data);
      } else {
        const errorData = await response.json();
        // console.log(errorData)
      }
    } catch (error) {
      // console.log(error)
    }
  };




  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  return (
    application && <div id="student" className='studentlist'>
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
    </div>
  )
}
