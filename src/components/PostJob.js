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





export const PostJob = () => {
    const [jobHeading, setJobHeading] = useState('');
    const [jobType, setJobType] = useState('virtual');
    const [keywords, setKeywords] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('');
    const [regStartDate, setRegStartDate] = useState('');
    const [regEndDate, setRegEndDate] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const [value, onChange] = useState(new Date());
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // You can perform actions with the form data here
      console.log({
        jobHeading,
        jobType,
        keywords,
        startDate,
        endDate,
        regStartDate,
        regEndDate,
        image,
        location,
      });
    };
    const [sdate,setddate]=useState(new Date())
  
    return (
        <div>
      <div className='postjob'>
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
          <JoditEditor className='postjob__jobdesc' />
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
          <label style={{color:"rgb(101, 99, 99)"}} htmlFor="startDate"><span style={{color:"red"}}>*</span>Start Date:</label>
            <div style={{marginLeft:"25px", borderRadius:"25px"}}>
                 <DateTimePicker minDate={new Date()} value={startDate} onChange={setStartDate} className={"datetimepicker"}/>
            </div>
            
          </div>
          <div className='postjob__enddate'>
            <label style={{color:"rgb(101, 99, 99)"}} htmlFor="endDate"><span style={{color:"red"}}>*</span>End Date:</label>
            <div style={{marginLeft:"25px", borderRadius:"25px"}}>
                 <DateTimePicker minDate={startDate} value={endDate} onChange={setEndDate} className={"datetimepicker"}/>
            </div>
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
          <button className='postjob__btn' type="submit">Post Yout Job</button>
          </div>
        </form>
      </div>
      </div>
    );
}
