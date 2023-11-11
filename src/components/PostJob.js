import React from 'react'
import { useState } from 'react';
import JoditEditor from 'jodit-react';
import './postjob.css'
import { useRef } from 'react';
import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { Bars, Grid } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export const PostJob = () => {
    const [jobHeading, setJobHeading] = useState('');
    const [loading, setLoading] = useState(false);
    const [jobType, setJobType] = useState('virtual');
    const [keywords, setKeywords] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [regStartDate, setRegStartDate] = useState(new Date());
    const [regEndDate, setRegEndDate] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const editor = useRef(null);
	  const [content, setContent] = useState();
    const [value, onChange] = useState(new Date());
    const[redirect,setredirect]=useState(false);
    const navigate = useNavigate();
    
    const job={
        heading:jobHeading,
        type:jobType,
        description:content,
        keywords:keywords,
        startingDate:startDate,
        endingDate:endDate,
        registrationStartingDate:regStartDate,
        registrationEndingDate:regEndDate,
        location:location
      }
    const handleFormSubmit = (e) => {
      e.preventDefault();  
      console.log(job)
      PostJobapicall()
    };
    const PostJobapicall=async()=>{
        setLoading(true);
        const response = await fetch('http://localhost:8000/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
        credentials: 'include'
      });
      const responseData=await response.json();
      if(!response.ok) {
        console.log(responseData);
        setLoading(true);
      }else{
        setLoading(false);
        toast("Congratulation!!!! You have posted your Job")
        navigate('/viewjob/'+responseData.jobId)
      }   
    }

  
    return (
        <div className="postjobloading">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
      <div className="loader">
      {loading?<Grid
            height="80"
            width="80"
            color="#275DF5"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}} 
            wrapperClass=""
            visible={true}
            />:""}
        </div>
    
      <div className={loading?"postjobload":"postjob"}>
    
        <h2 style={{color:"#013AA7"}}>Post Your Job Here!</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="jobHeading"><span style={{color:"red"}}>*</span>Job Heading:</label><br/>
            <input
            className='postjob__jobheading'
              type="text"
              id="jobHeading"
              value={jobHeading}
              placeholder='Enter your Job Heading here'
              onChange={(e) => setJobHeading(e.target.value)}
            />
          </div>
          <div>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="jobType"><span style={{color:"red"}}>*</span>Job Type:</label>
            <select
             className='postjob__jobtype'
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="virtual">Virtual</option>
              <option value="online">Online</option>
            </select>
          </div>
          <label style={{color:"rgb(101, 99, 99)"}} htmlFor="jobdesc"><span style={{color:"red"}}>*</span>Job Desciption:</label>
          <JoditEditor  className='postjob__jobdesc' value={content} 
          onChange={
            newcontent=>setContent(newcontent)} />
          <div className='postjob__keyword'>
            <label style={{color:"rgb(101, 99, 99)",marginRight:"20px"}} htmlFor="keywords" >Keywords:</label>
            <input
            style={{borderRadius:"25px"}}
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          
          <div className='postjob__startdate'>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="regStartDate"><span style={{color:"red"}}>*</span>Registration Start Date:</label>
            <div style={{marginLeft:"25px", borderRadius:"25px"}}>
                 <DateTimePicker minDate={new Date()} value={regStartDate} onChange={setRegStartDate} className={"datetimepicker"}/>
            </div>
          </div>
          <div className='postjob__startdate'>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="regEndDate"><span style={{color:"red"}}>*</span>Registration End Date:</label>
            <div style={{marginLeft:"25px", borderRadius:"25px"}}>
                 <DateTimePicker minDate={regStartDate} value={regEndDate} onChange={setRegEndDate} className={"datetimepicker"}/>
            </div>
          </div>
          <div className='postjob__startdate'>
          <label style={{color:"rgb(101, 99, 99)"}} htmlFor="startDate"><span style={{color:"red"}}>*</span>Job Start Date:</label>
            <div style={{marginLeft:"25px", borderRadius:"25px"}}>
                 <DateTimePicker minDate={regEndDate} value={startDate}  onChange={setStartDate} className={"datetimepicker"}/>
            </div>
            
          </div>
          
          <div className='postjob__enddate'>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="endDate"><span style={{color:"red"}}>*</span>Job End Date:</label>
            <div style={{marginLeft:"25px", borderRadius:"25px"}}>
                 <DateTimePicker minDate={startDate} value={endDate} onChange={setEndDate} className={"datetimepicker"}/>
            </div>
          </div>
          <div className='postjob__img'>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className='postjob__location'>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              placeholder='Enter the Location of Job'
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='postjob__btndiv'>
          <button className={loading?'postjob__btnload':'postjob__btn'} type="submit">Post Yout Job</button>
          </div>
        </form>
      </div>
      </div>
    );
}
