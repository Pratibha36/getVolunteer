import React from 'react'
import Student from './Student'
import './studentlist.css'
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export const StudentList = () => {
  const location = useLocation();
  const [path, setpath] = useState();
 
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

  return (
    <div id={path==="selectedstudent"?"selectedstudent":"student"} className='studentlist'>
         <h2 style={{color:"#013AA7",fontWeight:"bold"}}>#List of {path==="selectedstudent"?<span>Approved</span>:<span>Applied</span>} Students!</h2>  
        <Student/>
        <Student/>
        <Student/>
        <Student/>
        <Student/>
    </div>
  )
}
