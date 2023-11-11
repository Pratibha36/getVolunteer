import React from 'react'
import Student from './Student'
import './studentlist.css'
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export const StudentList = () => {
  const location = useLocation();
  const [path, setpath] = useState();
  const [selectedTab,setSelectedTab]=useState("applied")
 
  useEffect(() => {
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

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    // Additional logic if needed when a tab is clicked
  };


  return (
    <div id="student" className='studentlist'>
         <h2 style={{color:"#013AA7",fontWeight:"bold"}}>#List of  Students!</h2>  
         <div className='changestudenttab'>
         <div onClick={() => handleTabClick('applied')} className={`tabone ${selectedTab === 'applied' ? 'selectedtab' : ''}`}>
          Applied Students
        </div>
        <div onClick={() => handleTabClick('approved')} className={`tabone ${selectedTab === 'approved' ? 'selectedtab' : ''}`}>
          Approved Students
        </div>
        <div onClick={() => handleTabClick('rejected')} className={`tabone ${selectedTab === 'rejected' ? 'selectedtab' : ''}`}>
          Rejected Students
        </div>
        </div>
        <Student/>
        <Student/>
        <Student/>
        <Student/>
        <Student/>
    </div>
  )
}
